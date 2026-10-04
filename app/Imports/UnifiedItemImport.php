<?php

namespace App\Imports;

use App\Models\Item;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Collection;
use App\Models\Brand;
use App\Models\ItemSpecification;
use App\Models\ItemImage;
use App\Models\Store;
use App\Models\Tag;
use App\Models\DiscountRule;
use App\Models\ItemColor;
use App\Models\ItemVariant;
use App\Models\ItemZise;
use App\Models\Testimony;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Validators\Failure;
use Illuminate\Support\Str;
use SoDe\Extend\Crypto;
use Throwable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use SoDe\Extend\File;

class UnifiedItemImport implements ToModel, WithHeadingRow, SkipsOnError, SkipsOnFailure
{
    use \Maatwebsite\Excel\Concerns\Importable;

    private $errors = [];
    private $fieldMappings = [];
    private $truncateMode = true;
    private $importMode = 'reset'; // 'reset' o 'add_update'
    private $lastItem = null;

    /**
     * Constructor con configuración flexible
     * 
     * @param array $options Opciones de configuración:
     *   - truncate: bool - Si debe limpiar las tablas (default: true)
     *   - mode: string - Modo de importación: 'reset' o 'add_update' (default: 'reset')
     *   - fieldMappings: array - Mapeo de campos alternativos
     */
    public function __construct(array $options = [])
    {
        $this->importMode = $options['mode'] ?? 'reset';
        $this->truncateMode = ($this->importMode === 'reset') ? true : false;
        $this->fieldMappings = $options['fieldMappings'] ?? $this->getDefaultFieldMappings();

        if ($this->truncateMode) {
            $this->truncateTables();
        }
    }

    /**
     * Configuración de mapeo de campos por defecto
     * Permite usar diferentes nombres de columnas para el mismo campo
     */
    private function getDefaultFieldMappings(): array
    {
        return [
            'categoria' => ['categoria'],
            'subcategoria' => ['subcategoria'],
            'sku' => ['sku'],
            'color_variacion' => ['color_variacion'],
            'unidad_variacion' => ['unidad_variacion'],
            'nombre_producto' => ['nombre'],
            'descripcion' => ['descripcion'],
            'precio' => ['precio'],
            'descuento' => ['descuento'],
            'stock' => ['stock'],
            'min_stock' => ['stock_minimo'],
            'weight' => ['peso_en_gramos'],
            'height' => ['altura_en_milimetros'],
            'capacity' => ['capacidad_en_milimetros'],
            'diameter' => ['diametro_en_milimetros'],
            'color' => ['color'],
            'cover' => ['tapa_en_milimetros'],
            'visible' => ['visible'],
            'destacado' => ['destacar'],
            'estado' => ['estado', 'status', 'Estado'],
            'tags' => ['etiquetas_separado_por_comas'],
        ];
    }

    /**
     * Preparar tablas de forma segura (solo limpiar items y sus dependencias directas)
     */
    private function truncateTables(): void
    {
       // 1. Desactivar revisión de llaves foráneas temporalmente
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        try {

            if (Storage::exists('images/item')) {
                Storage::deleteDirectory('images/item'); // Elimina todo
                Storage::makeDirectory('images/item');   // La vuelve a crear limpia
                Log::info("Carpeta images/item limpiada.");
            }

            // 2. Limpiar dependencias más profundas primero (Variantes)
            // Ajusta estos nombres si tus modelos o tablas se llaman diferente
            if (Schema::hasTable('item_variants')) {
                ItemVariant::truncate();
            }
            
            if (Schema::hasTable('item_colors')) {
                ItemColor::truncate(); // Asumiendo que tu modelo es Color
            }
            
            if (Schema::hasTable('item_zises')) {
               ItemZise::truncate(); 
            }

           
            if (Schema::hasTable('testimonies')) {
                Testimony::truncate();
            }

            // 4. Limpiar dependencias directas del Item
            if (Schema::hasTable('item_images')) {
                ItemImage::truncate();
            }

            // 5. Finalmente, limpiar la tabla principal
            Item::truncate();

            Log::info("Limpieza de tablas (Reset) ejecutada correctamente.");

        } catch (\Exception $e) {
            Log::error("Error al limpiar tablas durante el Reset: " . $e->getMessage());
            throw $e; // Lanzamos el error para que la importación se detenga si no se pudo limpiar
        } finally {
            // 6. Volver a activar la revisión de llaves foráneas (¡MUY IMPORTANTE!)
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }

    /**
     * Obtener valor de campo usando mapeos alternativos
     */
    private function getFieldValue(array $row, string $fieldKey, $default = null)
    {
        $possibleKeys = $this->fieldMappings[$fieldKey] ?? [$fieldKey];

        foreach ($possibleKeys as $key) {
            if (array_key_exists($key, $row) && !is_null($row[$key]) && trim(strval($row[$key])) !== '') {
                return trim(strval($row[$key]));
            }
        }

        return $default;
    }

    /**
     * Verificar si existe al menos uno de los campos mapeados
     */
    private function hasField(array $row, string $fieldKey): bool
    {
        $possibleKeys = $this->fieldMappings[$fieldKey] ?? [$fieldKey];

        foreach ($possibleKeys as $key) {
            if (array_key_exists($key, $row) && !is_null($row[$key]) && trim(strval($row[$key])) !== '') {
                return true;
            }
        }

        return false;
    }

    public function model(array $row)
    {
        try {
            // Verificar si la fila está vacía
            if ($this->isRowEmpty($row)) {
                return null;
            }

            // Obtener datos básicos del producto
            $sku = $this->getFieldValue($row, 'sku');
            $nombreProducto = $this->getFieldValue($row, 'nombre_producto');

            // =========================================================
            // LÓGICA DE VARIANTES (HIJOS)
            // =========================================================
            if (empty($nombreProducto)) {
                // Si no hay nombre, PERO tenemos un padre memorizado, es una variante
                if ($this->lastItem) {
                    $colorVariante = $this->getFieldValue($row, 'color_variacion');
                    $tallaVariante = $this->getFieldValue($row, 'unidad_variacion');
                    
                    // Solo creamos la variante si al menos tiene un color o talla definido en el Excel
                    if ($colorVariante || $tallaVariante) {
                        $this->createVariant($this->lastItem, $row, $sku, $colorVariante, $tallaVariante);
                    }
                } else {
                    Log::warning("Variante ignorada: No hay un producto padre anterior.", ['sku' => $sku]);
                }
                
                // Retornamos null porque ya guardamos la variante manualmente
                return null; 
            }

            // =========================================================
            // LÓGICA DE PRODUCTO PRINCIPAL (PADRE)
            // =========================================================

            // Debug temporal - agregar logging
            $pesoValue = $this->getFieldValue($row, 'peso');
            $pesoNumeric = $this->getNumericValue($row, 'peso', 0);

            Log::info("Procesando fila:", [
                'sku_encontrado' => $sku,
                'nombre_encontrado' => $nombreProducto,
                'peso_raw' => $pesoValue,
                'peso_numeric' => $pesoNumeric,
                'campos_disponibles' => array_keys($row),
                'mapeo_peso' => $this->fieldMappings['peso'] ?? 'no definido',
                'mapeo_nombre' => $this->fieldMappings['nombre_producto'] ?? 'no definido'
            ]);

            if (!$sku || !$nombreProducto) {
                throw new Exception("SKU y nombre del producto son requeridos");
            }

            // 1️⃣ Crear/obtener categoría (requerida)
            $categoria = $this->getFieldValue($row, 'categoria');
            if (!$categoria) {
                throw new Exception("La categoría es requerida");
            }
            $category = Category::firstOrCreate(
                ['name' => $categoria],
                [
                    'slug' => Str::slug($categoria),
                    'status' => true
                ]
            );

            // Si el slug o status han cambiado, actualizarlos
            $category->status = true;
            $category->save();

            // 2️⃣ Crear/obtener subcategoría (opcional)
            $subCategory = null;
            if ($this->hasField($row, 'subcategoria')) {
                $subcategoria = $this->getFieldValue($row, 'subcategoria');
                if ($subcategoria) {
                    $subCategorySlug = Str::slug($subcategoria);
                    $slugExists = SubCategory::where('slug', $subCategorySlug)->exists();
                    if ($slugExists) {
                        $subCategorySlug = $subCategorySlug . '-' . Crypto::short();
                    }

                    $subCategory = SubCategory::firstOrCreate(
                        ['name' => $subcategoria, 'category_id' => $category->id],
                        [
                            'slug' => $subCategorySlug,
                            'status' => true
                        ]
                    );
                    $subCategory->status = true;
                    $subCategory->save();
                }
            }

            // 5️⃣ Generar slug único para el producto
            $slug = $this->generateUniqueSlug($nombreProducto);

            // 6️⃣ Preparar datos del precio
            $precio = $this->getNumericValue($row, 'precio');
            $descuento = $this->getNumericValue($row, 'descuento');
            $finalPrice = $this->calculateFinalPrice($precio, $descuento);
            $discountPercent = $this->calculateDiscountPercent($precio, $descuento);


            $itemData = [
                'sku' => $sku,
                'name' => $nombreProducto,
                'description' => $this->getFieldValue($row, 'descripcion', ''),
                'price' => $precio ?? 0,
                'discount' => $descuento,
                'final_price' => $finalPrice,
                'discount_percent' => $discountPercent,
                'category_id' => $category->id,
                'subcategory_id' => $subCategory ? $subCategory->id : null,
                'image' => $this->getMainImage($row, 'sku'),
                'slug' => $slug,
                'stock' => $this->getNumericValue($row, 'stock', 999999),
                'min_stock' => $this->getNumericValue($row, 'stock_minimo', 50),
                'weight' => $this->getNumericValue($row, 'weight', 0),
                'height' => $this->getNumericValue($row, 'height', 0),
                'capacity' => $this->getNumericValue($row, 'capacity', 0),
                'diameter' => $this->getNumericValue($row, 'diameter', 0),
                'cover' => $this->getNumericValue($row, 'cover', 0),
                'color' => $this->getFieldValue($row, 'color'),
                'featured' => $this->getBooleanValue($row, 'destacado', false),
                'visible' => $this->getBooleanValue($row, 'visible', true),
                'status' => $this->getBooleanValue($row, 'estado', true),
                'tags' => $this->processTags($row),
                // 'pdf' => $this->getPdfFile($sku),
                // 'brand_id' => $brand ? $brand->id : null,
            ];

            // Debug: verificar datos antes de crear el item
            Log::info("Datos del item antes de crear:", [
                'sku' => $sku,
                'itemData_completo' => $itemData
            ]);

            // Agregar campos opcionales si existen
            // if ($this->hasField($row, 'color')) {
            //     $itemData['color'] = $this->getFieldValue($row, 'color');
            // }


            // 7️⃣ Crear/Actualizar el producto según el modo
            if ($this->importMode === 'add_update') {
                // Modo: Agregar/Actualizar - Buscar por SKU
                $result = $this->createOrUpdateItem($itemData, $sku);
                $item = $result['item'];
                $shouldProcessImages = $result['shouldProcessNewImages'];
            } else {
                // Modo: Reset - Crear siempre nuevo
                $item = Item::create($itemData);
                $shouldProcessImages = true;
            }

            $this->lastItem = $item;

            if ($item) {
                
                // 9️⃣ Guardar imágenes de galería (solo si hay nuevas imágenes o es un item nuevo)
                if ($shouldProcessImages) {
                    $this->saveGalleryImages($item, $row, 'sku');
                }

            } else {
                throw new Exception("No se pudo crear el producto con SKU: {$sku}");
            }

            return $item;
        } catch (\Exception $e) {
            $errorMessage = sprintf(
                "Error al procesar fila con SKU '%s': %s (Línea: %s, Archivo: %s)",
                $this->getFieldValue($row, 'sku', 'sin SKU'),
                $e->getMessage(),
                $e->getLine(),
                basename($e->getFile())
            );

            $this->addError($errorMessage);

            // Log detallado para debugging
            Log::error($errorMessage, [
                'row_data' => $row,
                'trace' => $e->getTraceAsString()
            ]);

            return null;
        }
    }

    /**
     * Obtener valor numérico de un campo
     */
    private function getNumericValue(array $row, string $fieldKey, $default = null)
    {
        $value = $this->getFieldValue($row, $fieldKey);

        if (is_null($value) || $value === '') {
            return $default;
        }

        // Limpiar el valor (remover espacios, comas, etc.)
        $cleanValue = preg_replace('/[^\d.-]/', '', $value);

        return is_numeric($cleanValue) ? (float)$cleanValue : $default;
    }

    /**
     * Obtener valor booleano de un campo
     */
    private function getBooleanValue(array $row, string $fieldKey, $default = false): bool
    {
        $value = $this->getFieldValue($row, $fieldKey);

        if (is_null($value) || $value === '') {
            return $default;
        }

        $value = strtolower(trim($value));

        // Valores que se consideran true
        $trueValues = ['1', 'true', 'verdadero', 'si', 'sí', 'yes', 'y', 'activo', 'active'];
        // Valores que se consideran false
        $falseValues = ['0', 'false', 'falso', 'no', 'n', 'inactivo', 'inactive'];

        if (in_array($value, $trueValues)) {
            return true;
        }

        if (in_array($value, $falseValues)) {
            return false;
        }

        return $default;
    }

    /**
     * Calcular precio final
     */
    private function calculateFinalPrice($precio, $descuento): float
    {
        if ($descuento && $descuento > 0 && $descuento < $precio) {
            return $descuento;
        }

        return $precio ?? 0;
    }

    /**
     * Calcular porcentaje de descuento
     */
    private function calculateDiscountPercent($precio, $descuento): int
    {
        if ($descuento && $descuento > 0 && $precio && $precio > 0 && $descuento < $precio) {
            return round((100 - ($descuento / $precio) * 100));
        }

        return 0;
    }

    /**
     * Generar slug único para el producto
     */
    private function generateUniqueSlug(string $nombre, ?string $color = null, ?string $talla = null): string
    {
        // Construir partes no nulas
        $parts = [$nombre];
        if ($color) $parts[] = $color;
        if ($talla) $parts[] = $talla;
        
        // Unir con guiones y generar slug base
        $baseSlug = Str::slug(implode('-', $parts));
        $slug = $baseSlug;
        
        $counter = 1;
        while (Item::where('slug', $slug)->exists()) {
            if ($counter === 1) {
                // Primer duplicado: usar Crypto::short()
                $slug = $baseSlug . '-' . Crypto::short();
            } else {
                // Duplicados siguientes: usar números
                $slug = $baseSlug . '-' . $counter;
            }
            $counter++;
        }
        
        return $slug;
    }

    /**
     * Obtener imagen principal del producto
     */

    private function getMainImage(array $row, string $format): ?string
    {
        if ($format === 'agrupador') {
            $codigoagrupador = $this->getFieldValue($row, 'agrupador');
            $color = $this->getFieldValue($row, 'color');
            $images = $this->getColorNumberImages($codigoagrupador, $color);
        } else {
            $sku = $this->getFieldValue($row, 'sku');
            $images = $this->getSkuBasedImages($sku);
        }

        return $images[0] ?? null;
    }


    /**
     * Guardar imágenes de galería
     */
    private function saveGalleryImages(Item $item, array $row, string $format): void
    {
        if ($format === 'agrupador') {
            $codigoagrupador = $this->getFieldValue($row, 'agrupador');
            $color = $this->getFieldValue($row, 'color');

            if (!$codigoagrupador || !$color) {
                $item->update(['visible' => false]);
                return;
            }

            $this->saveColorNumberImages($item, $codigoagrupador, $color);
        } else {
            $sku = $this->getFieldValue($row, 'sku');
            $this->saveSkuBasedImages($item, $sku);
        }
    }

    // Método para formato codigoagrupador_color_numero
    private function saveColorNumberImages(Item $item, string $codigoagrupador, string $color): void
    {
        $images = $this->getColorNumberImages($codigoagrupador, $color);

        if (empty($images)) {
            $item->update(['visible' => false]);
            return;
        }

        $item->update(['image' => $images[0]]);

        if (count($images) > 1) {
            foreach (array_slice($images, 1) as $image) {
                ItemImage::create([
                    'item_id' => $item->id,
                    'url' => $image,
                ]);
            }
        }
    }


    private function saveSkuBasedImages(Item $item, string $sku): void
    {
        $images = $this->getSkuBasedImages($sku);

        if (empty($images)) {
            $item->update(['visible' => false]);
            return;
        }

        $item->update(['image' => $images[0]]);

        if (count($images) > 1) {
            foreach (array_slice($images, 1) as $image) {
                ItemImage::create([
                    'item_id' => $item->id,
                    'url' => $image,
                ]);
            }
        }
    }

    /**
     * Obtener imágenes basadas en el formato codigoagrupador_color_numero
     */
    private function getColorNumberImages(string $codigoagrupador, string $color): array
    {
        $images = [];
        $basePath = "images/item/";
        $extensions = ['jpg', 'jpeg', 'png', 'webp'];

        // Imagen principal: codigoagrupador_color.ext
        $mainImageName = "{$codigoagrupador}_{$color}";
        foreach ($extensions as $ext) {
            if (Storage::exists("{$basePath}{$mainImageName}.{$ext}")) {
                $images[] = "{$mainImageName}.{$ext}";
                break;
            }
        }

        // Imágenes de galería: codigoagrupador_color_1.ext, etc.
        $i = 1;
        while (true) {
            $found = false;
            $galleryImageName = "{$codigoagrupador}_{$color}_{$i}";

            foreach ($extensions as $ext) {
                if (Storage::exists("{$basePath}{$galleryImageName}.{$ext}")) {
                    $images[] = "{$galleryImageName}.{$ext}";
                    $found = true;
                    break;
                }
            }

            if (!$found) break;
            $i++;
        }

        return $images;
    }

    /**
     * Obtener imágenes basadas en SKU
     */
    private function getSkuBasedImages(string $sku): array
    {
        $images = [];
        $galleryImages = [];
        $basePath = "images/item"; // Sin el slash final para Storage::files
        $extensions = ['jpg', 'jpeg', 'png', 'webp'];

        // 1. FORZAR LA IMAGEN PRINCIPAL (sku.ext) COMO EL PRIMER ELEMENTO
        foreach ($extensions as $ext) {
            if (Storage::exists("{$basePath}/{$sku}.{$ext}")) {
                $images[] = "{$sku}.{$ext}";
                break;
            }
        }

        // 2. BUSCAR TODAS LAS IMÁGENES DE GALERÍA (Sin importar si hay saltos)
        // Obtenemos todos los archivos en la carpeta
        $allFiles = Storage::files($basePath);

        foreach ($allFiles as $file) {
            $filename = basename($file); // Obtiene solo el nombre del archivo con extensión

            // Verificamos si el archivo empieza con "SKU_"
            // Usamos $sku . '_' para asegurarnos de que no traiga SKUs similares 
            // (Ej: Si buscamos "SKU1", no queremos que traiga "SKU10_1.jpg")
            if (Str::startsWith($filename, $sku . '-')) {
                
                // Verificamos que tenga una extensión válida
                $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                if (in_array($ext, $extensions)) {
                    $galleryImages[] = $filename;
                }
            }
        }

        // Opcional: Ordenar naturalmente las imágenes de la galería 
        // (Para que SKU_2 vaya antes que SKU_10)
        sort($galleryImages, SORT_NATURAL);

        // 3. COMBINAR: Primero la principal, luego el resto de la galería
        return array_merge($images, $galleryImages);
    }
    

    /**
     * Crear o actualizar un item basado en el SKU
     * 
     * @return array ['item' => Item, 'shouldProcessNewImages' => bool]
     */
    private function createOrUpdateItem(array $itemData, string $sku): array
    {
        // Buscar el item existente por SKU
        $existingItem = Item::where('sku', $sku)->first();

        if ($existingItem) {
            // Actualizar el item existente
            Log::info("Actualizando producto existente", [
                'sku' => $sku,
                'item_id' => $existingItem->id
            ]);

            // Verificar si hay nuevas imágenes disponibles para importar
            $newImages = $this->getSkuBasedImages($sku);
            $hasNewImages = !empty($newImages);


            // Solo eliminar imágenes de galería si hay nuevas imágenes para reemplazar
            if ($hasNewImages) {
                ItemImage::where('item_id', $existingItem->id)->delete();
                Log::info("Reemplazando imágenes del producto", [
                    'sku' => $sku,
                    'nuevas_imagenes' => count($newImages)
                ]);
            } else {
                // Preservar la imagen principal existente si no hay nuevas imágenes
                if ($existingItem->image) {
                    $itemData['image'] = $existingItem->image;
                }
                Log::info("Preservando imágenes existentes del producto (no hay nuevas imágenes)", [
                    'sku' => $sku,
                    'imagen_preservada' => $existingItem->image
                ]);
            }

            // Desasociar tags antiguos
            // $existingItem->tags()->detach();

            // Actualizar los datos del item
            $existingItem->update($itemData);

            return [
                'item' => $existingItem,
                'shouldProcessNewImages' => $hasNewImages
            ];
        } else {
            // Crear nuevo item
            Log::info("Creando nuevo producto", [
                'sku' => $sku
            ]);

            $newItem = Item::create($itemData);

            return [
                'item' => $newItem,
                'shouldProcessNewImages' => true
            ];
        }
    }

    /**
     * Verificar si una fila está vacía
     */
    private function isRowEmpty(array $row): bool
    {
        // Si no hay SKU, la fila está vacía
        if (!$this->hasField($row, 'sku')) {
            return true;
        }

        // Verificar si todas las columnas están vacías
        foreach ($row as $value) {
            if (!is_null($value) && trim(strval($value)) !== '') {
                return false;
            }
        }

        return true;
    }

    /**
     * Manejo de errores
     */
    public function onError(Throwable $e)
    {
        $this->addError("Error general: " . $e->getMessage());
    }

    public function onFailure(Failure ...$failures)
    {
        foreach ($failures as $failure) {
            $this->addError(sprintf(
                "Fila %d, Columna '%s': %s",
                $failure->row(),
                $failure->attribute(),
                implode(', ', $failure->errors())
            ));
        }
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    private function addError(string $message): void
    {
        $this->errors[] = $message;
    }

    /**
     * Configurar mapeos de campos personalizados
     */
    public function setFieldMappings(array $mappings): self
    {
        $this->fieldMappings = array_merge($this->fieldMappings, $mappings);
        return $this;
    }

    /**
     * Obtener mapeos de campos actuales
     */
    public function getFieldMappings(): array
    {
        return $this->fieldMappings;
    }

    /**
     * Obtener archivo PDF del producto basado en el SKU
     */
    private function getPdfFile(string $sku): ?string
    {
        $path = "images/item/{$sku}.pdf";

        if (Storage::exists($path)) {
            return "{$sku}.pdf";
        }

        return null;
    }

    
    /**
     * Asociar promociones/tags al producto
     */
    private function processTags(array $row)
    {
        // 1. Obtener la cadena separada por comas del Excel
        $tagsString = $this->getFieldValue($row, 'tags');
        
        if (empty(trim($tagsString))) {
            return null; // Retornamos null si la celda está vacía
        }

        $tagNames = explode(',', $tagsString);
        $finalTags = [];

        foreach ($tagNames as $tagName) {
            $tagName = trim($tagName);
            if (empty($tagName)) continue;

            // 2. Buscar o crear la etiqueta en el maestro de Testimonies (para el Select futuro)
            Testimony::firstOrCreate(
                ['name' => $tagName],
                [
                    'correlative' => Str::slug($tagName),
                    'visible' => true,
                    'status' => true,
                ]
            );

            // 3. Guardamos el NOMBRE de la etiqueta (no el ID)
            $finalTags[] = $tagName;
        }

        // Si el arreglo queda vacío, retornamos null
        if (empty($finalTags)) {
            return null;
        }

       
        return $finalTags;
    }

    private function createVariant(Item $parentItem, array $row, string $sku, ?string $colorName, ?string $sizeName): void
    {
        // 1. Extraer precios y stock específicos de esta variante
        $precio = $this->getNumericValue($row, 'precio', $parentItem->price);
        $descuento = $this->getNumericValue($row, 'descuento');
        $finalPrice = $this->calculateFinalPrice($precio, $descuento);
        $stock = $this->getNumericValue($row, 'stock', 999999);
        $minStock = $this->getNumericValue($row, 'min_stock', 50);

        // 👇 NUEVO: 1.5 Buscar la imagen usando el SKU de la variante (ej: BOLLA-1BT-TC)
        $variantImages = $this->getSkuBasedImages($sku);
        $variantImage = $variantImages[0] ?? null;

        // 2. Buscar o crear el Color asociado a este Item
        // (Asegúrate de importar el modelo: use App\Models\Color;)
        $colorModel = null;
        if ($colorName) {
            $colorModel = ItemColor::firstOrCreate([
                'item_id' => $parentItem->id,
                'name' => $colorName
            ]);

            // 👇 NUEVO: Si encontramos una imagen, actualizamos el registro del Color
            if ($variantImage) {
                // OJO: Si tu columna en base de datos se llama distinto (ej: 'url_image' o 'foto'), cámbialo aquí
                $colorModel->update(['image' => $variantImage]); 
            }
        }

        // 3. Buscar o crear la Talla/Presentación asociada a este Item
        // (Asegúrate de importar el modelo: use App\Models\Zise; o Size)
        $sizeModel = null;
        if ($sizeName) {
            $sizeModel = ItemZise::firstOrCreate([ // Cambia Zise por Size si es necesario
                'item_id' => $parentItem->id,
                'name' => $sizeName
            ]);
        }

        // 4. Crear o actualizar la Variante final
        // (Asegúrate de importar el modelo: use App\Models\Variant;)
        ItemVariant::updateOrCreate(
            [
                'item_id' => $parentItem->id,
                'color_id' => $colorModel ? $colorModel->id : null,
                'zise_id' => $sizeModel ? $sizeModel->id : null, 
            ],
            [
                'sku' => $sku ?? $parentItem->sku . '-' . Crypto::short(),
                'price' => $precio,
                'discount' => $descuento,
                'final_price' => $finalPrice,
                'stock' => $stock,
                'min_stock' => $minStock,
            ]
        );

        Log::info("Variante guardada con éxito", [
            'parent_sku' => $parentItem->sku,
            'variant_sku' => $sku,
            'color' => $colorName,
            'talla' => $sizeName,
            'imagen_variante' => $variantImage
        ]);
    }


}
