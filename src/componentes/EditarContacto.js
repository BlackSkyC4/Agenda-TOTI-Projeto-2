import React, { useState } from 'react';

const EditarContacto = ({ name, saveName, lastName, saveLastName, phone, savePhone, getContactos, setContactos, id, setId }) => {

    const [error, guardarError] = useState(false);
    const [contactoEditado, setContactoEditado] = useState(false)

    const datosContactoEditar = {
        nombre: name,
        apellido: lastName,
        telefono: phone
    }

    const guardarDatos = (e) => {
        e.preventDefault()
        if (datosContactoEditar.nombre === '' || datosContactoEditar.apellido === '' || datosContactoEditar.telefono === '') {
            guardarError(true)
            return;
        } else {
            guardarError(false)
            let cont = 0;
            let contactoEditar = getContactos
            contactoEditar.forEach((datosContacto) => {
                if (id === datosContacto.id) {
                    contactoEditar[cont].nombre = name
                    contactoEditar[cont].apellido = lastName
                    contactoEditar[cont].telefono = phone
                }
                cont++;
            });

            let listaContactoEditado = []
            for (let i = 0; i < contactoEditar.length; i++) {
                listaContactoEditado = Array.from([...contactoEditar])
            }           
            setContactos([...listaContactoEditado])
            setContactoEditado(true)
            eliminarAlerta()
            
        }
    }

    const limpiar = () => {
        document.getElementById('nombre').value = ''
        document.getElementById('apellido').value = ''
        document.getElementById('telefono').value = ''
        saveName('')
        saveLastName('')
        savePhone('')
        setId(undefined)
    }

    const alertaContactoEditado = () => {
        return (
            <div className="col-lg-12 mt-3 alerta-add">
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">¡Contacto editado correctamente!</h4>
                </div>
            </div>
        )   
    }

    const eliminarAlerta = () =>{
        setTimeout(() => {
            setContactoEditado(false)
        }, 2000);
    }


    return (
        <div className="col-lg-12">
            <div className="modal fade" id="abrir-modal-editar" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Editar Contacto</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={limpiar}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardarDatos}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre-edi"
                                            value={datosContactoEditar.nombre}
                                            placeholder="Nombre"
                                            onChange={e => saveName(e.target.value)}
                                        />

                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="apellido-edi"
                                            value={datosContactoEditar.apellido}
                                            placeholder="Apellido"
                                            onChange={e => saveLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefono-edi"
                                            value={datosContactoEditar.telefono}
                                            placeholder="Telefono"
                                            onChange={e => savePhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3 modal-footer">
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={limpiar}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary editar">Editar Contacto</button>
                                    </div>
                                    {(error) ?
                                        <div className="col-lg-12 mt-3">
                                            <div className="alert alert-danger">
                                                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                <strong>¡Error!</strong> Todos los campos son obligatorios
                                            </div>
                                        </div>
                                        : ''}
                                    {(contactoEditado) ?
                                        alertaContactoEditado()

                                        : ''}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditarContacto;