import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import Swal from 'sweetalert2';
import InputFormGroup from '../Components/form/InputFormGroup';
import subcategoriesRest from '../Actions/Admin/SubcategoriesRest';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import { renderToString } from 'react-dom/server';

const subCategoriesRest = new subcategoriesRest()

const Subcategories = ({categories}) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const categoryRef = useRef();

  const [isEditing, setIsEditing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)
   
    
    idRef.current.value = data?.id ?? '';

    $(categoryRef.current)
            .val(data?.category_id || null)
            .trigger("change");

    nameRef.current.value = data?.name ?? '';
    descriptionRef.current.value = data?.description ?? '';

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      category_id: categoryRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    }

    // const formData = new FormData();
    // for (const key in request) {
    //     formData.append(key, request[key]);
    // }

    const result = await subCategoriesRest.save(request)
  
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await subCategoriesRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar registro',
      text: '¿Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await subCategoriesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Subcategorías' rest={subCategoriesRest}
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
            text: 'Nueva subcategoría',
            hint: 'Nuevo subcategoría',
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
            dataField: "category.name",
            caption: "Categoría",
            width: "180px",
            cellTemplate: (container, { data }) => {
                container.html(
                    renderToString(
                      <b className="d-block">
                          {data.category?.name || 'Sin categorías'}
                      </b>
                    )
                );
            },
        },
        {
          dataField: 'name',
          caption: 'Nombre de Subcategoría',
        },
        {
          dataField: 'description',
          caption: 'Descripción',
        },
        {
          dataField: 'visible',
          caption: 'Visible',
          dataType: 'boolean',
          width: '100px',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            ReactAppend(container, <SwitchFormGroup checked={data.visible == 1} onChange={() => onVisibleChange({
              id: data.id,
              value: !data.visible
            })} />)
          }
        },
        {
          caption: 'Acciones',
          width: '120px',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
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
    <Modal 
          modalRef={modalRef} 
          title={isEditing ? 'Editar subcategoría' : 'Agregar subcategoría'} 
          onSubmit={onModalSubmit} 
          size='md'>
      <div className='row' id='principal-container'>
        
        <input ref={idRef} type='hidden' />
        
        <InputFormGroup 
            eRef={nameRef} 
            label='Nombre de Subcategoría' 
            col='col-12' required 
        />

        <SelectFormGroup
              eRef={categoryRef}
              label="Categoría"
              required
              dropdownParent="#principal-container"
              onChange={(e) =>
                  setSelectedCategory(e.target.value)
              }
          >
              {categories.map((item, index) => (
                  <option key={index} value={item.id}>
                      {item.name}
                  </option>
              ))}
          </SelectFormGroup>

        <TextareaFormGroup 
            eRef={descriptionRef} 
            label='Descripción' 
            rows={3} 
        />

      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Subcategorías'>
    <Subcategories {...properties} />
  </BaseAdminto>);
})