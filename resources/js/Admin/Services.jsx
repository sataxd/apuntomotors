import BaseAdminto from '@Adminto/Base';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ServicesRest from '../Actions/Admin/ServicesRest';
import Modal from '../Components/Modal';
import Table from '../Components/Table';
import DxButton from '../Components/dx/DxButton';
import InputFormGroup from '../Components/form/InputFormGroup';
import CreateReactScript from '../Utils/CreateReactScript';
import ReactAppend from '../Utils/ReactAppend';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';
import TextareaCKeditorFormGroup from '../components/Adminto/form/TextareaCKeditorFormGroup';

const servicesRest = new ServicesRest()

const Services = () => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const imageRef = useRef();

  const [isEditing, setIsEditing] = useState(false)
  const [descriptionfinal, setDescription] = useState('')

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    
    if (data?.id) {
        setIsEditing(true);
        setDescription(data.description || ''); // Carga datos al editar
    } else {
        setIsEditing(false);
        setDescription(''); // Limpia el editor al crear uno nuevo
    }

    if (imageRef.current) {
        imageRef.current.value = ""; 
        if (data?.image) {
            if(imageRef.image) imageRef.image.src = `/api/services/media/${data?.image}`;
        } else {
            if(imageRef.image) imageRef.image.src = "/api/cover/thumbnail/null"; 
        }
    }

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      description: descriptionfinal,
    }

    const formData = new FormData();
    
    for (const key in request) {
        formData.append(key, request[key]);
    }
    
    const file = imageRef.current.files[0];
    if (file) {
        formData.append("image", file);
    }

    const result = await servicesRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await servicesRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await servicesRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onFeaturedChange = async ({ id, value }) => {
    const result = await servicesRest.boolean({ id, field: 'featured', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Servicios' rest={servicesRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            text: 'Nuevo servicio',
            hint: 'Nuevo servicio',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'name',
          caption: 'Titulo',
        },
        {
          dataField: "image",
          caption: "Imagen",
          width: "100px",
          allowFiltering: false,
          cellTemplate: (container, { data }) => {
              ReactAppend(
                  container,
                  <img
                      src={`/api/services/media/${data.image}`}
                      style={{
                          width: "100px",
                          aspectRatio: 1,
                          objectFit: "contain",
                          objectPosition: "center",
                          borderRadius: "4px",
                      }}
                  />
              );
          },
        },
        {
            dataField: "featured",
            caption: "Destacado",
            dataType: "boolean",
            width: "80px",
            cellTemplate: (container, { data }) => {
                ReactAppend(
                    container,
                    <SwitchFormGroup
                        checked={data.featured == 1}
                        onChange={(e) =>
                            onFeaturedChange({
                                id: data.id,
                                value: e.target.checked,
                            })
                        }
                    />
                );
            },
        },
        {
          dataField: 'visible',
          caption: 'Visible',
          dataType: 'boolean',
          width: "100px",
          cellTemplate: (container, { data }) => {
            $(container).empty()
            ReactAppend(container, <SwitchFormGroup checked={data.visible == 1} onChange={() => onVisibleChange({
              id: data.id,
              value: !data.visible
            })} />)
          }
        },
        // {
        //   dataField: 'status',
        //   caption: 'Estado',
        //   dataType: 'boolean',
        //   cellTemplate: (container, { data }) => {
        //     switch (data.status) {
        //       case 1:
        //         ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
        //         break
        //       case 0:
        //         ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
        //         break
        //       default:
        //         ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
        //         break
        //     }
        //   }
        // },
        {
          caption: 'Acciones',
          width: "100px",
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
      
    <Modal modalRef={modalRef} 
            title={isEditing ? 'Editar servicio' : 'Agregar servicio'} 
            onSubmit={onModalSubmit} size='lg'>
        <div className='row' id='benefits-container'>
          <input ref={idRef} type='hidden' />
          
          <InputFormGroup 
            eRef={nameRef} 
            label='Titulo' 
            col='col-lg-6' 
            rows={2} required />

          <TextareaCKeditorFormGroup 
            label="Descripción"
            col="col-12"
            value={descriptionfinal}
            onChange={(e) => setDescription(e.target.value)}
            />

          <ImageFormGroup
                eRef={imageRef}
                label="Imagen"
                col="col-6"
                aspect={3/2}
                fit="contain"
          />

        </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Servicios'>
    <Services {...properties} />
  </BaseAdminto>);
})