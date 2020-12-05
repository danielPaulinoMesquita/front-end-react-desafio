import React from 'react'

import Card from "../../components/card";

import {withRouter} from 'react-router-dom';
import * as messages from '../../components/toastr'

import ClienteService from "../../app/service/clienteService";


class DetalheCliente extends React.Component{

   state = {
        id: null,
        nome: '',
        cpf: '',
        email: '',
        emails: [],
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
        tipo: '',
        telefones: [] ,
    }

    constructor() {
        super();
        this.service = new ClienteService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        if (params.id){
            this.service.obterClientesPorId(params.id)
                .then(response => {
                    this.setState({...response.data})
                }).catch(error => {
                messages.mensagemErro(error.response);
            })
         }

        console.log('params: ', params);
    }

    listaTelefones(props) {
        const content = props.telefones.map((telefone) =>
            <button key={telefone.id} className="list-group-item list-group-item-action">{telefone.tipoTelefone +": "+ telefone.numero}</button>
        )
        return (
            <>
                <hr/>
                <p>Telefones: </p>
                {content}
            </>
        );
    }

    render() {
        const telefones = this.state.telefones;

        return (
            <Card title={"Detalhes do Cliente"}>
                <div className="jumbotron">
                    <h1 className="display-3">{this.state.nome}</h1>
                    <p className="lead">Dados do cadastro do cliente {this.state.nome}</p>
                    <hr className="my-4"/>
                    <div className="row">
                        <div className="col-md-6">
                            <p>Informações: </p>
                            <div className="list-group">
                                <button className="list-group-item list-group-item-action ">CPF: {this.state.cpf}</button>
                                <button className="list-group-item list-group-item-action">Email: {this.state.emails}</button>
                                <button className="list-group-item list-group-item-action">Cep: {this.state.cep}</button>
                                    <this.listaTelefones telefones={telefones}></this.listaTelefones>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p>Endereço: </p>
                            <div className="list-group">
                                <button className="list-group-item list-group-item-action">Bairro: {this.state.bairro}</button>
                                <button className="list-group-item list-group-item-action">Cidade: {this.state.cidade}</button>
                                <button className="list-group-item list-group-item-action">Logradouro: {this.state.logradouro}</button>
                                <button className="list-group-item list-group-item-action">Uf: {this.state.uf}</button>
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <a className="btn btn-info btn-lg"
                       href="#/clientes"
                       role="button"><i className="pi pi-angle-left p-mr-3"></i>
                        Voltar
                    </a>
                </div>
            </Card>
        )
    }
}

export default withRouter(DetalheCliente);
