# 🛍️ Sistema de Ofertas con Variantes - Documentación

## Descripción General

El sistema de ofertas con variantes permite que cuando un usuario agregue un producto al carrito, se muestre un modal con una oferta especial. Si el producto de la oferta tiene variantes (colores y/o tallas), el usuario podrá seleccionar estas opciones antes de agregar la oferta al carrito.

## Componentes Modificados

### 1. **Detail.jsx** (Frontend)
- **Estados agregados:**
  - `selectedOfferColor`: Color seleccionado para la oferta
  - `selectedOfferSize`: Talla seleccionada para la oferta
  - `showOfferVariants`: Controla si se muestran los selectores de variantes

- **Lógica implementada:**
  - Detecta automáticamente si el producto de oferta tiene variantes
  - Muestra selectores de color y/o talla según corresponda
  - Valida stock antes de agregar al carrito
  - Calcula stock específico por variante

### 2. **Ad.php** (Modelo)
- **Relación agregada:**
  ```php
  public function offer_item()
  {
      return $this->belongsTo(Item::class, 'offer_item_id')->with(['colors', 'sizes', 'variants']);
  }
  ```

### 3. **Controladores** (Backend)
- **DetailController.php** y **HomeController.php** ya cargan correctamente:
  - `offer_item` con colores, tallas y variantes
  - Stock de variantes filtrado (> 0)

## Casos de Uso

### 1. **Oferta sin variantes**
```javascript
// El modal se muestra directamente sin selectores
// El usuario hace clic en la imagen para agregar al carrito
```

### 2. **Oferta con colores**
```javascript
// Se muestran círculos de colores
// selectedOfferColor se inicializa con el primer color
// Al cambiar color, se actualiza la imagen principal
```

### 3. **Oferta con tallas**
```javascript
// Se muestra un selector dropdown
// selectedOfferSize se inicializa con la primera talla
```

### 4. **Oferta con colores Y tallas**
```javascript
// Se muestran ambos selectores
// El stock se calcula por la combinación específica
```

## Validación de Stock

### Frontend (Detail.jsx)
```javascript
// Calcula stock disponible según variantes seleccionadas
let stockDisponibleOferta = 0;
if (item.ad.offer_item.variants && item.ad.offer_item.variants.length > 0) {
    const varianteOferta = item.ad.offer_item.variants.find(
        v =>
            (!item.ad.offer_item.colors?.length || v.color?.name === selectedOfferColor) &&
            (!item.ad.offer_item.sizes?.length || v.zise?.name === selectedOfferSize)
    );
    stockDisponibleOferta = varianteOferta ? varianteOferta.stock : 0;
} else {
    stockDisponibleOferta = item.ad.offer_item.stock ?? 0;
}
```

### Backend (CarritoContext)
El contexto del carrito debe validar stock antes de confirmar la adición.

## Flujo de Usuario

1. **Usuario agrega producto principal al carrito**
2. **Sistema verifica si hay oferta:**
   - Si no hay oferta → Continúa normal
   - Si hay oferta sin variantes → Muestra modal simple
   - Si hay oferta con variantes → Muestra modal con selectores
3. **Usuario selecciona variantes (si aplica):**
   - Colores: Clic en círculo de color
   - Tallas: Selección en dropdown
   - Sistema actualiza stock en tiempo real
4. **Usuario hace clic en imagen de oferta:**
   - Valida stock disponible
   - Agrega oferta al carrito con variantes seleccionadas
   - Cierra modal

## Estructura de Datos

### Item de Oferta
```javascript
{
  id: "offer-item-id",
  name: "Producto de Oferta",
  stock: 50,
  colors: [
    {
      id: "color-1",
      name: "Rojo",
      summary: "#FF0000",
      image: "rojo.jpg"
    }
  ],
  sizes: [
    {
      id: "size-1", 
      name: "M"
    }
  ],
  variants: [
    {
      color: { name: "Rojo" },
      zise: { name: "M" },
      stock: 5
    }
  ]
}
```

### Objeto enviado al carrito
```javascript
{
  ...item.ad.offer_item,
  quantity: 1,
  price: item.ad.offer_price ?? item.ad.offer_item.final_price,
  selectedColor: selectedOfferColor,
  selectedSize: selectedOfferSize
}
```

## Estilos CSS Aplicados

### Modal de Oferta
- Fondo con blur: `backdrop-filter: blur(10px)`
- Panel de variantes semi-transparente: `bg-white/90`
- Posicionamiento absoluto para no interferir con imagen

### Selectores de Color
- Círculos con borde cuando están seleccionados
- Hover effects para mejor UX
- Tamaño reducido para el modal (18px vs 22px normal)

### Selectores de Talla
- Dropdown compacto con estilo consistente
- Texto reducido para el espacio del modal

## Testing

Se creó un archivo de prueba HTML que simula todos los casos:
- `test_offer_variants.html` (temporal, se elimina después del testing)

## Consideraciones Técnicas

1. **Performance:** Las variantes se cargan con el producto inicial
2. **UX:** Selección automática del primer color/talla disponible
3. **Validación:** Stock se verifica tanto en frontend como backend
4. **Responsive:** El modal se adapta a diferentes tamaños de pantalla
5. **Accesibilidad:** Labels y títulos descriptivos para screen readers

## Casos Edge

1. **Sin stock en variante seleccionada:** Botón deshabilitado + mensaje
2. **Producto sin variantes:** Modal simple sin selectores
3. **Solo un color/talla:** Se pre-selecciona automáticamente
4. **Error en carga de datos:** Fallback a oferta simple

## Mantenimiento

- **Para agregar nuevos tipos de variantes:** Modificar lógica en `Detail.jsx`
- **Para cambiar estilos:** Actualizar clases Tailwind en el modal
- **Para modificar validaciones:** Actualizar `calculateOfferStock` logic

---

*Sistema implementado y probado - Ready for Production* ✅
