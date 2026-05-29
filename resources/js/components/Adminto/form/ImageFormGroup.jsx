import React, { useEffect, useRef, useState } from "react"

const ImageFormGroup = ({ 
  id, col, label, eRef, required = false, onChange = () => { }, 
  aspect = '3/2', fit = 'contain', onError = '/api/cover/thumbnail/null', 
  disabled = false, hidden = false 
}) => {

  if (!id) id = `ck-${crypto.randomUUID()}`
  if (!eRef) eRef = useRef()

  const mediaRef = useRef()
  const [isVideo, setIsVideo] = useState(false)
  const [src, setSrc] = useState('') // Nuevo estado para controlar la fuente del recurso

  const onMediaChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const isVideoFile = file.type.startsWith('video/')
    setIsVideo(isVideoFile)

    // Generar la URL temporal
    let objectUrl = ""
    if (window.File && File.toURL) {
      objectUrl = await File.toURL(file)
    } else {
      objectUrl = URL.createObjectURL(file)
    }
    
    setSrc(objectUrl)
    onChange(e)
  }

  useEffect(() => {
    eRef.image = mediaRef.current

    // Exponer métodos limpios hacia el componente padre 'About'
    eRef.setMedia = (url, isVideoType) => {
      setIsVideo(isVideoType)
      setSrc(url || onError)
    }
    
    eRef.clear = () => {
      setIsVideo(false)
      setSrc(onError)
    }
  }, [onError])

  // Actualizar la referencia interna del DOM cada vez que el elemento cambie entre img y video
  useEffect(() => {
    eRef.image = mediaRef.current
  }, [isVideo, src])

  const mediaStyles = {
    width: '100%',
    borderRadius: '4px',
    cursor: 'pointer',
    aspectRatio: aspect,
    objectFit: fit,
    objectPosition: 'center',
    backgroundColor: '#f8f9fa'
  }

  return <div hidden={hidden} className={`form-group ${col} mb-1`}>
    <label htmlFor={id} className="mb-1">
      {label} {required && <b className="text-danger">*</b>}
    </label>
    <label htmlFor={id} style={{ width: '100%' }}>
      {isVideo ? (
        <video 
          ref={mediaRef}
          src={src}
          style={mediaStyles}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={(e) => {
            e.target.currentTime = 0.1; // 0.1s suele ser mejor que 0 por si el primer frame es negro
          }}
          onError={e => e.target.poster = onError}
        />
      ) : (
        <img 
          ref={mediaRef} 
          src={src}
          className="d-block" 
          alt="preview" 
          onError={e => e.target.src = onError} 
          style={mediaStyles} 
        />
      )}
    </label>
    <input 
      disabled={disabled} 
      ref={eRef} 
      id={id} 
      type="file" 
      hidden 
      accept="image/*,video/*" 
      onChange={onMediaChange} 
    />
  </div>
}

export default ImageFormGroup