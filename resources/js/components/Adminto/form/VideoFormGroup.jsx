import React, { useEffect, useRef, useState } from "react";

const VideoFormGroup = ({
    id,
    col = "col-12",
    label,
    eRef,
    required = false,
    onChange = () => {},
    onError = "/api/cover/thumbnail/null",
}) => {
    const [videoSrc, setVideoSrc] = useState("");
    const fileInputRef = useRef();
    const videoRef = useRef();

    // Configura la referencia externa
    useEffect(() => {
        if (eRef) {
            eRef.current = {
                getFile: () => fileInputRef.current.files[0],
                setVideoSrc: (src) => {
                    setVideoSrc(src);
                    videoRef.current.src = src;
                },
            };
        }
    }, [eRef]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoSrc(url);
            onChange(e);
        }
    };

    return (
        <div className={`form-group ${col} mb-1`}>
            <label htmlFor={id} className="mb-1">
                {label} {required && <b className="text-danger">*</b>}
            </label>

            <video
                ref={videoRef}
                controls
                src={videoSrc}
                style={{
                    width: "100%",
                    borderRadius: "4px",
                    background: "#000",
                    display: videoSrc ? "block" : "none",
                }}
                onError={(e) => {
                    e.target.src = onError;
                }}
            />

            <input
                id={id}
                type="file"
                ref={fileInputRef}
                accept="video/*"
                onChange={handleFileChange}
                className="form-control mt-2"
            />
        </div>
    );
};

export default VideoFormGroup;
