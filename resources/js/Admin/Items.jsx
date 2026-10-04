import BaseAdminto from "@Adminto/Base";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";
import ItemsRest from "../Actions/Admin/ItemsRest";
import Modal from "../Components/Adminto/Modal";
import ModalImport from "../Components/Adminto/Import/ModalImport";
import Table from "../Components/Adminto/Table";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import QuillFormGroup from "../Components/Adminto/form/QuillFormGroup";
import SelectAPIFormGroup from "../Components/Adminto/form/SelectAPIFormGroup";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import Number2Currency from "../Utils/Number2Currency";
import ReactAppend from "../Utils/ReactAppend";
import SetSelectValue from "../Utils/SetSelectValue";

import ItemVariants from "./ItemVariants";
import ItemVariantsModal from "./ItemVariantsModal";
import ColorsRest from "../Actions/Admin/ColorsRest";
import SizesRest from "../Actions/Admin/SizesRest";
import TextareaCKeditorFormGroup from "../components/Adminto/form/TextareaCKeditorFormGroup";
import ModalImportItem from "./ModalImportItem";

const itemsRest = new ItemsRest();

const Items = ({ categories, subcategories, brands, tags }) => {
    
    // Estados para colores y tallas del producto actual
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [showVariantsModal, setShowVariantsModal] = useState(false);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const gridRef = useRef();
    const modalRef = useRef();
    // Form elements ref
    const idRef = useRef();
    const categoryRef = useRef();
    const subcategoryRef = useRef();
    const nameRef = useRef();
    const tagsRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();
    const stockRef = useRef();
    const min_stockRef = useRef();
    const skuRef = useRef();
    const weightRef = useRef();
    const heightRef = useRef();
    const capacityRef = useRef();
    const diameterRef = useRef();
    const colorRef = useRef();
    const coverRef = useRef();
    

    // const scoreRef = useRef();
    // const manualRef = useRef();
    // const packItemsRef = useRef();
    // const aliasRef = useRef();
    // const summaryRef = useRef();
    // const brandRef = useRef();
    // const bannerRef = useRef();


    const [isEditing, setIsEditing] = useState(false);
    const [descriptionfinal, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedScore, setSelectedScore] = useState(null);

    

    /*ADD NEW LINES GALLERY */
    const [gallery, setGallery] = useState([]);
    const galleryRef = useRef();

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setGallery((prev) => [...prev, ...newImages]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setGallery((prev) => [...prev, ...newImages]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeGalleryImage = (e, index) => {
        e.preventDefault();
        const image = gallery[index];
        if (image.id) {
            // Si la imagen tiene ID, significa que está guardada en la base de datos.
            setGallery((prev) =>
                prev.map((img, i) =>
                    i === index ? { ...img, toDelete: true } : img
                )
            );
        } else {
            // Si es una imagen nueva, simplemente la eliminamos.
            setGallery((prev) => prev.filter((_, i) => i !== index));
        }
    };
    useEffect(() => {
        if (itemData && itemData.images) {
            const existingImages = itemData.images.map((img) => ({
                id: img.id, // ID de la imagen en la BD
                url: `/api/items/media/${img.url}`, // Ruta de la imagen almacenada
            }));
            setGallery(existingImages);
        }
    }, [itemData]);

    // const [manualPreview, setManualPreview] = useState(null);

    const onModalOpen = (data) => {
       
        setItemData(data || null);
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id || "";
        
        if (data?.id) setDescription(data.description || ''); 
        else setDescription('');

        $(categoryRef.current)
            .val(data?.category_id || null)
            .trigger("change");

        skuRef.current.value = data?.sku || "";
        nameRef.current.value = data?.name || "";
        priceRef.current.value = data?.price || 0;
        discountRef.current.value = data?.discount || 0;
        stockRef.current.value = data?.stock;
        min_stockRef.current.value = data?.min_stock;
        colorRef.current.value = data?.color || "";
        weightRef.current.value = data?.weight || 0;
        heightRef.current.value = data?.height || 0;
        capacityRef.current.value = data?.capacity || 0;
        diameterRef.current.value = data?.diameter || 0;
        coverRef.current.value = data?.cover || 0;



        imageRef.current.value = null;
        imageRef.image.src = `/api/items/media/${data?.image ?? "undefined"}`;

        // bannerRef.current.value = null;
        // bannerRef.image.src = `/api/items/media/${data?.banner ?? "undefined"}`;

        // $(scoreRef.current)
        //     .val(data?.score || null)
        //     .trigger("change");

        // $(brandRef.current)
        //     .val(data?.marca_id || null)
        //     .trigger("change");

        // aliasRef.current.value = data?.alias || "";
        // summaryRef.current.value = data?.summary || "";
        
        // manualRef.current.value = null;
        // if (data?.manual) {
        //     setManualPreview(`/storage/images/item/${data.manual}`);
        // } else {
        //     setManualPreview(null);
        // }

        //descriptionRef.current.value = data?.description ?? "";

        if (data?.images) {
            const existingImages = data.images.map((img) => ({
                id: img.id, // ID de la imagen en la base de datos
                url: `/api/items/media/${img.url}`, // Ruta de la imagen almacenada
            }));
            setGallery(existingImages);
        } else {
            setGallery([]); // Limpiar la galería si no hay imágenes
        }

        // Pack items - cargar productos seleccionados si existen
        // SetSelectValue(packItemsRef.current, data?.pack_items ?? [], "id", 'name');

        setTimeout(() => {
             // Forzar el filtrado inicial basado en la categoría seleccionada
            if(data?.category_id) {
                const filtered = subcategories.filter(sub => sub.category_id === data.category_id);
                setFilteredSubcategories(filtered);
                
                // Esperar a que React renderice las opciones filtradas antes de asignar el valor de jQuery
                setTimeout(() => {
                    $(subcategoryRef.current).val(data?.subcategory_id || null).trigger("change");
                }, 100);
            } else {
                setFilteredSubcategories([]);
                $(subcategoryRef.current).val(null).trigger("change");
            }

            // ASIGNAR TAGS GUARDADOS
            // Si data.tags es un array (ej: ["Nuevo", "Popular"]), Select2 los marcará
            if (tagsRef.current) {
                $(tagsRef.current).val(data?.tags || []).trigger("change");
            }

        }, 100);

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        
        let final_price = 0.0; 
        let discount_percent = 0.0;

        if (discountRef.current.value && discountRef.current.value > 0) {
            final_price = discountRef.current.value;
            discount_percent =
                100 -
                (discountRef.current.value * 100) / priceRef.current.value;
        } else {
            final_price = priceRef.current.value;
            discount_percent = 0;
        }

        // Procesar pack_items - obtener objetos con id y name

        // const selectedPackItemIds = $(packItemsRef.current).val() || [];
        // const selectedPackItems = selectedPackItemIds.map(id => {
        //     const option = $(packItemsRef.current).find(`option[value="${id}"]`);
        //     return {
        //         id: parseInt(id),
        //         name: option.text()
        //     };
        // });

        const request = {
            id: idRef.current.value || undefined,
            category_id: categoryRef.current.value,
            subcategory_id: subcategoryRef.current.value,
            name: nameRef.current.value,
            sku: skuRef.current.value,
            description: descriptionfinal,
            final_price: final_price,
            tags: $(tagsRef.current).val() || [],
            final_price: final_price,
            discount_percent: discount_percent,
            price: priceRef.current.value,
            discount: discountRef.current.value,
            stock: stockRef.current.value,
            min_stock: min_stockRef.current.value,
            weight: weightRef.current.value,
            height: heightRef.current.value,
            capacity: capacityRef.current.value,
            diameter: diameterRef.current.value,
            color: colorRef.current.value,
            cover: coverRef.current.value,
            // alias: aliasRef.current.value,
            // summary: summaryRef.current.value,
            // score: scoreRef.current.value,
            // marca_id: brandRef.current.value,
            // pack_items: selectedPackItems.length > 0 ? selectedPackItems : [],
        };

        const formData = new FormData();
        
        for (const key in request) {
            if (key === 'pack_items' || key === 'tags') {
                // Para FormData, convertimos el array a JSON string
                formData.append(key, JSON.stringify(request[key]));
            } else {
                formData.append(key, request[key]);
            }
        }

        const image = imageRef.current.files[0];
        if (image) {
            formData.append("image", image);
        }

        // const banner = bannerRef.current.files[0];
        // if (banner) {
        //     formData.append("banner", banner);
        // }

        // const manual = manualRef.current.files[0];

        // if (manual && manualPreview) {
        //     formData.append("manual", manual);
        // }

        gallery.forEach((img, index) => {
            if (!img.toDelete) {
                if (img.file) {
                    formData.append(`gallery[${index}]`, img.file); // Imágenes nuevas
                } else {
                    formData.append(`gallery_ids[${index}]`, img.id); // IDs de imágenes existentes
                }
            }
        });

        const deletedImages = gallery
            .filter((img) => img.toDelete)
            .map((img) => parseInt(img.id, 10)); // Asegurar que sean enteros
        if (deletedImages.length > 0) {
            formData.append("deleted_images", JSON.stringify(deletedImages)); // Imágenes eliminadas
        }

        const result = await itemsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
        setGallery([]);
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await itemsRest.boolean({ id, field: "visible", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onBooleanChange = async ({ id, field, value }) => {
        const result = await itemsRest.boolean({ id, field, value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar Item",
            text: "¿Estás seguro de eliminar este item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await itemsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const scoreOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];

    const handleManualChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setManualPreview(URL.createObjectURL(file));
        }
    };

    const handleManualDelete = () => {
        setManualPreview(null);
    };
    const handleOpenVariantsModal = () => {
        setShowVariantsModal(true);
    };
    const handleCloseVariantsModal = () => {
        setShowVariantsModal(false);
    };

    // Abre el modal de variantes desde la tabla
    const onVariantsClicked = async (itemId) => {
        // Cargar colores y tallas del producto

        const colorsRest = new ColorsRest();
        const sizesRest = new SizesRest();
        colorsRest.list({ item_id: itemId }).then((res) => {
            setColors(res.data || []);
        });
        sizesRest.list({ item_id: itemId }).then((res) => {
            setSizes(res.data || []);
            console.log(res.data);
        });

        let item = null;
        if (gridRef.current && typeof gridRef.current.current?.instance?.getDataSource === 'function') {
            const items = gridRef.current.current.instance.getDataSource().items;
            if (Array.isArray(items)) {
                item = items.find(i => i.id === itemId);
            }
        } else if (gridRef.current && typeof gridRef.current.instance?.getDataSource === 'function') {
            // fallback por si gridRef es ref directo
            const items = gridRef.current.instance.getDataSource().items;
            if (Array.isArray(items)) {
                item = items.find(i => i.id === itemId);
            }
        }
        if (!item) item = { id: itemId };
        const [colorsRes, sizesRes] = await Promise.all([
            colorsRest.list({ item_id: itemId }),
            sizesRest.list({ item_id: itemId })
        ]);
        setColors(colorsRes.data || []);
        setSizes(sizesRes.data || []);
        setItemData(item);
        setIsEditing(false);
        setShowVariantsModal(true);
    };

    const handleCategoryChange = (e) => {
        const catId = e.target.value;
        setSelectedCategory(catId);
        
        // Filtrar subcategorías relacionadas
        const filtered = subcategories.filter(sub => sub.category_id === catId);
        setFilteredSubcategories(filtered);
        
        // Limpiar el select de subcategoría
        $(subcategoryRef.current).val(null).trigger("change");
    };


    const modalImportRef = useRef();

    const onModalImportOpen = () => {
        $(modalImportRef.current).modal("show");
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Items"
                rest={itemsRest}
              
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "upload",
                            text: "Importar Datos",
                            hint: "Importar Datos",
                            onClick: () => onModalImportOpen(),
                        },
                    });
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
                            text: "Agregar",
                            hint: "Agregar",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                exportable={true}
                exportableName="Items"
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "category.name",
                        caption: "Categoría",
                        width: "180px",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <>
                                        <b className="d-block">
                                            {data.category?.name}
                                        </b>
                                        <small className="text-muted">
                                            {data.subcategory?.name || 'Sin Subcategoría'} 
                                        </small>
                                    </>
                                )
                            );
                        },
                    },
                    
                    {
                        dataField: "name",
                        caption: "Nombre",
                        
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <>
                                        <b>{data.name}</b>
                                        <br />
                                        <span className="truncate">
                                            {data.summary}
                                        </span>
                                    </>
                                )
                            );
                        },
                    },
                    {
                        dataField: "final_price",
                        caption: "Precio",
                        dataType: "number",
                        width: "75px",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <>
                                        {data.discount > 0 && (
                                            <small
                                                className="d-block text-muted"
                                                style={{
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                            >
                                                S/.{Number2Currency(data.price)}
                                            </small>
                                        )}
                                        <span>
                                            S/.
                                            {Number2Currency(
                                                data.discount > 0
                                                    ? data.discount
                                                    : data.price
                                            )}
                                        </span>
                                    </>
                                )
                            );
                        },
                    },
                    // {
                    //     dataField: "brand.name",
                    //     caption: "Marca",
                    //     width: "120px",
                    // },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "90px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/items/media/${data.image}`}
                                    style={{
                                        width: "80px",
                                        height: "48px",
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
                    // {
                    //     dataField: "is_new",
                    //     caption: "Nuevo",
                    //     dataType: "boolean",
                    //     width: "80px",
                    //     cellTemplate: (container, { data }) => {
                    //         ReactAppend(
                    //             container,
                    //             <SwitchFormGroup
                    //                 checked={data.is_new}
                    //                 onChange={(e) =>
                    //                     onBooleanChange({
                    //                         id: data.id,
                    //                         field: "is_new",
                    //                         value: e.target.checked,
                    //                     })
                    //                 }
                    //             />
                    //         );
                    //     },
                    // },
                    {
                        dataField: "offering",
                        caption: "En oferta",
                        dataType: "boolean",
                        width: "80px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.offering}
                                    onChange={(e) =>
                                        onBooleanChange({
                                            id: data.id,
                                            field: "offering",
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    // {
                    //     dataField: "recommended",
                    //     caption: "Recomendado",
                    //     dataType: "boolean",
                    //     width: "80px",
                    //     cellTemplate: (container, { data }) => {
                    //         ReactAppend(
                    //             container,
                    //             <SwitchFormGroup
                    //                 checked={data.recommended}
                    //                 onChange={(e) =>
                    //                     onBooleanChange({
                    //                         id: data.id,
                    //                         field: "recommended",
                    //                         value: e.target.checked,
                    //                     })
                    //                 }
                    //             />
                    //         );
                    //     },
                    // },
                    {
                        dataField: "featured",
                        caption: "Destacado",
                        dataType: "boolean",
                        width: "80px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.featured}
                                    onChange={(e) =>
                                        onBooleanChange({
                                            id: data.id,
                                            field: "featured",
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "80px",
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
                    {
                        caption: "Acciones",
                        width: "150px",
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
                                    className: "btn btn-xs btn-soft-secondary",
                                    title: "Variantes",
                                    icon: "fa fa-layer-group",
                                    onClick: () => onVariantsClicked(data.id),
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
                title={isEditing ? "Editar Item" : "Agregar Item"}
                onSubmit={onModalSubmit}
                size="xl"
            >
                <div className="row" id="principal-container">
                    <input ref={idRef} type="hidden" />
                    
                    <div className="col-md-6">
                        
                         <InputFormGroup
                            eRef={skuRef}
                            label="SKU"
                            required
                        />

                        <InputFormGroup
                            eRef={nameRef}
                            label="Nombre"
                            required
                        />
                        {/* <InputFormGroup
                            eRef={aliasRef}
                            label="Alias del producto"
                        /> */}
                        
                        {/* <InputFormGroup eRef={summaryRef} label="Resumen" /> */}

                        {/* <SelectFormGroup
                            eRef={brandRef}
                            label="Marca"
                            required
                            dropdownParent="#principal-container"
                            onChange={(e) =>
                                setSelectedBrand(e.target.value)
                            }
                        >
                            {brands.map((item, index) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </SelectFormGroup>   */}
                        <div className="row">
                            <SelectFormGroup
                                eRef={categoryRef}
                                label="Categoría"
                                required
                                dropdownParent="#principal-container"
                                col="col-md-6 col-sm-12"
                                onChange={handleCategoryChange} // <-- Actualizado
                            >   
                                <option value="">Seleccione una categoría...</option>
                                {categories.map((item, index) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </SelectFormGroup>

                            <SelectFormGroup
                                eRef={subcategoryRef}
                                label="Subcategoría"
                                col="col-md-6 col-sm-12"
                                dropdownParent="#principal-container"
                            >
                                <option value="">Seleccione una subcategoría...</option>
                                {filteredSubcategories.map((sub, index) => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </SelectFormGroup>
                        </div>    
                       
                        <div className="row">
                            <InputFormGroup
                                eRef={priceRef}
                                label="Precio (Ejm: 35.00)"
                                type="number"
                                step="0.01"
                                col="col-md-6 col-sm-12"
                            />

                            <InputFormGroup
                                eRef={discountRef}
                                label="Descuento (Ejm: 32.00)"
                                type="number"
                                step="0.01"
                                col="col-md-6 col-sm-12"
                            />
                        </div>

                         <div className="row">
                            <InputFormGroup
                                label="Stock"
                                eRef={stockRef}
                                type="number"
                                col="col-md-6 col-sm-12"
                            />  

                            <InputFormGroup
                                label="Stock mínimo"
                                eRef={min_stockRef}
                                type="number"
                                col="col-md-6 col-sm-12"
                            />
                        </div>

                        <div className="row">
                            <InputFormGroup
                                eRef={weightRef}
                                label="Peso"
                                type="number"
                                step="0.01"
                                col="col-md-4 col-sm-12"
                            />

                            <InputFormGroup
                                eRef={heightRef}
                                label="Altura"
                                type="number"
                                step="0.01"
                                col="col-md-4 col-sm-12"
                            />

                            <InputFormGroup
                                eRef={capacityRef}
                                label="Capacidad"
                                type="number"
                                step="0.01"
                                col="col-md-4 col-sm-12"
                            />
                        </div>

                        <div className="row">
                            <InputFormGroup
                                eRef={diameterRef}
                                label="Diámetro"
                                type="number"
                                step="0.01"
                                required
                                col="col-md-4 col-sm-12"
                            />

                            <InputFormGroup
                                eRef={coverRef}
                                label="Entrada de tapa"
                                type="number"
                                step="0.01"
                                col="col-md-4 col-sm-12"
                            />

                            <InputFormGroup
                                eRef={colorRef}
                                label="Color"
                                col="col-md-4 col-sm-12"
                            />
                        </div>
                        
                        <SelectFormGroup
                            eRef={tagsRef}
                            label="Etiquetas"
                            dropdownParent="#principal-container"
                            multiple={true} // <-- Permite seleccionar varios
                        >
                            {tags && tags.map((tag) => (
                                <option key={tag.id} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </SelectFormGroup>

                        {/* <SelectFormGroup
                            eRef={scoreRef}
                            label="Calificación"
                            required
                            dropdownParent="#principal-container"
                            onChange={(e) => setSelectedScore(e.target.value)}
                        >
                            {scoreOptions.map((score, index) => (
                                <option key={index} value={score.value}>
                                    {score.label}
                                </option>
                            ))}
                        </SelectFormGroup> */}

                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            
                            <ImageFormGroup
                                eRef={imageRef}
                                label="Imagen"
                                aspect={1}
                                col="col-lg-6 col-md-6 col-sm-12"
                            />

                            {/* <ImageFormGroup
                                eRef={bannerRef}
                                label="Imagen del producto"
                                aspect={1}
                                col="col-lg-6 col-md-6 col-sm-12"
                            />  */}

                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <label className="form-label">Galeria</label>
                                <input
                                    id="input-item-gallery"
                                    ref={galleryRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    hidden
                                    onChange={handleGalleryChange}
                                />
                                <div
                                    style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        borderRadius: "4px",
                                        boxShadow:
                                            "2.5px 2.5px 5px rgba(0,0,0,.125)",
                                        aspectRatio: "21/9",
                                        height: "160px",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onClick={() => galleryRef.current.click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <span className="form-label d-block mb-1">
                                        Arrastra y suelta imágenes aquí o haz
                                        clic para agregar
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="d-flex flex-wrap gap-1  mt-2">
                                    {gallery.map((image, index) => (
                                        <div
                                            key={index}
                                            className="position-relative"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                            }}
                                        >
                                            <img
                                                src={`${image.url}`}
                                                alt="preview"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                            <button
                                                className="btn btn-xs btn-danger position-absolute"
                                                style={{ top: 0, right: 0 }}
                                                onClick={(e) =>
                                                    removeGalleryImage(e, index)
                                                }
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* <div className="form-group">
                                <label>Manual PDF</label>
                                <div className="input-group mb-2">
                                    <input
                                        type="file"
                                        className="form-control"
                                        ref={manualRef}
                                        accept=".pdf"
                                        onChange={handleManualChange}
                                    />
                                    {manualPreview && (
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleManualDelete}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {manualPreview && (
                                    <div className="mt-2">
                                        <div className="d-flex align-items-center mb-2">
                                            <a
                                                href={manualPreview}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-sm btn-soft-primary mr-2"
                                            >
                                                <i className="fa fa-file-pdf mr-1"></i>
                                                Ver PDF
                                            </a>
                                        </div>
                                        <div className="border rounded">
                                            <iframe
                                                src={`${manualPreview}#toolbar=0`}
                                                type="application/pdf"
                                                width="100%"
                                                height="400px"
                                            >
                                                <p>
                                                    Tu navegador no puede
                                                    mostrar el PDF directamente.
                                                    <a
                                                        href={manualPreview}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Haz clic aquí para
                                                        descargarlo
                                                    </a>
                                                </p>
                                            </iframe>
                                        </div>
                                    </div>
                                )}
                            </div> */}

                        </div>
                    </div>
                </div>
                {/* <hr className="my-2" /> */}
                
                <TextareaCKeditorFormGroup 
                    key={itemData?.id ? `editor-${itemData.id}` : 'editor-new'}
                    label="Descripción"
                    col="col-12"
                    value={descriptionfinal}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* <label className="form-label">Descripción</label> */}
                {/* <textarea
                    ref={descriptionRef}
                    className="form-control"
                    placeholder="Descripción"
                ></textarea> */}
                
                {/* <hr className="my-1" />
                <label className="form-label">Pack de Productos</label>
                <p className="text-muted small">
                    Selecciona los productos que formarán parte de este pack. Si no seleccionas ninguno, se tratará como un producto individual.
                </p> */}
                
                {/* <SelectAPIFormGroup
                    eRef={packItemsRef}
                    label="Productos del Pack"
                    searchAPI="/api/admin/items/paginate"
                    searchBy="name"
                    multiple={true}
                    dropdownParent="#principal-container"
                    templateResult={(item) => {
                        if (!item.id) return item.text;
                        return $(`
                            <div class="d-flex align-items-center">
                                <img src="/api/items/media/${item.data?.image || 'undefined'}" 
                                     style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px; margin-right: 8px;" 
                                     onerror="this.src='/api/items/media/undefined'" />
                                <div>
                                    <div style="font-weight: 500;">${item.text}</div>
                                    <small class="text-muted">SKU: ${item.data?.sku || 'N/A'} | Stock: ${item.data?.stock || 0}</small>
                                </div>
                            </div>
                        `);
                    }}
                    templateSelection={(item) => {
                        if (!item.id) return item.text;
                        return item.text;
                    }}
                /> */}
                
                {/* Modal de variantes solo visible si showVariantsModal está activo */}
                {showVariantsModal && (
                    <ItemVariantsModal
                        show={showVariantsModal}
                        onClose={handleCloseVariantsModal}
                        itemId={itemData?.id}
                        colors={colors}
                        sizes={sizes}
                    />
                )}
            </Modal>

            <ModalImport modalRef={modalImportRef} title={"Importar Datos"} size="lg">
                <ModalImportItem
                    gridRef={gridRef}
                    modalRef={modalImportRef}
                    // excelTemplate={
                    //     Array.isArray(generals)
                    //         ? generals.find(
                    //               (g) =>
                    //                   g.correlative === "excel_import_template",
                    //           )?.description
                    //         : null
                    // }
                />
            </ModalImport>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Items">
            <Items {...properties} />
        </BaseAdminto>
    );
});
