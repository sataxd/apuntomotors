import React, { useEffect, useRef } from "react"
import { CKEditor } from 'ckeditor4-react';

const TextareaCKeditorFormGroup = ({ 
    col, label, onChange, value, required = false, 
    editorUrl = "/ckeditor/ckeditor.js", config = {} 
}) => {
  const editorRef = useRef(null);

  // Este efecto asegura que cuando 'value' cambie (al editar), 
  // el editor actualice su contenido manualmente si ya está listo.
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const editorInstance = editorRef.current.editor;
      if (editorInstance && editorInstance.getData() !== value) {
        editorInstance.setData(value);
      }
    }
  }, [value]);

  return (
    <div className={`form-group ${col} mb-2`}>
      <label className="form-label mb-1">
        {label} {required && <b className="text-danger">*</b>}
      </label>

      <CKEditor
        editorUrl={editorUrl}
        initData={value} // Carga inicial
        onInstanceReady={(event) => {
          editorRef.current = event; // Guardamos la instancia
        }}
        config={{
          versionCheck: false,
          language: 'es',
          toolbar: [
            { name: 'document', items: ['Source'] },
            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo'] },
            { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Blockquote'] },
            { name: 'insert', items: ['Table', 'HorizontalRule'] },
            { name: 'links', items: ['Link', 'Unlink'] },
            { name: 'tools', items: ['Maximize'] }
          ],
          extraPlugins: 'colorbutton,font', 
          height: 250,
          ...config
        }}
        onChange={(event) => {
            const data = event.editor.getData();
            if (onChange) {
                onChange({ target: { value: data } });
            }
        }}
      />
    </div>
  );
}

export default TextareaCKeditorFormGroup;