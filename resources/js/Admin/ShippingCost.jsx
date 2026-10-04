import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/form/InputFormGroup";
import SelectFormGroup from "../Components/form/SelectFormGroup"; // <-- NUEVO IMPORT
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import ShippingCostsRest from "../Actions/Admin/ShippingCostRest";
import Swal from "sweetalert2";

const shippingRest = new ShippingCostsRest();

const ShippingCosts = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Referencias del formulario
    const idRef = useRef();
    const zoneRef = useRef();
    const costRef = useRef();
    const descriptionRef = useRef();
    
    // Separamos las referencias según el tipo de input
    const districtsTextRef = useRef(); // Para el textarea bloqueado
    const districtsSelectRef = useRef(); // Para el Select múltiple

    const [isEditing, setIsEditing] = useState(false);
    const [selectedZone, setSelectedZone] = useState("Lima Metropolitana");
    const [currentEditingId, setCurrentEditingId] = useState(null);

    // Estados para Ubigeo
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [allDistrictsDict, setAllDistrictsDict] = useState({});
    const [currentSavedDistricts, setCurrentSavedDistricts] = useState([]);

    // Variable para detectar bloqueo (Las zonas que quedan igual que antes)
    const isProvinciaOrRegion = selectedZone === "Lima Provincia" || selectedZone === "Region";

    // 1. Cargar el diccionario de todos los distritos para mostrarlos bonito en la tabla
    useEffect(() => {
        fetch('/api/ubigeo/all-districts')
            .then(res => res.json())
            .then(data => {
                const dict = {};
                data.forEach(d => dict[d.id] = d.description);
                setAllDistrictsDict(dict);
            })
            .catch(err => console.error("Falta crear la ruta /api/ubigeo/all-districts", err));
    }, []);

    // 2. Cargar distritos disponibles si es Lima o Callao
    useEffect(() => {
        let provinceId = null;
        if (selectedZone === 'Lima Metropolitana') provinceId = '1501';
        else if (selectedZone === 'Callao') provinceId = '0701';

        if (provinceId) {
            shippingRest.getAvailableDistricts(provinceId, currentEditingId).then(data => {
                setAvailableDistricts(data);
            });
        } else {
            setAvailableDistricts([]);
        }
    }, [selectedZone, currentEditingId]);

    // 3. Autocompletar el Select Multiple cuando cargan los datos
    useEffect(() => {
        if (isEditing && districtsSelectRef.current && availableDistricts.length > 0 && currentSavedDistricts.length > 0) {
            $(districtsSelectRef.current).val(currentSavedDistricts).trigger('change');
            setCurrentSavedDistricts([]); // Limpiar para no crear bucle
        }
    }, [availableDistricts]);

    const onModalOpen = (data) => {
        const editing = !!data?.id;
        setIsEditing(editing);
        setCurrentEditingId(data?.id ?? null);

        const initialZone = data?.zone ?? "Lima Metropolitana";

        idRef.current.value = data?.id ?? "";
        zoneRef.current.value = initialZone;
        costRef.current.value = data?.cost ?? "0.00";
        descriptionRef.current.value = data?.description ?? "";

        setSelectedZone(initialZone);

        // Preparamos los distritos según el tipo
        if (initialZone === "Lima Provincia" || initialZone === "Region") {
            setTimeout(() => {
                if (districtsTextRef.current) districtsTextRef.current.value = data?.districts ?? "";
            }, 50);
        } else {
            setCurrentSavedDistricts(data?.districts || []);
            if (!editing && districtsSelectRef.current) {
                $(districtsSelectRef.current).val(null).trigger('change');
            }
        }

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        // Si es provincia/región guardamos un string vacío (o lo que haya en el textarea). 
        // Si es Lima/Callao, extraemos el array de IDs del Select2.
        const finalDistricts = isProvinciaOrRegion 
            ? "" 
            : ($(districtsSelectRef.current).val() || []);

        const request = {
            id: idRef.current.value || undefined,
            zone: zoneRef.current.value,
            cost: parseFloat(costRef.current.value),
            description: descriptionRef.current.value,
            districts: finalDistricts, 
        };

        const result = await shippingRest.save(request);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await shippingRest.boolean({ id, field: "visible", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar costo de envío",
            text: "¿Estás seguro? Los distritos asociados volverán a estar disponibles.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        
        const result = await shippingRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Costos de Envío por Distrito"
                rest={shippingRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () => $(gridRef.current).dxDataGrid("instance").refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Nuevo Costo",
                            hint: "Agregar nuevo costo",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    { dataField: "id", caption: "ID", visible: false },
                    { 
                        dataField: "zone", 
                        caption: "Zona",
                        width: 180,
                        cellTemplate: (container, { data }) => {
                            let badgeClass = "bg-primary";
                            if(data.zone === 'Lima Provincia') badgeClass = "bg-info";
                            if(data.zone === 'Region') badgeClass = "bg-warning text-dark";
                            ReactAppend(container, <span className={`badge ${badgeClass}`}>{data.zone}</span>);
                        }
                    },
                    { 
                        dataField: "districts", 
                        caption: "Distritos",
                        cellTemplate: (container, { data }) => {
                            if (!data.districts || data.districts.length === 0) {
                                $(container).html('<span class="text-muted fst-italic">Todos los distritos de la zona</span>');
                            } else {
                                // Si es un array de IDs (Lima/Callao), lo traducimos. Si es un string, se muestra directo.
                                const districtsText = Array.isArray(data.districts) 
                                    ? data.districts.map(id => allDistrictsDict[id] || id).join(', ') 
                                    : data.districts;
                                $(container).text(districtsText);
                            }
                        }
                    },
                    { 
                        dataField: "cost", 
                        caption: "Costo (S/)", 
                        dataType: "number",
                        format: "#,##0.00",
                        width: 120
                    },
                    { 
                        dataField: "description", 
                        caption: "Descripción",
                        visible: false
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: 100,
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup checked={data.visible == 1} onChange={() => onVisibleChange({ id: data.id, value: !data.visible })} />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: 100,
                        cellTemplate: (container, { data }) => {
                            container.append(DxButton({ className: "btn btn-xs btn-soft-primary me-1", title: "Editar", icon: "fa fa-pen", onClick: () => onModalOpen(data) }));
                            container.append(DxButton({ className: "btn btn-xs btn-soft-danger", title: "Eliminar", icon: "fa fa-trash", onClick: () => onDeleteClicked(data.id) }));
                        },
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar Costo de Envío" : "Agregar Costo de Envío"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="modal-shipping-container">
                    <input ref={idRef} type="hidden" />
                    
                    {/* --- FILA 1: ZONA Y COSTO --- */}
                    <div className="form-group col-sm-6 mb-3">
                        <label className="form-label text-dark fw-semibold">Zona</label>
                        <select 
                            ref={zoneRef} 
                            className="form-select form-control" 
                            required
                            onChange={(e) => {
                                const newZone = e.target.value;
                                setSelectedZone(newZone);
                                if (newZone === "Lima Provincia" || newZone === "Region") {
                                    costRef.current.value = "0.00";
                                    if(districtsTextRef.current) districtsTextRef.current.value = "";
                                } else {
                                    if(districtsSelectRef.current) $(districtsSelectRef.current).val(null).trigger('change');
                                }
                            }}
                        >
                            <option value="Lima Metropolitana">Lima Metropolitana</option>
                            <option value="Callao">Callao</option>
                            <option value="Lima Provincia">Lima Provincia</option>
                            <option value="Region">Región (Departamentos)</option>
                        </select>
                    </div>

                    <div 
                        className="form-group col-sm-6 mb-3" 
                        style={{ 
                            opacity: isProvinciaOrRegion ? 0.5 : 1, 
                            pointerEvents: isProvinciaOrRegion ? 'none' : 'auto',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <label className="form-label text-dark fw-semibold">Costo de envío (S/)</label>
                        <input 
                            ref={costRef} 
                            type="number" 
                            step="0.01" 
                            className="form-control" 
                            required 
                            disabled={isProvinciaOrRegion} 
                        />
                    </div>

                    {/* --- FILA 2: DISTRITOS (Condicional según Zona) --- */}
                    <div className="col-sm-12 mb-3">
                        {!isProvinciaOrRegion ? (
                            // MODO LIMA/CALLAO: Select Múltiple con IDs de la BD
                            <>
                                <SelectFormGroup
                                    eRef={districtsSelectRef}
                                    label={`Distritos de ${selectedZone}`}
                                    dropdownParent="#modal-shipping-container"
                                    multiple={true}
                                >
                                    {availableDistricts.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </SelectFormGroup>
                                <small className="text-muted mt-[-10px] d-block">
                                    <i className="fa fa-info-circle me-1"></i>
                                    Solo se muestran los distritos que no han sido asignados a otro costo.
                                </small>
                            </>
                        ) : (
                            // MODO OTRAS ZONAS: Textarea bloqueado original
                            <div 
                                style={{ 
                                    opacity: 0.5, 
                                    pointerEvents: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <label className="form-label text-dark fw-semibold">Distritos aplicables</label>
                                <textarea 
                                    ref={districtsTextRef} 
                                    className="form-control" 
                                    rows={2} 
                                    placeholder="Todos los distritos" 
                                    disabled 
                                />
                                <small className="text-muted mt-1 d-block">
                                    <i className="fa fa-info-circle me-1"></i>
                                    Esta zona aplica a nivel general (Pago en destino).
                                </small>
                            </div>
                        )}
                    </div>

                    {/* --- FILA 3: MENSAJE EXPLICATIVO --- */}
                    {isProvinciaOrRegion && (
                        <div className="col-sm-12 mb-3">
                            <div className="alert alert-warning d-flex align-items-center py-2 px-3 mb-0 shadow-sm border-warning">
                                <i className="fa fa-exclamation-triangle fs-4 me-3 text-warning"></i>
                                <div>
                                    <strong>Pago en Destino:</strong> Se ha bloqueado el costo y los distritos. El sistema cobrará <strong>S/ 0.00</strong> en la web y el cliente pagará el envío al Courier al recibir su pedido.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- FILA 4: DESCRIPCIÓN --- */}
                    <InputFormGroup 
                        eRef={descriptionRef} 
                        label="Descripción / Mensaje (Se mostrará al cliente)" 
                        col="col-sm-12" 
                        placeholder='Ej: "Pago en Destino con Olva" o "Llega en 24 horas"'
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Costos de Envío">
            <ShippingCosts {...properties} />
        </BaseAdminto>
    );
});