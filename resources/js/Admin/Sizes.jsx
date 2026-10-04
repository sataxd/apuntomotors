import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import SizesRest from "../Actions/Admin/SizesRest";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import { renderToString } from "react-dom/server";

const sizesRest = new SizesRest();

const Sizes = ({ items }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const itemRef = useRef();
    const summaryRef = useRef();
    const heightRef = useRef();
    const widthRef = useRef();
    const imageRef = useRef();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        $(itemRef.current)
            .val(data?.item_id || null)
            .trigger("change");
        nameRef.current.value = data?.name ?? "";

        heightRef.current.value = data?.height ?? "";
        widthRef.current.value = data?.width ?? "";
        imageRef.image.src = `/api/items/media/${data?.image ?? "undefined"}`;
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        const request = {
            id: idRef.current.value || undefined,
            item_id: itemRef.current.value,
            name: nameRef.current.value,

            height: heightRef.current.value,
            width: widthRef.current.value,
        };
        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const image = imageRef.current.files[0];
        if (image) {
            formData.append("image", image);
        }

        const result = await sizesRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await sizesRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar medida",
            text: "¿Estás seguro de eliminar esta medida?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await sizesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Medidas"
                rest={sizesRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Nueva medida",
                            hint: "Nueva medida",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "item.name",
                        caption: "Item",

                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <>
                                        <b className="d-block">
                                            {data.item?.name}
                                        </b>
                                    </>
                                )
                            );
                        },
                    },
                    {
                        dataField: "name",
                        caption: "Medida",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <>
                                    <b className="d-block">{data.name}</b>

                                    {/* <span className="d-block ">
                                        {data.name}
                                        {data.height} cm
                                    </span> */}
                                </>
                            );
                        },
                    },
                    // {
                    //     dataField: "image",
                    //     caption: "Imagen",
                    //     width: "60px",
                    //     allowFiltering: false,
                    //     cellTemplate: (container, { data }) => {
                    //         ReactAppend(
                    //             container,
                    //             <img
                    //                 src={`/api/items/media/${data.image}`}
                    //                 style={{
                    //                     width: "50px",

                    //                     objectFit: "cover",
                    //                     objectPosition: "center",
                    //                     borderRadius: "4px",
                    //                 }}
                    //                 onError={(e) =>
                    //                     (e.target.src =
                    //                         "/api/cover/thumbnail/null")
                    //                 }
                    //             />
                    //         );
                    //     },
                    // },

                    /*
                    
                     {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible}
                                    onChange={(e) =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    */

                    {
                        caption: "Acciones",
                        cellTemplate: (container, { data }) => {
                            container.css("text-overflow", "unset");
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-primary",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar medida" : "Agregar medida"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="principal-container">
                    <div className="col-md-12">
                        <input ref={idRef} type="hidden" />
                        <InputFormGroup
                            eRef={nameRef}
                            label="Nombre"
                            required
                        />
                        <SelectFormGroup
                            eRef={itemRef}
                            label="Producto"
                            required
                            dropdownParent="#principal-container"
                            onChange={(e) => setSelectedItem(e.target.value)}
                        >
                            {items.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </SelectFormGroup>

                        <InputFormGroup
                            type="number"
                            eRef={widthRef}
                            label="Cantidad (Ejm: 57 por caja, 1 si es unidad, 10 si es decena, etc)"
                            step="1"
                            hidden="true"
                            className="col-lg-6 col-md-6 col-sm-6"
                        />
                        <InputFormGroup
                            type="number"
                            eRef={heightRef}
                            label="Alto (cm)"
                            step="0.01"
                            hidden="true"
                            className="col-lg-6 col-md-6 col-sm-6"
                        />
                    </div>
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Imagen"
                        aspect={1}
                        hidden="true"
                        col="col-lg-6 col-md-6 col-sm-6"
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Unidades de medida">
            <Sizes {...properties} />
        </BaseAdminto>
    );
});
