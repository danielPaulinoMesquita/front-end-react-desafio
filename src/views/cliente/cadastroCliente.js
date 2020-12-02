import React from 'react'

import Card from "../../components/card";
import FormGroup from "../../components/formGroup";
import SelectMenu from '../../components/selectMenu'

import {withRouter} from 'react-router-dom';
import * as messages from '../../components/toastr'

import ClienteService from "../../app/service/clienteService";
import LocalStorageService from "../../app/service/localStorageService";

import TabelaCliente from './tabelaCliente';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class CadastroClientes extends React.Component{

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
        telefone:'',
        telefones: [] ,
        clientes: [],
        clienteDeletar: {},
        mostrarMensagemConfirmacao: false,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new ClienteService();
    }

    componentDidMount() {
        this.service.obterClientes()
            .then(response => {
                const json = response.data;
                let clientesJson = [];
                json.forEach( cliente =>{
                    clientesJson.push(cliente)
                    console.log("cliente: ",clientesJson)
                })

                this.setState({clientes: clientesJson})
            }).catch(error => {
            messages.mensagemErro(`Não foi possível buscar clientes`);
        })

        const params = this.props.match.params;
        if (params.id){
            this.service.obterClientesPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando: true})
                }).catch(error => {
                messages.mensagemErro(error.response.data);
            })
        }

        console.log('params: ', params);
    }


    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        // --> NOVA FORMA, USANDO DESTRUCTING
        const {nome, cpf, email, cep, logradouro, bairro,
            cidade, uf, complemento, tipo, telefone} = this.state;

        const cliente = {nome, cpf, email, cep, logradouro, bairro,
            cidade, uf, complemento, tipo, telefone};

        try {
            this.service.validar(cliente);
        }catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(cliente)
            .then(() => {
                this.props.history.push('/clientes')
                messages.mensagemSucesso('Cliente cadastrado com Sucesso!');
            }).catch(error =>{
            messages.mensagemErro(error.response.data);
        })
    }

    atualizar = () => {
        const {nome, cpf, email, cep, logradouro, bairro,
            cidade, uf, complemento, tipo, telefone} = this.state;

        const cliente = {nome, cpf, email, cep, logradouro, bairro,
            cidade, uf, complemento, tipo, telefone};

        this.service.atualizar(cliente)
            .then(() => {
                this.props.history.push('/consulta-clientes')
                messages.mensagemSucesso('Cliente Atualizado com Sucesso!');
            }).catch(error =>{
            messages.mensagemErro(error.response.data);
        })
    }

    editar = (id) => {
        this.props.history.push(`cadastroCliente/${id}`);
    }

    clienteDetalhe = (id) => {
        this.props.history.push(`cliente-detail/${id}`);
    }

    deletar = () => {
        this.service
            .deletar(this.state.clienteDeletar.id)
            .then(() => {
                const clientes = this.state.clientes;
                const index = clientes.indexOf(this.state.clienteDeletar);
                clientes.splice(index,1);
                this.setState({clientes: clientes, mostrarMensagemConfirmacao: false});

                messages.mensagemSucesso('Cliente deletado com sucesso!')
            })
            .catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Cliente')
            })
    }


    abrirConfirmacao = (cliente) => {
        console.log(cliente);
        this.setState({mostrarMensagemConfirmacao: true, clienteDeletar: cliente})
    }

    cancelarDelecao = () => {
        this.setState({mostrarMensagemConfirmacao: false, clienteDeletar: {}})
    }

    renderFooter() {
        return (
            <div>
                <Button label="Não" onClick={this.cancelarDelecao} icon="pi pi-times" className="p-button-text">
                </Button>
                <Button label="Sim" onClick={this.deletar} icon="pi pi-check" autoFocu>
                </Button>
            </div>
        );
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }

    render() {
        const tipos = this.service.obterListaTipos();
        const ufs = this.service.obterListaUfs();

        return (
            <Card title={this.state.atualizando ? "Atualização do Cliente" : "Cadastro de Cliente"}>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputNome" label="Nome: *">
                            <input id="inputNome" type="text"
                                   className="form-control"
                                   name="nome"
                                   value={this.state.nome}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputCpf" label="Cpf: *">
                            <input id="inputCpf"
                                   type="text"
                                   className="form-control"
                                   name="cpf"
                                   value={this.state.cpf}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputEmail" label="Email: *">
                            <input id="inputEmail"
                                   type="text"
                                   className="form-control"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu
                                id="inputTipo"
                                lista={tipos}
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTelefone" label="Telefone: *">
                            <input id="inputTelefone"
                                   type="text"
                                   className="form-control"
                                   name="telefone"
                                   value={this.state.telefone}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputCep" label="Cep: *">
                            <input id="inputCep"
                                   type="text"
                                   className="form-control"
                                   name="cep"
                                   value={this.state.cep}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputCidade" label="Cidade: *">
                            <SelectMenu
                                id="inputCidade"
                                lista={tipos}
                                className="form-control"
                                name="cidade"
                                value={this.state.cidade}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputBairro" label="Bairro: ">
                            <input id="inputBairro"
                                   type="text"
                                   className="form-control"
                                   name="bairro"
                                   value={this.state.bairro}
                                   disabled/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputLogradouro" label="Logradouro: *">
                            <input id="inputLogradouro" type="text"
                                   className="form-control"
                                   name="logradouro"
                                   value={this.state.logradouro}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputUf" label="Uf: *">
                            <SelectMenu
                                id="inputUf"
                                lista={ufs}
                                className="form-control"
                                name="uf"
                                value={this.state.uf}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.atualizando ?
                            (<button onClick={this.atualizar}
                                     className="btn btn-primary">
                                    <i className="pi pi-refresh"/> Atualizar
                                </button>
                            ) : (<button onClick={this.submit}
                                         className="btn btn-success">
                                    <i className="pi pi-save"/> Salvar
                                </button>
                            )}
                        <button onClick={e => this.props.history.push('/home')}
                                className="btn btn-danger">
                            <i className="pi pi-backward"/> Voltar
                        </button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <TabelaCliente
                                clientes={this.state.clientes}
                                editAction={this.editar}
                                deleteAction={this.abrirConfirmacao}
                                consultaAction={this.clienteDetalhe}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.mostrarMensagemConfirmacao}
                            style={{ width: '350px' }}
                            modal={true}
                            footer={this.renderFooter('displayConfirmation')}
                            onHide={() => this.setState({mostrarMensagemConfirmacao: false})}>
                        <div className="dialog-demo confirmation-content">
                            <span>Deseja excluir este Cliente?</span>
                        </div>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroClientes);
