import React, { useEffect, useRef } from "react"

const SelectFormGroup = ({ id, col, className, label, specification, eRef, required = false, children, dropdownParent, noMargin = false, multiple = false, disabled = false, onChange = () => { },
  templateResult,
  templateSelection,
  value,
  name,
  tags
}) => {

  if (!eRef) eRef = useRef()
  if (!id) id = `select-${crypto.randomUUID()}`

  useEffect(() => {
    $(eRef.current).select2({
      dropdownParent,
      templateResult,
      templateSelection,
      minimumInputLength: 0,
      tags
    })
    $(eRef.current).on('change', onChange)

    return () => {
      // Limpiar event listeners cuando se desmonte el componente
      $(eRef.current).off('change')
    }
  }, [dropdownParent])

  // Efecto adicional para actualizar el valor de Select2 cuando cambia externamente
  useEffect(() => {
    if (value !== undefined && eRef.current) {
      $(eRef.current).val(value).trigger('change.select2')
    }
  }, [value])

  return <div className={`form-group ${col} ${!noMargin && 'mb-2'}`}>
    <label htmlFor={id} className="form-label mb-1">
      {
        label &&
        <>
          {label} {required && <b className="text-danger">*</b>}
          {specification && <Tippy content={specification}>
            <small className="ms-1 fa fa-question-circle text-muted"></small>
          </Tippy>
          }
        </>
      }
    </label>
    <select ref={eRef} name={name} id={id} required={required} className={`form-control ${className}`} style={{ width: '100%' }} disabled={disabled} multiple={multiple}>
      {children}
    </select>
  </div>
}

export default SelectFormGroup