// Función auxiliar para verificar si un producto de oferta tiene variantes
function checkOfferVariants(item) {
    if (!item.ad || !item.ad.offer_item) {
        return {
            hasVariants: false,
            hasColors: false,
            hasSizes: false,
            message: "No hay oferta o producto de oferta"
        };
    }

    const offerItem = item.ad.offer_item;
    const hasColors = offerItem.colors && offerItem.colors.length > 0;
    const hasSizes = offerItem.sizes && offerItem.sizes.length > 0;
    const hasVariants = hasColors || hasSizes;

    return {
        hasVariants,
        hasColors,
        hasSizes,
        colors: hasColors ? offerItem.colors : [],
        sizes: hasSizes ? offerItem.sizes : [],
        message: hasVariants 
            ? `El producto de oferta tiene ${hasColors ? 'colores' : ''}${hasColors && hasSizes ? ' y ' : ''}${hasSizes ? 'tallas' : ''}`
            : "El producto de oferta no tiene variantes"
    };
}

// Función para calcular stock de oferta según variantes
function calculateOfferStock(offerItem, selectedColor, selectedSize) {
    if (!offerItem) return 0;

    if (offerItem.variants && offerItem.variants.length > 0) {
        const variant = offerItem.variants.find(
            v =>
                (!offerItem.colors?.length || v.color?.name === selectedColor) &&
                (!offerItem.sizes?.length || v.zise?.name === selectedSize)
        );
        return variant ? variant.stock : 0;
    } else {
        return offerItem.stock ?? 0;
    }
}

// Ejemplo de uso:
console.log("=== PRUEBA DE LÓGICA DE VARIANTES EN OFERTAS ===");

// Caso 1: Producto sin variantes
const itemSinVariantes = {
    id: "item-1",
    name: "Producto Principal",
    ad: {
        offer_item: {
            id: "offer-1",
            name: "Producto Oferta Simple",
            stock: 10
        }
    }
};

console.log("\n1. Producto de oferta SIN variantes:");
console.log(checkOfferVariants(itemSinVariantes));

// Caso 2: Producto con colores
const itemConColores = {
    id: "item-2", 
    name: "Producto Principal",
    ad: {
        offer_item: {
            id: "offer-2",
            name: "Producto Oferta con Colores",
            stock: 15,
            colors: [
                { id: "color-1", name: "Rojo", summary: "#FF0000" },
                { id: "color-2", name: "Azul", summary: "#0000FF" }
            ],
            variants: [
                { color: { name: "Rojo" }, stock: 5 },
                { color: { name: "Azul" }, stock: 8 }
            ]
        }
    }
};

console.log("\n2. Producto de oferta CON colores:");
console.log(checkOfferVariants(itemConColores));
console.log("Stock para color Rojo:", calculateOfferStock(itemConColores.ad.offer_item, "Rojo", null));
console.log("Stock para color Azul:", calculateOfferStock(itemConColores.ad.offer_item, "Azul", null));

// Caso 3: Producto con tallas
const itemConTallas = {
    id: "item-3",
    name: "Producto Principal", 
    ad: {
        offer_item: {
            id: "offer-3",
            name: "Producto Oferta con Tallas",
            stock: 20,
            sizes: [
                { id: "size-1", name: "S" },
                { id: "size-2", name: "M" },
                { id: "size-3", name: "L" }
            ],
            variants: [
                { zise: { name: "S" }, stock: 3 },
                { zise: { name: "M" }, stock: 10 },
                { zise: { name: "L" }, stock: 2 }
            ]
        }
    }
};

console.log("\n3. Producto de oferta CON tallas:");
console.log(checkOfferVariants(itemConTallas));
console.log("Stock para talla S:", calculateOfferStock(itemConTallas.ad.offer_item, null, "S"));
console.log("Stock para talla M:", calculateOfferStock(itemConTallas.ad.offer_item, null, "M"));
console.log("Stock para talla L:", calculateOfferStock(itemConTallas.ad.offer_item, null, "L"));

// Caso 4: Producto con colores Y tallas
const itemCompleto = {
    id: "item-4",
    name: "Producto Principal",
    ad: {
        offer_item: {
            id: "offer-4", 
            name: "Producto Oferta Completo",
            stock: 50,
            colors: [
                { id: "color-1", name: "Negro", summary: "#000000" },
                { id: "color-2", name: "Blanco", summary: "#FFFFFF" }
            ],
            sizes: [
                { id: "size-1", name: "S" },
                { id: "size-2", name: "M" }
            ],
            variants: [
                { color: { name: "Negro" }, zise: { name: "S" }, stock: 5 },
                { color: { name: "Negro" }, zise: { name: "M" }, stock: 8 },
                { color: { name: "Blanco" }, zise: { name: "S" }, stock: 3 },
                { color: { name: "Blanco" }, zise: { name: "M" }, stock: 12 }
            ]
        }
    }
};

console.log("\n4. Producto de oferta CON colores Y tallas:");
console.log(checkOfferVariants(itemCompleto));
console.log("Stock para Negro S:", calculateOfferStock(itemCompleto.ad.offer_item, "Negro", "S"));
console.log("Stock para Negro M:", calculateOfferStock(itemCompleto.ad.offer_item, "Negro", "M"));
console.log("Stock para Blanco S:", calculateOfferStock(itemCompleto.ad.offer_item, "Blanco", "S"));
console.log("Stock para Blanco M:", calculateOfferStock(itemCompleto.ad.offer_item, "Blanco", "M"));

console.log("\n=== PRUEBA COMPLETADA ===");
