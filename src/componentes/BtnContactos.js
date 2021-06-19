import React from 'react';


const BtnContactos = () => {
    return (
        <div className="col-lg-3 mt-3 mb-3">
            <div className="agregar-contacto">
                <a href="#" className="btn-agregar" data-toggle="modal" data-target="#abrir-modal">
                    <i className="fas fa-plus-circle pr-2"></i>
                    Agregar Nuevo Contacto
                </a>
            </div>
        </div>
    );
}

export default BtnContactos;