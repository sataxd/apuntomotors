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
import ColorsRest from "../Actions/Admin/ColorsRest";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import { renderToString } from "react-dom/server";

const colorsRest = new ColorsRest();

const Colors = ({ items }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const itemRef = useRef();
    const summaryRef = useRef();
    const imageRef = useRef();
    // const bannerRef = useRef();
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
        summaryRef.current.value = data?.summary ?? "#fff";
        imageRef.image.src = `/api/items/media/${data?.image ?? "undefined"}`;

        // bannerRef.image.src = `/api/items/media/${data?.banner ?? "undefined"}`;

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            item_id: itemRef.current.value,
            name: nameRef.current.value,
            summary: summaryRef.current.value,
        };
        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const image = imageRef.current.files[0];
        if (image) {
            formData.append("image", image);
        }

        // const banner = bannerRef.current.files[0];
        // if (banner) {
        //     formData.append("banner", banner);
        // }

        const result = await colorsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await colorsRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar color",
            text: "¿Estás seguro de eliminar este color?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await colorsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Colores"
                rest={colorsRest}
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
                            text: "Nuevo color",
                            hint: "Nuevo color",
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
                        dataField: "summary",
                        caption: "Color",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <p className="mb-0" style={{ width: "100%" }}>
                                    <b className="d-block">
                                        <i
                                            className="mdi mdi-circle me-1"
                                            style={{
                                                color: data.summary,
                                                textShadow:
                                                    "0 0 2.5px rgba(0, 0, 0, .5)",
                                            }}
                                        ></i>
                                        {data.name}
                                    </b>
                                </p>
                            );
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "70px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/items/media/${data.image}`}
                                    style={{
                                        width: "60px",

                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            );
                        },
                    },

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
                title={isEditing ? "Editar color" : "Agregar color"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="principal-container">
                    <input ref={idRef} type="hidden" />
                    <InputFormGroup eRef={nameRef} label="Nombre" required />
                    <SelectFormGroup
                        eRef={itemRef}
                        label="Producto"
                        required
                        dropdownParent="#principal-container"
                        onChange={(e) => setSelectedItem(e.target.value)}
                    >
                        {items.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name} ( {item.summary} )
                            </option>
                        ))}
                    </SelectFormGroup>
                    <InputFormGroup
                        eRef={summaryRef}
                        label="Color"
                        type="color"
                    />
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Imagen de variación de producto"
                        aspect={1}
                        col="col-lg-6 col-md-6 col-sm-12"
                    />
                    {/* <ImageFormGroup
                        eRef={bannerRef}
                        label="Imagen solo del producto"
                        aspect={1}
                        col="col-lg-6 col-md-6 col-sm-12"
                    /> */}
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Colores">
            <Colors {...properties} />
        </BaseAdminto>
    );
});
