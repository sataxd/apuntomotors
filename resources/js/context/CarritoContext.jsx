import React, { createContext, useState, useEffect, useRef } from "react";
import { Local } from "sode-extend-react";
import ItemsRest from "../actions/ItemRest";
import AlertComponent from "./AlertComponent";

export const CarritoContext = createContext();
const itemsRest = new ItemsRest();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const data = localStorage.getItem("carrito");
        return data ? JSON.parse(data) : [];
    });

    const [alerta, setAlerta] = useState(null);
    const timeoutRef = useRef(null);

    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const modalTimeoutRef = useRef(null);

    // Función para obtener precios actualizados desde la API
    const actualizarPrecios = async () => {
        try {
            if (carrito.length === 0) return;

            // PREVENCIÓN: Si dice "Estándar", enviamos 'null' a la API para que no explote buscando un color/talla literal llamado "Estándar"
            const payload = carrito.map(producto => ({
                id: producto.id,
                quantity: producto.quantity,
                color: producto.selectedColor === "Estándar" ? null : (producto.selectedColor || null),
                size: producto.selectedSize === "Unidad" ? null : (producto.selectedSize || null),
            }));
            
            itemsRest.verifyStock(payload).then((items) => {
                const newCart = carrito.map((cartItem) => {
                    const checkColor = cartItem.selectedColor === "Estándar" ? null : (cartItem.selectedColor || null);
                    const checkSize = cartItem.selectedSize === "Unidad" ? null : (cartItem.selectedSize || null);

                    const found = items.find((item) => 
                        item.id === cartItem.id && 
                        item.color === checkColor && 
                        item.size === checkSize
                    );
                    
                    if (found) {
                        return {
                            ...cartItem,
                            price: found.price,
                            final_price: found.final_price,
                            discount: found.discount,
                        };
                    }
                    return cartItem;
                });
                setCarrito(newCart);
            });
        } catch (error) {
            console.error("Error al actualizar precios:", error);
        }
    };

    useEffect(() => {
        actualizarPrecios();
    }, []);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Función para agregar productos con validación de stock
    const agregarAlCarrito = async (producto) => {
        // 1. DETERMINAR COLOR FINAL (Prioridad: Selección -> Producto -> "Estándar")
        const finalColor = producto.selectedColor || producto.color || "Estándar";

        // 2. DETERMINAR TALLA/UNIDAD FINAL (Prioridad: Selección -> Producto -> Primera talla -> "Estándar")
        let finalSize = "Unidad";
        if (producto.selectedSize) {
            finalSize = producto.selectedSize;
        } else if (producto.size) {
            finalSize = producto.size;
        } else if (producto.sizes && producto.sizes.length > 0) {
            finalSize = producto.sizes[0].name;
        }

        // 3. GENERAR ID ÚNICO
        const cartItemId = `${producto.id}-${finalColor}-${finalSize}`;

        // 4. PREPARAR PAYLOAD (Si quedó como "Estándar", validamos con 'null' en el backend)
        const payload = [{
            id: producto.id,
            quantity: producto.quantity,
            color: finalColor === "Estándar" ? null : finalColor,
            size: finalSize === "Unidad" ? null : finalSize,
        }];

        const stockResult = await itemsRest.verifyStock(payload);
        const stockInfo = stockResult[0];

        if (!stockInfo || !stockInfo.available) {
            setAlerta({
                id: Date.now(),
                message: `No hay stock suficiente para "${producto.name}"${finalColor !== 'Estándar' ? ` (${finalColor}${finalSize !== 'Unidad' ? ' - ' + finalSize : ''})` : ''}.`,
                actionLabel: "Ver productos",
                duration: 5000,
            });
            return { success: false, message: `No hay stock suficiente para "${producto.name}"` };
        }

        setCarrito((prev) => {
            const index = prev.findIndex((p) => p.cartItemId === cartItemId);

            if (index >= 0) {
                const newCarrito = [...prev];
                newCarrito[index] = { 
                    ...newCarrito[index], 
                    quantity: newCarrito[index].quantity + producto.quantity 
                };
                return newCarrito;
            } else {
                return [
                    ...prev,
                    {
                        ...producto,
                        selectedColor: finalColor, // Guardamos el valor por defecto en el state
                        selectedSize: finalSize,   // Guardamos el valor por defecto en el state
                        cartItemId: cartItemId,
                        variations: undefined
                    }
                ];
            }
        });
        
        if (typeof window !== 'undefined' && window.TrackingPixels) {
            window.TrackingPixels.trackAddToCart(
                stockInfo.price || 0,
                'PEN',
                producto.alias || producto.name || 'Producto',
                producto.id
            );
        }
        
        setMostrarCarrito(true);
        if (modalTimeoutRef.current) {
            clearTimeout(modalTimeoutRef.current);
        }
        modalTimeoutRef.current = setTimeout(() => {
            setMostrarCarrito(false);
        }, 3000);
        
        return { success: true };
    };

    const eliminarProducto = (cartItemId) => {
        setCarrito((prev) => prev.filter((p) => p.cartItemId !== cartItemId));
        setAlerta(null);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
        setAlerta(null);
    };

    const incrementarCantidad = (cartItemId) => {
        setCarrito((prev) => prev.map((item) => 
            item.cartItemId === cartItemId 
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const decrementarCantidad = (cartItemId) => {
        setCarrito((prev) => prev.map((item) => 
            item.cartItemId === cartItemId 
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
        ));
    };

    const eliminarSiCero = (cartItemId) => {
        setCarrito((prev) => prev.filter(item => !(item.cartItemId === cartItemId && item.quantity === 0)));
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarProducto,
                vaciarCarrito,
                actualizarPrecios,
                decrementarCantidad,
                incrementarCantidad,
                eliminarSiCero,
                mostrarCarrito,
                setMostrarCarrito,
            }}
        >
            {children}
            {alerta && (
                <AlertComponent {...alerta} onClose={() => setAlerta(null)} />
            )}
        </CarritoContext.Provider>
    );
};