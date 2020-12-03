import React from 'react';

import { Tooltip } from 'primereact/tooltip';

import '../../App.css';


export default  props => {

    const  rows = props.clientes.map( cliente =>{
        return (
            <tr key={cliente.id}>
                <td title="Ver Detalhes" className="mouseClick" onClick={() => props.consultaAction(cliente.id)}>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.logradouro}</td>
                <td>{cliente.bairro}</td>
                <td>{cliente.uf}</td>
                <td>
                    <button
                        onClick={ () => props.editAction(cliente.id)}
                        type="button"
                        className="btn btn-primary"
                        title="Editar">
                        <i className="pi pi-pencil"/>
                    </button>
                    <button
                        onClick={ () => props.deleteAction(cliente)}
                        type="button"
                        className="btn btn-danger"
                        title="Excluir">
                        <i className="pi pi-trash"/>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Cpf</th>
                <th scope="col">Cep</th>
                <th scope="col">Cidade</th>
                <th scope="col">Logradouro</th>
                <th scope="col">Bairro</th>
                <th scope="col">Uf</th>
                <th scope="col">Ações</th>
            </tr>
            </thead>

            <tbody>
            {rows}
            </tbody>

        </table>
    )
}
