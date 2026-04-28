import BaseAdminto from '@Adminto/Base';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AboutusRest from '../Actions/Admin/AboutusRest';
import Modal from '../Components/Modal';
import Table from '../Components/Table';
import DxButton from '../Components/dx/DxButton';
import InputFormGroup from '../Components/form/InputFormGroup';
import CreateReactScript from '../Utils/CreateReactScript';
import ReactAppend from '../Utils/ReactAppend';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';
import TextareaCKeditorFormGroup from '../components/Adminto/form/TextareaCKeditorFormGroup';

const aboutusRest = new AboutusRest()

const About = () => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const subtitleRef = useRef()
  const iconRef = useRef();
  const imageRef = useRef();
  const buttonTextRef = useRef();
  const buttonLinkRef = useRef();
  const [isEditing, setIsEditing] = useState(false)
  const [descriptionfinal, setDescription] = useState('')

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    subtitleRef.current.value = data?.subtitle ?? ''
    // descriptionRef.current.value = data?.description ?? ''
    buttonTextRef.current.value = data?.button_text ?? ''
    buttonLinkRef.current.value = data?.button_link ?? ''

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
            if(imageRef.image) imageRef.image.src = `/api/aboutus/media/${data?.image}`;
        } else {
            if(imageRef.image) imageRef.image.src = "/api/cover/thumbnail/null"; 
        }
    }

    if (iconRef.current) {
        iconRef.current.value = ""; 
        if (data?.icon) {
            if(iconRef.image) iconRef.image.src = `/api/aboutus/media/${data?.icon}`;
        } else {
            if(iconRef.image) iconRef.image.src = "/api/cover/thumbnail/null"; 
        }
    }

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      // description: descriptionRef.current.value,
      description: descriptionfinal,
      button_text: buttonTextRef.current.value,
      button_link: buttonLinkRef.current.value,
      subtitle: subtitleRef.current.value,
    }

    const formData = new FormData();
    
    for (const key in request) {
        formData.append(key, request[key]);
    }
    
    const file = imageRef.current.files[0];
    if (file) {
        formData.append("image", file);
    }

    const iconfile = iconRef.current.files[0];
    if (iconfile) {
        formData.append("icon", iconfile);
    }
    
    const result = await aboutusRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await aboutusRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await aboutusRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Nosotros' rest={aboutusRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        // container.unshift({
        //   widget: 'dxButton', location: 'after',
        //   options: {
        //     icon: 'plus',
        //     text: 'Nuevo about',
        //     hint: 'Nuevo about',
        //     onClick: () => onModalOpen()
        //   }
        // });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'correlative',
          caption: 'Correlativo',
        },
        {
          dataField: 'name',
          caption: 'Titulo',
        },
        {
          dataField: 'visible',
          caption: 'Visible',
          dataType: 'boolean',
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
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            // container.append(DxButton({
            //   className: 'btn btn-xs btn-soft-danger',
            //   title: 'Eliminar',
            //   icon: 'fa fa-trash',
            //   onClick: () => onDeleteClicked(data.id)
            // }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
      
    <Modal modalRef={modalRef} 
            title={isEditing ? 'Editar about' : 'Agregar about'} 
            onSubmit={onModalSubmit} size='lg'>
        <div className='row' id='benefits-container'>
          <input ref={idRef} type='hidden' />
          
          <InputFormGroup 
            eRef={subtitleRef} 
            label='Subtitulo' 
            col='col-lg-6' 
            rows={2}/>


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

          <ImageFormGroup
              eRef={iconRef}
              label="Icono"
              col="col-6"
              aspect={3/2}
              fit="contain"
          />

          <InputFormGroup 
            eRef={buttonTextRef} 
            label='Texto de botón' 
            col='col-lg-6' 
            rows={2}/>

          <InputFormGroup 
          eRef={buttonLinkRef} 
          label='Url de botón' 
          col='col-lg-6' 
          rows={2}/>
        </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Nosotros'>
    <About {...properties} />
  </BaseAdminto>);
})