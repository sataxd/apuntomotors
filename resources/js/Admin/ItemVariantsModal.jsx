import React, { useState } from "react";
// Usar un modal simple para evitar <form> anidados
import ReactModal from "react-modal";
import ItemVariants from "./ItemVariants";


const ItemVariantsModal = ({ show, onClose, itemId, colors, sizes }) => {
    return (
        <ReactModal
            isOpen={show}
            onRequestClose={onClose}
            contentLabel="Gestionar Variantes"

            ariaHideApp={false}
            style={{
                overlay: { zIndex: 2000, background: "rgba(0,0,0,0.4)" },
                content: { maxWidth: 1200, margin: "auto", borderRadius: 8 }
            }}
            
        >
            <div className="modal-header">
                <h4 className="modal-title">Gestionar Variantes</h4>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                <ItemVariants itemId={itemId} colors={colors} sizes={sizes} />
            </div>
        </ReactModal>
    );
};

export default ItemVariantsModal;
