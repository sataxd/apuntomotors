import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import InputFormGroup from '../Components/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';
import Swal from 'sweetalert2';
import PostsRest from '../Actions/Admin/PostsRest';
import QuillFormGroup from '../Components/Adminto/form/QuillFormGroup';
import SelectAPIFormGroup from '../Components/Adminto/form/SelectAPIFormGroup';
import html2string from '../Utils/html2string';
import SetSelectValue from '../Utils/SetSelectValue';

const postsRest = new PostsRest();

const Posts = () => {
  const gridRef = useRef();
  const modalRef = useRef();

  // Form elements ref
  const idRef = useRef();
  const nameRef = useRef();
  const slugRef = useRef();
  const metaTitleRef = useRef();
  const metaDescriptionRef = useRef();
  const metaKeywordsRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const tagsRef = useRef();
  const imageRef = useRef();
  const postDateRef = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descCount, setDescCount] = useState(0);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewSlug, setPreviewSlug] = useState('');
  const [previewDesc, setPreviewDesc] = useState('');

  const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const onModalOpen = (data) => {
    if (data?.id) {
      setIsEditing(true);
      setSlugManual(true);
    } else {
      setIsEditing(false);
      setSlugManual(false);
    }

    idRef.current.value = data?.id ?? '';
    nameRef.current.value = data?.name ?? '';
    slugRef.current.value = data?.slug ?? '';
    metaTitleRef.current.value = data?.meta_title ?? '';
    metaDescriptionRef.current.value = data?.meta_description ?? '';
    metaKeywordsRef.current.value = data?.meta_keywords ?? '';

    setTitleCount(data?.meta_title ? data.meta_title.length : 0);
    setDescCount(data?.meta_description ? data.meta_description.length : 0);
    setPreviewTitle(data?.meta_title || data?.name || '');
    setPreviewSlug(data?.slug || (data?.name ? slugify(data.name) : ''));
    setPreviewDesc(data?.meta_description || data?.summary || '');

    SetSelectValue(categoryRef.current, data?.category?.id, data?.category?.name);
    descriptionRef.editor.root.innerHTML = data?.description ?? '';
    imageRef.image.src = `/api/posts/media/${data?.image}`;
    imageRef.current.value = null;
    SetSelectValue(tagsRef.current, data?.tags ?? [], 'id', 'name');
    postDateRef.current.value = data?.post_date ?? moment().format('YYYY-MM-DD');

    $(modalRef.current).modal('show');
  };

  const onModalSubmit = async (e) => {
    e.preventDefault();

    const formattedSlug = slugify(slugRef.current.value || nameRef.current.value);

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      slug: formattedSlug,
      meta_title: metaTitleRef.current.value.trim() || undefined,
      meta_description: metaDescriptionRef.current.value.trim() || undefined,
      meta_keywords: metaKeywordsRef.current.value.trim() || undefined,
      category_id: categoryRef.current.value,
      summary: html2string(descriptionRef.current.value),
      description: descriptionRef.current.value,
      tags: $(tagsRef.current).val(),
      post_date: postDateRef.current.value,
    };

    const formData = new FormData();
    for (const key in request) {
      if (request[key] !== undefined) {
        formData.append(key, request[key]);
      }
    }
    const file = imageRef.current.files[0];
    if (file) {
      formData.append('image', file);
    }

    const result = await postsRest.save(formData);
    if (!result) return;

    $(gridRef.current).dxDataGrid('instance').refresh();
    $(modalRef.current).modal('hide');
  };

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar registro',
      text: '¿Estás seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!isConfirmed) return;
    const result = await postsRest.delete(id);
    if (!result) return;
    $(gridRef.current).dxDataGrid('instance').refresh();
  };

  return (
    <>
      <Table
        gridRef={gridRef}
        title="Publicaciones del Blog"
        rest={postsRest}
        toolBar={(container) => {
          container.unshift({
            widget: 'dxButton',
            location: 'after',
            options: {
              icon: 'refresh',
              hint: 'Refrescar tabla',
              onClick: () => $(gridRef.current).dxDataGrid('instance').refresh(),
            },
          });
          container.unshift({
            widget: 'dxButton',
            location: 'after',
            options: {
              icon: 'plus',
              text: 'Nuevo post',
              hint: 'Nuevo registro',
              onClick: () => onModalOpen(),
            },
          });
        }}
        columns={[
          {
            dataField: 'id',
            caption: 'ID',
            visible: false,
          },
          {
            dataField: 'category.name',
            caption: 'Categoría',
            width: '140px',
          },
          {
            dataField: 'name',
            caption: 'Título y URL Amigable',
            cellTemplate: (container, { data }) => {
              const friendlyUrl = `/blog/${data.slug || data.id}`;
              ReactAppend(
                container,
                <>
                  <div className="fw-bold text-dark fs-6">{data.name}</div>
                  <div className="mt-1">
                    <a
                      href={friendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge bg-light text-primary border font-monospace text-decoration-none"
                      title="Ver publicación en la web"
                    >
                      <i className="fa fa-link me-1"></i>
                      {friendlyUrl}
                      <i className="fa fa-external-link-alt ms-1 small"></i>
                    </a>
                  </div>
                  {data.meta_title && (
                    <div className="small text-muted mt-1 text-truncate" style={{ maxWidth: '300px' }} title={`Meta Title: ${data.meta_title}`}>
                      <i className="fa fa-search text-info me-1"></i>
                      <span className="text-secondary">{data.meta_title}</span>
                    </div>
                  )}
                  <div className="mt-1">
                    {data.tags?.map((tag, index) => (
                      <span key={index} className="badge badge-soft-success me-1">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </>
              );
            },
          },
          {
            dataField: 'post_date',
            caption: 'Fecha',
            width: '110px',
            dataType: 'date',
            format: 'dd/MM/yyyy',
          },
          {
            dataField: 'image',
            caption: 'Portada',
            width: '100px',
            cellTemplate: (container, { data }) => {
              ReactAppend(
                container,
                <img
                  src={`/api/posts/media/${data.image}`}
                  alt=""
                  style={{
                    width: '80px',
                    height: '50px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '4px',
                  }}
                  onError={(e) => (e.target.src = '/api/cover/thumbnail/null')}
                />
              );
            },
          },
          {
            caption: 'Acciones',
            width: '110px',
            cellTemplate: (container, { data }) => {
              container.append(
                DxButton({
                  className: 'btn btn-xs btn-soft-primary me-1',
                  title: 'Editar',
                  icon: 'fa fa-pen',
                  onClick: () => onModalOpen(data),
                })
              );
              container.append(
                DxButton({
                  className: 'btn btn-xs btn-soft-danger',
                  title: 'Eliminar',
                  icon: 'fa fa-trash',
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
        title={isEditing ? 'Editar publicación del Blog' : 'Crear nueva publicación del Blog'}
        onSubmit={onModalSubmit}
        size="lg"
      >
        <div className="row" id="posts-container">
          <input ref={idRef} type="hidden" />

          <ImageFormGroup eRef={imageRef} label="Imagen de Portada" />

          <SelectAPIFormGroup
            eRef={categoryRef}
            searchAPI="/api/admin/categories/paginate"
            searchBy="name"
            label="Categoría"
            required
            dropdownParent="#posts-container"
          />

          <InputFormGroup
            eRef={nameRef}
            label="Título de la publicación"
            required
            placeholder="Ej: 5 señales de que los frenos necesitan revisión"
            onChange={(e) => {
              const val = e.target.value;
              if (!slugManual || !isEditing) {
                const autoSlug = slugify(val);
                if (slugRef.current) slugRef.current.value = autoSlug;
                setPreviewSlug(autoSlug);
              }
              if (!metaTitleRef.current?.value) {
                setPreviewTitle(val);
              }
            }}
          />

          <div className="col-12 form-group mb-3">
            <label className="form-label fw-bold">
              URL Amigable (Slug) <b className="text-danger">*</b>
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted font-monospace">/blog/</span>
              <input
                ref={slugRef}
                type="text"
                className="form-control font-monospace"
                placeholder="ejemplo-url-amigable-del-articulo"
                required
                onChange={(e) => {
                  setSlugManual(true);
                  const sanitized = slugify(e.target.value);
                  slugRef.current.value = sanitized;
                  setPreviewSlug(sanitized);
                }}
              />
            </div>
            <small className="text-muted d-block mt-1">
              Esta es la dirección web pública de la publicación para SEO. Se autogenera al escribir el título, pero puedes personalizarla directamente aquí.
            </small>
          </div>

          <QuillFormGroup eRef={descriptionRef} label="Contenido del Artículo" />

          <SelectAPIFormGroup
            id="tags"
            eRef={tagsRef}
            searchAPI="/api/admin/tags/paginate"
            searchBy="name"
            label="Etiquetas (Tags)"
            dropdownParent="#posts-container"
            tags
            multiple
          />

          <InputFormGroup eRef={postDateRef} label="Fecha de publicación" type="date" required />

          {/* SECCIÓN AVANZADA DE OPTIMIZACIÓN SEO */}
          <div className="col-12 mt-3">
            <div className="card border shadow-none bg-light">
              <div className="card-body p-3">
                <h5 className="card-title text-primary mb-1 d-flex align-items-center fs-6 fw-bold">
                  <i className="fa fa-search me-2"></i> Optimización SEO On-Page (Metadatos)
                </h5>
                <p className="text-muted small mb-3">
                  Personaliza cómo se mostrará esta publicación en Google y motores de búsqueda para maximizar el tráfico orgánico.
                </p>

                {/* Previsualización en Google (SERP Preview) */}
                <div className="p-3 bg-white rounded border mb-3">
                  <small className="text-muted text-uppercase fw-bold d-block" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    <i className="fab fa-google text-danger me-1"></i> Vista Previa en Resultados de Google (SERP)
                  </small>
                  <div className="text-primary fs-6 fw-semibold mt-1 text-truncate" style={{ cursor: 'pointer' }}>
                    {previewTitle ? `${previewTitle} | Apunto Motors` : (nameRef.current?.value ? `${nameRef.current.value} | Apunto Motors` : 'Título de la publicación | Apunto Motors')}
                  </div>
                  <div className="text-success small font-monospace text-truncate">
                    https://apuntomotors.com/blog/{previewSlug || 'url-amigable-del-articulo'}
                  </div>
                  <div className="text-muted small mt-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {previewDesc || 'Aquí se mostrará la descripción optimizada del artículo en Google, llamando la atención de los clientes para que hagan clic...'}
                  </div>
                </div>

                {/* Meta Title */}
                <div className="form-group mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label fw-semibold mb-0">Meta Title SEO</label>
                    <span className={`small fw-bold ${titleCount > 65 ? 'text-danger' : titleCount >= 40 ? 'text-success' : 'text-muted'}`}>
                      {titleCount}/65 caracteres {titleCount > 65 ? '(Muy largo para Google)' : titleCount >= 40 ? '(Longitud óptima)' : ''}
                    </span>
                  </div>
                  <input
                    ref={metaTitleRef}
                    type="text"
                    className="form-control"
                    placeholder="Ej: 5 Señales de Frenos Desgastados y Cuándo Cambiarlos"
                    onChange={(e) => {
                      const val = e.target.value;
                      setTitleCount(val.length);
                      setPreviewTitle(val || nameRef.current?.value || '');
                    }}
                  />
                  <small className="text-muted">
                    Título directo para Google. Recomendado entre 45 y 65 caracteres. Si lo dejas vacío, se usará el título principal del post.
                  </small>
                </div>

                {/* Meta Description */}
                <div className="form-group mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label fw-semibold mb-0">Meta Description SEO</label>
                    <span className={`small fw-bold ${descCount > 165 ? 'text-danger' : descCount >= 120 ? 'text-success' : 'text-muted'}`}>
                      {descCount}/160 caracteres {descCount > 165 ? '(Se cortará en Google)' : descCount >= 120 ? '(Longitud óptima)' : ''}
                    </span>
                  </div>
                  <textarea
                    ref={metaDescriptionRef}
                    rows="2"
                    className="form-control"
                    placeholder="Ej: Aprende a identificar ruidos extraños, vibraciones al frenar y pérdida de líquido para prevenir accidentes y averías costosas..."
                    onChange={(e) => {
                      const val = e.target.value;
                      setDescCount(val.length);
                      setPreviewDesc(val);
                    }}
                  ></textarea>
                  <small className="text-muted">
                    Texto descriptivo que aparece bajo el enlace en Google. Recomendado entre 130 y 160 caracteres. Si se deja vacío, se extraerá automáticamente del contenido.
                  </small>
                </div>

                {/* Meta Keywords */}
                <div className="form-group mb-0">
                  <label className="form-label fw-semibold mb-1">Meta Keywords SEO</label>
                  <input
                    ref={metaKeywordsRef}
                    type="text"
                    className="form-control"
                    placeholder="Ej: frenos automotrices, cambio de pastillas lima, taller mecanico la molina, mantenimiento de frenos"
                  />
                  <small className="text-muted">
                    Palabras clave separadas por comas relacionadas con el artículo.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <BaseAdminto {...properties} title="Posts">
      <Posts {...properties} />
    </BaseAdminto>
  );
});