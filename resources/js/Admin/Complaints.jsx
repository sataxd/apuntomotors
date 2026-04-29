import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import ComplaintRest from "../actions/Admin/ComplaintRest";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";

const complaintRest = new ComplaintRest();

const Complaints = () => {
    const gridRef = useRef();
    const modalRef = useRef();
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const onModalOpen = (data) => {
        setSelectedComplaint(data);
        $(modalRef.current).modal("show");
    };

    const onStatusChange = async ({ id, value }) => {
        const result = await complaintRest.boolean({ id, field: "status", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Libro de Reclamaciones"
                rest={complaintRest}
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
                }}
                columns={[
                    { dataField: "correlative", caption: "Código", width: 140, sortOrder: 'desc' },
                    { dataField: "fullname", caption: "Cliente" },
                    { 
                        dataField: "type", 
                        caption: "Tipo", 
                        width: 120,
                        cellTemplate: (container, { data }) => {
                            const color = data.type === 'Reclamo' ? 'bg-danger' : 'bg-info';
                            ReactAppend(container, <span className={`badge ${color}`}>{data.type}</span>);
                        }
                    },
                    { dataField: "incident_date", caption: "Fecha Incidente", dataType: "date", format: "dd/MM/yyyy", width: 130 },
                    {
                        dataField: "status",
                        caption: "Atendido",
                        dataType: "boolean",
                        width: 100,
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.status == 0} // Si status es false/0, se considera atendido
                                    onChange={() => onStatusChange({ id: data.id, value: !data.status })}
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: 80,
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-primary",
                                    title: "Ver Detalle",
                                    icon: "fa fa-eye",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                        },
                    },
                ]}
            />
            
            <Modal modalRef={modalRef} title={`Detalle del Reclamo: ${selectedComplaint?.correlative}`} size="lg" hideFooter={true}>
                {selectedComplaint && (
                    <div className="row font-dmsans">
                        <div className="col-md-6 mb-4">
                            <h6 className="text-primary border-bottom pb-1">1. IDENTIFICACIÓN DEL CONSUMIDOR</h6>
                            <p className="mb-1"><b>Nombre:</b> {selectedComplaint.fullname}</p>
                            <p className="mb-1"><b>Documento:</b> {selectedComplaint.document_type} - {selectedComplaint.document_number}</p>
                            <p className="mb-1"><b>Teléfono:</b> {selectedComplaint.phone}</p>
                            <p className="mb-1"><b>Email:</b> {selectedComplaint.email}</p>
                            <p className="mb-1"><b>Dirección:</b> {selectedComplaint.address}, {selectedComplaint.district}, {selectedComplaint.province}, {selectedComplaint.department}</p>
                        </div>
                        <div className="col-md-6 mb-4">
                            <h6 className="text-primary border-bottom pb-1">2. BIEN CONTRATADO</h6>
                            <p className="mb-1"><b>Tipo:</b> {selectedComplaint.contract_type}</p>
                            <p className="mb-1"><b>Monto Reclamado:</b> S/ {selectedComplaint.claimed_amount}</p>
                            <p className="mb-1"><b>Descripción:</b> {selectedComplaint.product_description}</p>
                        </div>
                        <div className="col-12">
                            <h6 className="text-primary border-bottom pb-1">3. DETALLE DEL RECLAMO / QUEJA</h6>
                            <div className="bg-light p-3 rounded">
                                <p className="mb-2"><b>Fecha del incidente:</b> {selectedComplaint.incident_date}</p>
                                <p className="mb-2"><b>Nro Pedido:</b> {selectedComplaint.order_number || 'N/A'}</p>
                                <p className="mb-0"><b>Detalles:</b></p>
                                <p className="text-muted">{selectedComplaint.details}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Libro de Reclamaciones">
            <Complaints {...properties} />
        </BaseAdminto>
    );
});