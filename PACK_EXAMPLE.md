# Estructura de Packs - Ejemplo de Implementación

## Campo pack_items (JSON)

El campo `pack_items` en la tabla `items` debe contener un array JSON simple con los IDs de los productos:

```json
[
    "uuid-del-producto-1",
    "uuid-del-producto-2", 
    "uuid-del-producto-3"
]
```

## Ejemplo de un Pack

### Producto Pack: "Kit Belleza Completo"
- ID: pack-123-456
- Nombre: "Kit Belleza Completo"
- pack_items:
```json
[
    "crema-facial-uuid",
    "serum-vitamina-c-uuid",
    "mascarilla-hidratante-uuid"
]
```

## Resultado en WhatsApp

**Antes (producto normal):**
```
+ *Crema Facial Hidratante* TALLA M COLOR ROSA
```

**Después (pack):**
```
+ *PACK: Kit Belleza Completo*
  - *Crema Facial Hidratante*
  - *Serum Vitamina C*
  - *Mascarilla Hidratante*
```

## Métodos agregados al modelo Item

1. `isPack()` - Verifica si el producto es un pack
2. `getPackItems()` - Obtiene los productos del pack
3. `getPackItemsDisplay()` - Obtiene una cadena legible de los productos del pack

## Uso en el Admin/Backend

Para crear un pack desde el admin, deberás:

1. Crear el producto pack normalmente
2. En "Productos del Pack", seleccionar los productos que lo componen
3. El sistema automáticamente detectará que es un pack y mostrará los productos individuales en WhatsApp

## Notas importantes

- Un producto puede ser pack O individual, no ambos
- Si `pack_items` está vacío o es null, se trata como producto individual
- Los productos dentro de un pack se mostrarán sin cantidad (1 unidad cada uno)
- En WhatsApp se mostrará primero el nombre del pack y luego los productos que lo componen
- La estructura es ahora más simple: solo un array de IDs de productos
