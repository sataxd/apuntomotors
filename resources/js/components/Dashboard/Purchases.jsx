import React, { useRef, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Table from '../Tailwind/Table';
import SalesRest from '../../Actions/Customer/SalesRest';
import ReactAppend from '../../Utils/ReactAppend';
import Number2Currency from '../../Utils/Number2Currency';
import { PackageSearch, MapPin, Eye, X, Receipt, ShoppingBag, Truck, Tag, Store } from 'lucide-react';
import Global from '../../Utils/Global';

const salesRest = new SalesRest();
ReactModal.setAppElement('#app');

const Purchases = () => {
    const gridRef = useRef();
    
    // Estados para el Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [saleLoaded, setSaleLoaded] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Bloquear scroll al abrir el modal
    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [modalOpen]);

    // Función para abrir el modal y buscar los detalles de la venta
    const onModalOpen = async (saleId) => {
        setModalOpen(true);
        setLoadingDetails(true);
        setSaleLoaded(null); // Limpiar data anterior
        
        const newSale = await salesRest.get(saleId);
        if (newSale && newSale.data) {
            setSaleLoaded(newSale.data);
        }
        setLoadingDetails(false);
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 font-dmsans h-full">
            
            {/* Header de la Tarjeta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-2.5 rounded-xl text-[#FF9900]">
                        <PackageSearch className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold font-sora text-black leading-none mb-1">
                            Historial de compras
                        </h2>
                        <p className="text-sm text-gray-500">Revisa el estado y detalle de tus pedidos.</p>
                    </div>
                </div>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="p-0 overflow-hidden rounded-xl border border-gray-200">
                <Table 
                    gridRef={gridRef} 
                    rest={salesRest}
                    toolBar={(container) => {
                        container.unshift({
                            widget: 'dxButton', 
                            location: 'after',
                            options: {
                                icon: 'refresh', 
                                hint: 'Actualizar historial',
                                stylingMode: 'text',
                                onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
                            }
                        });
                    }}
                    columns={[
                        {
                            caption: 'Pedido',
                            width: '100%',
                            cellTemplate: (container, { data }) => {
                                ReactAppend(container, 
                                    <div className="py-2 px-2 flex flex-col gap-1">
                                        <b className="text-base text-black font-sora line-clamp-1">
                                            #{Global.APP_CORRELATIVE}-{data.code}
                                        </b>
                                        <span className="text-xs text-gray-500">
                                            {data?.bundle?.name || 'Múltiples productos'}
                                        </span>
                                    </div>
                                )
                            }
                        },
                        {
                            dataField: 'total_amount',
                            caption: 'Total',
                            dataType: 'number',
                            alignment: 'center',
                            width: '120px',
                            cellTemplate: (container, { data }) => {
                                container.css({ verticalAlign: 'middle' });
                                ReactAppend(container, 
                                    <span className="font-bold font-sora text-[#FF9900] text-base">
                                        S/ {Number2Currency(data.total_amount)}
                                    </span>
                                );
                            }
                        },
                        {
                            dataField: 'status.name',
                            caption: 'Estado',
                            alignment: 'center',
                            width: '150px',
                            cellTemplate: (container, { data }) => {
                                container.css({ verticalAlign: 'middle' });
                                ReactAppend(container, 
                                    <span 
                                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide" 
                                        style={{
                                            backgroundColor: data.status?.color ? `${data.status.color}15` : '#f3f4f6',
                                            color: data.status?.color ?? '#4b5563',
                                            border: `1px solid ${data.status?.color ? `${data.status.color}30` : '#e5e7eb'}`
                                        }}
                                    >
                                        {data.status?.name || 'Desconocido'}
                                    </span>
                                )
                            }
                        },
                        {
                            dataField: 'created_at',
                            caption: 'Fecha',
                            dataType: 'datetime',
                            format: 'dd MMM yyyy',
                            sortOrder: 'desc',
                            alignment: 'center',
                            width: '140px',
                            cellTemplate: (container, { text }) => {
                                container.css({ verticalAlign: 'middle' });
                                ReactAppend(container, <span className="text-sm font-medium text-gray-700">{text}</span>);
                            }
                        },
                        {
                            caption: 'Acciones',
                            alignment: 'center',
                            width: '100px',
                            cellTemplate: (container, { data }) => {
                                container.css({ verticalAlign: 'middle' });
                                ReactAppend(container, 
                                    <button 
                                        onClick={() => onModalOpen(data.id)}
                                        className="p-2 bg-orange-50 text-[#FF9900] hover:bg-[#FF9900] hover:text-white rounded-xl transition-all duration-300"
                                        title="Ver detalle"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                );
                            }
                        }
                    ]}
                />
            </div>

            {/* MODAL DE DETALLE DE COMPRA */}
            <ReactModal 
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto font-dmsans focus:outline-none custom-scrollbar"
                overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
            >
                {/* Botón X posicionado absoluto arriba a la derecha */}
                <button 
                    onClick={() => setModalOpen(false)} 
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                {loadingDetails ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <i className="fa fa-spinner fa-spin text-4xl text-[#FF9900] mb-4"></i>
                        <p className="text-gray-500 font-medium">Cargando detalles de tu pedido...</p>
                    </div>
                ) : saleLoaded ? (
                    <div className="flex flex-col gap-6 pt-2">
                        
                        {/* Cabecera del Recibo */}
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="text-2xl font-bold font-sora text-black flex items-center gap-3">
                                <Receipt className="w-7 h-7 text-[#FF9900]" />
                                Pedido #{Global.APP_CORRELATIVE}-{saleLoaded.code}
                            </h3>
                            <div className="flex flex-wrap gap-3 mt-3 items-center">
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                                    {new Date(saleLoaded.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span 
                                    className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide" 
                                    style={{
                                        backgroundColor: saleLoaded.status?.color ? `${saleLoaded.status.color}15` : '#f3f4f6',
                                        color: saleLoaded.status?.color ?? '#4b5563',
                                        border: `1px solid ${saleLoaded.status?.color ? `${saleLoaded.status.color}30` : '#e5e7eb'}`
                                    }}
                                >
                                    {saleLoaded.status?.name}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Información de Envío */}
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                   {saleLoaded.method_shipping === 'delivery' ? <Truck className="w-5 h-5 text-gray-500" /> : <Store className="w-5 h-5 text-gray-500" />}
                                   {saleLoaded.method_shipping === 'delivery' ? 'Dirección de Envío' : 'Recojo en Tienda'}
                                </h4>
                                <div className="text-sm text-gray-600 flex flex-col gap-1">
                                    <p className="font-medium text-black">{saleLoaded.name} {saleLoaded.lastname}</p>
                                    <p>{saleLoaded.address} {saleLoaded.number}</p>
                                    <p>{saleLoaded.district ?? ''} - {saleLoaded.province ?? ''} - {saleLoaded.department ?? ''}</p>
                                    <p>{saleLoaded.country} {saleLoaded.zip_code && saleLoaded.zip_code !== '00000' && `(CP: ${saleLoaded.zip_code})`}</p>
                                    <p className="mt-2 text-gray-500"><b className="text-gray-700">Teléfono:</b> {saleLoaded.phone}</p>
                                    {saleLoaded.reference && <p><b className="text-gray-700">Ref:</b> {saleLoaded.reference}</p>}
                                </div>
                            </div>

                            {/* Resumen Monetario */}
                            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex flex-col justify-center">
                                <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-orange-600" /> Resumen de Pago
                                </h4>
                                <div className="text-sm flex flex-col gap-2">
                                    <div className="flex justify-between text-orange-800">
                                        <span>Subtotal:</span>
                                        <span>S/ {Number2Currency(saleLoaded.amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-orange-800">
                                        <span>
                                            {saleLoaded.method_shipping === 'pickup' ? 'Recojo en tienda:' : 'Envío:'}
                                        </span>
                                        <span>
                                            {saleLoaded.method_shipping === 'pickup' 
                                                ? 'Sin costo' 
                                                : `S/ ${Number2Currency(saleLoaded.delivery)}`
                                            }
                                        </span>
                                    </div>
                                    {Number(saleLoaded.coupon_discount) > 0 && (
                                        <div className="flex justify-between text-green-600 font-medium">
                                            <span>Cupón {saleLoaded.coupon?.name ? `(${saleLoaded.coupon.name})` : ''}:</span>
                                            <span>- S/ {Number2Currency(saleLoaded.coupon_discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg text-black mt-2 pt-2 border-t border-orange-200">
                                        <span>Total:</span>
                                        <span>S/ {Number2Currency(saleLoaded.total_amount)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Lista de Productos */}
                        <div className="mt-2">
                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <ShoppingBag className="w-5 h-5 text-gray-500" /> Productos Comprados
                            </h4>
                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                <table className="w-full text-sm text-left text-gray-600">
                                    <thead className="bg-gray-50 text-gray-700 font-sora">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Producto</th>
                                            <th className="px-4 py-3 font-semibold text-center">Variantes</th>
                                            <th className="px-4 py-3 font-semibold text-center">Precio</th>
                                            <th className="px-4 py-3 font-semibold text-center">Cant.</th>
                                            <th className="px-4 py-3 font-semibold text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {saleLoaded.details?.map((detail, index) => {
                                            const subtotal = detail.price * detail.quantity;
                                            return (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-black">
                                                        {detail.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-xs">
                                                        {(detail.color !== 'Estándar' || detail.size !== 'Unidad') ? (
                                                            <div className="flex flex-col gap-0.5">
                                                                {detail.color !== 'Estándar' && <span>Color: {detail.color}</span>}
                                                                {detail.size !== 'Unidad' && <span>Cantidad: {detail.size}</span>}
                                                            </div>
                                                        ) : <span className="text-gray-400 italic">Estándar</span>}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        S/ {Number2Currency(detail.price)}
                                                    </td>
                                                    <td className="px-4 py-3 text-center font-bold">
                                                        x{detail.quantity}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-semibold text-black">
                                                        S/ {Number2Currency(subtotal)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center text-red-500 py-10 font-bold">
                        Error al cargar los detalles de la venta.
                    </div>
                )}
            </ReactModal>
        </div>
    );
};

export default Purchases;