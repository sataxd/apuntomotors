/**
 * Tracking Pixels Helper
 * Maneja eventos de seguimiento para múltiples plataformas
 */
window.TrackingPixels = {
    // Verificar si un píxel está configurado
    isConfigured: function(pixelType) {
        const globalData = window.global || {};
        const pixelId = globalData[pixelType];
        return pixelId && pixelId.trim() !== '';
    },

    // Evento de Page View
    trackPageView: function() {
        // Facebook/Meta Pixel
        if (this.isConfigured('FACEBOOK_PIXEL') || this.isConfigured('META_PIXEL')) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'PageView');
            }
        }

        // Google Analytics
        if (this.isConfigured('GOOGLE_ANALYTICS')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view');
            }
        }

        // TikTok Pixel
        if (this.isConfigured('TIKTOK_PIXEL')) {
            if (typeof ttq !== 'undefined') {
                ttq.page();
            }
        }
    },

    // Evento de compra/conversión
    trackPurchase: function(value, currency = 'PEN', contents = []) {
        // Facebook/Meta Pixel
        if (this.isConfigured('FACEBOOK_PIXEL') || this.isConfigured('META_PIXEL')) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                    value: value,
                    currency: currency,
                    contents: contents
                });
            }
        }

        // Google Analytics
        if (this.isConfigured('GOOGLE_ANALYTICS')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase', {
                    transaction_id: Date.now(),
                    value: value,
                    currency: currency,
                    items: contents
                });
            }
        }

        // TikTok Pixel
        if (this.isConfigured('TIKTOK_PIXEL')) {
            if (typeof ttq !== 'undefined') {
                ttq.track('CompletePayment', {
                    value: value,
                    currency: currency,
                    contents: contents
                });
            }
        }
    },

    // Evento de agregar al carrito
    trackAddToCart: function(value, currency = 'PEN', content_name = '', content_id = '') {
        // Facebook/Meta Pixel
        if (this.isConfigured('FACEBOOK_PIXEL') || this.isConfigured('META_PIXEL')) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'AddToCart', {
                    value: value,
                    currency: currency,
                    content_name: content_name,
                    content_id: content_id
                });
            }
        }

        // Google Analytics
        if (this.isConfigured('GOOGLE_ANALYTICS')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    currency: currency,
                    value: value,
                    items: [{
                        item_id: content_id,
                        item_name: content_name,
                        quantity: 1,
                        price: value
                    }]
                });
            }
        }

        // TikTok Pixel
        if (this.isConfigured('TIKTOK_PIXEL')) {
            if (typeof ttq !== 'undefined') {
                ttq.track('AddToCart', {
                    value: value,
                    currency: currency,
                    content_name: content_name,
                    content_id: content_id
                });
            }
        }
    },

    // Evento de iniciar checkout
    trackInitiateCheckout: function(value, currency = 'PEN') {
        // Facebook/Meta Pixel
        if (this.isConfigured('FACEBOOK_PIXEL') || this.isConfigured('META_PIXEL')) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    value: value,
                    currency: currency
                });
            }
        }

        // Google Analytics
        if (this.isConfigured('GOOGLE_ANALYTICS')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'begin_checkout', {
                    currency: currency,
                    value: value
                });
            }
        }

        // TikTok Pixel
        if (this.isConfigured('TIKTOK_PIXEL')) {
            if (typeof ttq !== 'undefined') {
                ttq.track('InitiateCheckout', {
                    value: value,
                    currency: currency
                });
            }
        }
    },

    // Evento de ver contenido
    trackViewContent: function(content_name = '', content_id = '', value = 0, currency = 'PEN') {
        // Facebook/Meta Pixel
        if (this.isConfigured('FACEBOOK_PIXEL') || this.isConfigured('META_PIXEL')) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', {
                    content_name: content_name,
                    content_id: content_id,
                    value: value,
                    currency: currency
                });
            }
        }

        // Google Analytics
        if (this.isConfigured('GOOGLE_ANALYTICS')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_item', {
                    currency: currency,
                    value: value,
                    items: [{
                        item_id: content_id,
                        item_name: content_name,
                        price: value
                    }]
                });
            }
        }

        // TikTok Pixel
        if (this.isConfigured('TIKTOK_PIXEL')) {
            if (typeof ttq !== 'undefined') {
                ttq.track('ViewContent', {
                    content_name: content_name,
                    content_id: content_id,
                    value: value,
                    currency: currency
                });
            }
        }
    },

    // Evento personalizado
    trackCustomEvent: function(eventName, parameters = {}) {
        // Facebook/Meta Pixel
        if (this.isConfigured('FACEBOOK_PIXEL') || this.isConfigured('META_PIXEL')) {
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', eventName, parameters);
            }
        }

        // Google Analytics
        if (this.isConfigured('GOOGLE_ANALYTICS')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, parameters);
            }
        }

        // TikTok Pixel
        if (this.isConfigured('TIKTOK_PIXEL')) {
            if (typeof ttq !== 'undefined') {
                ttq.track(eventName, parameters);
            }
        }
    }
};

// Auto-llamada al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Delay para asegurar que los píxeles estén cargados
    setTimeout(function() {
        window.TrackingPixels.trackPageView();
    }, 1000);
});
