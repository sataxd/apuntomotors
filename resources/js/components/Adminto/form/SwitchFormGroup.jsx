import Tippy from "@tippyjs/react"
import React, { useEffect, useRef } from "react"
// Asegúrate de que Switchery y $ (jQuery) estén disponibles globalmente o importados

const SwitchFormGroup = ({ 
    id, 
    col, 
    eRef, 
    label, 
    leftl, 
    rightl, 
    specification, 
    required = false, 
    onChange, 
    disabled = false, 
    checked, // Recibe el valor booleano real (true/false)
    refreshable = null 
}) => {
  
  // 1. CORRECCIÓN: Los hooks siempre arriba y sin condicionales
  // Si el padre no pasa una eRef, usamos una interna.
  const internalRef = useRef(null);
  const resolvedRef = eRef || internalRef;
  
  // Generamos el ID una sola vez usando un ref para persistencia o useState
  const inputId = useRef(id || `ck-${crypto.randomUUID()}`);

  useEffect(() => {
    const inputEl = resolvedRef.current;
    if (!inputEl) return;

    // 2. CORRECCIÓN: Sincronización manual
    // Antes de inicializar, aseguramos que el input nativo tenga el valor correcto
    inputEl.checked = !!checked; 
    inputEl.disabled = disabled;

    // 3. LIMPIEZA PREVIA (Evita duplicados visuales)
    // Switchery crea un elemento span.switchery justo después del input.
    // Si ya existe, lo eliminamos para re-crearlo con el estado nuevo.
    const nextSibling = inputEl.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('switchery')) {
        nextSibling.remove();
        // Switchery oculta el input original, hay que asegurarse que esté "listo" para ser inicializado de nuevo
        inputEl.style.display = ''; 
    }

    // 4. INICIALIZACIÓN
    const switchery = new Switchery(inputEl, {
      size: 'small',
      color: '#64b0f2',
      disabled: disabled
    });

    // 5. EVENTO CHANGE
    // Usamos una función manejadora para poder limpiarla después
    const handleChange = (e) => {
        if (onChange) onChange(e);
    };

    $(inputEl).on('change', handleChange);

    // 6. CLEANUP (Al desmontar o cambiar dependencias)
    return () => {
        $(inputEl).off('change', handleChange);
        // Opcional: Podrías destruir la instancia visual aquí también si fuera necesario
    };

  // 7. DEPENDENCIAS: Esto es clave.
  // Cada vez que cambie 'checked' o 'disabled', el efecto corre de nuevo,
  // limpia el Switchery viejo y crea uno nuevo en la posición correcta.
  }, [checked, disabled, refreshable, resolvedRef]);

  return (
    <div className={`form-group ${col} mb-2`}>
      {leftl && (
        <span style={{ marginRight: "10px" }}>{leftl}</span>
      )}
      
      {label && (
        <label htmlFor={inputId.current} className="form-label mb-1 d-block">
          {label} {required && <b className="text-danger">*</b>}
          {specification && (
            <Tippy content={specification}>
              <small className="ms-1 fa fa-question-circle text-muted"></small>
            </Tippy>
          )}
        </label>
      )}

      
      <input 
        ref={resolvedRef} 
        id={inputId.current} 
        type="checkbox" 
        data-plugin="switchery" 
        required={required} 
      />

      {rightl && (
        <span style={{ marginLeft: "10px" }}>{rightl}</span>
      )}
    </div>
  );
}

export default SwitchFormGroup;