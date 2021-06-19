import React, { Fragment, useState, useEffect } from 'react'

import Header from './componentes/Header'
import BuscarContatos from './componentes/BuscarContatos'
import BtnContatos from './componentes/BtnContatos'
import AdicionarContatos from './componentes/AdicionarContatos'
import EditarContato from './componentes/EditarContato'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {

  const [name, saveName] = useState('')
  const [lastName, saveLastName] = useState('')
  const [phone, savePhone] = useState('')

  const [getId, setId] = useState()

  const [getContatos, setContatos] = useState([])

  const [getBusqueda, setBusqueda] = useState([])


  useEffect(() => {
    setContatos(getBusqueda)
  }, [])

  const apagar = (contato) => {
    confirmAlert({
      title: 'Confirmar',
      message: '¿Tem certeza de apagar esse contato?',
      buttons: [
        {
          label: 'SI',
          onClick: () => {
            let cont = 0;
            let arreglo = getContatos
            arreglo.forEach((registro) => {
              if (contato.id === registro.id) {
                arreglo.splice(cont, 1);
              }
              cont++;
            });

            let lista = []
            for (let i = 0; i < arreglo.length; i++) {
              lista = Array.from([...arreglo])
            }
            setContatos([...lista])
          }
        },
        {
          label: 'No',
        }
      ]
    });

  }

  const editar = (id) => {
    setId(id)
    let cont = 0;
    let newArrayContatos = getContatos
    newArrayContatos.forEach((registro) => {
      if (id === registro.id) {
        saveName(newArrayContatos[cont].nome)
        saveLastName(newArrayContatos[cont].sobrenome)
        savePhone(newArrayContatos[cont].telefone)
      }
      cont++;
    });

  }

  const mostrarContatos = () => {
    let listaContatos = []

    if (getBusqueda.length > 0) {
      listaContatos = getContatos.filter(busqueda => {
        if (busqueda.nome.toLowerCase() === getBusqueda.toLowerCase()
          || busqueda.sobrenome.toLowerCase() === getBusqueda.toLowerCase()
          || (busqueda.nome.toLowerCase() + ' ' + busqueda.sobrenome.toLowerCase()) === getBusqueda.toLowerCase()
          || busqueda.telefone === getBusqueda
          || busqueda.telefone.replace('+', '') === getBusqueda
          || busqueda.id == getBusqueda) {
          return busqueda
        }
      });

    } else {
      listaContatos = getContatos
    }

    if (getBusqueda.length > 0 && listaContatos.length === 0) {
      return (
        <tr key={0}>
          <td colspan={6} className="busqueda-invalida">¡No se encontró ningun contato nesta busqueda!</td>
        </tr>
      )
    } else {
      return listaContatos.map(contato => (
        <tr key={contato.id}>
          <th scope="row">{contato.id}</th>
          <td>{contato.nome}</td>
          <td>{contato.sobrenome}</td>
          <td>{contato.telefone}</td>
          <td>
            <a href="" className="btn-editar" id="editar" onClick={(e) => {
              e.preventDefault()
              editar(contato.id)
            }} data-toggle="modal" data-target="#abrir-modal-editar">
              <i className="far fa-edit mr-1"></i>Editar</a>
          </td>
          <td>
            <a href="" className="btn-apagar" id="apagar" onClick={(e) => {
              e.preventDefault()
              apagar(contato)
            }}>
              <i className="fas fa-trash-alt mr-1"></i>apagar</a>
          </td>
        </tr>
      ))
    }
  }

  return (
    <Fragment>
      <Header />
      <section className="container mt-4">
        <div className="row justify-content-between mt-4">
          <BuscarContatos
            setBusqueda={setBusqueda}
          />
          <BtnContatos />
          <div className="col-lg-12 mt-3 mb-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Sobrenome</th>
                  <th scope="col">Teléfone</th>
                  <th scope="col">Editar</th>
                  <th scope="col">apagar</th>
                </tr>
              </thead>
              <tbody>
                {getContatos.length > 0 ? mostrarContatos() :
                  <tr key={0}>
                    <td colspan={6} className="lista-vacia">¡No tem ningun contato adicionado!</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <AdicionarContatos
            name={name}
            saveName={saveName}
            lastName={lastName}
            saveLastName={saveLastName}
            phone={phone}
            savePhone={savePhone}
            getContatos={getContatos}
            setContatos={setContatos}
          />
        </div>
        <EditarContato
          name={name}
          saveName={saveName}
          lastName={lastName}
          saveLastName={saveLastName}
          phone={phone}
          savePhone={savePhone}
          getContatos={getContatos}
          setContatos={setContatos}
          id={getId}
          setId={setId}
        />
      </section>
    </Fragment>
  );
}

export default App;
