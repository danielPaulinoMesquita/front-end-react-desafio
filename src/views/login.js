import React from 'react';

import Card from '../components/card';
import FormGroup from "../components/formGroup";
import { withRouter } from 'react-router-dom';
import {mensagemErro} from "../components/toastr";
import UsuarioService from "../app/service/usuarioService";


class Login extends React.Component {

    state = {
        usuario:'',
        senha:''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () =>{
        this.service.autenticar({
            usuario: this.state.usuario,
            senha: this.state.senha
        }).then( response => {
           // this.context.iniciarSessao(response.data);
            this.props.history.push("/home")
        }).catch(erro => {
            mensagemErro(erro.response.data);
        })
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Usuário: *" htmlFor="exampleInputUsuario">
                                                <input type="text"
                                                       value={this.state.usuario}
                                                       onChange={e => this.setState({usuario:e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputUsuario"
                                                       aria-describedby="emailHelp"
                                                       placeholder="Digite o Usuário"/>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                       value={this.state.senha}
                                                       onChange={e=> this.setState({senha:e.target.value})}
                                                       className="form-control"
                                                       id="exampleInputPassword"
                                                       placeholder="Password"/>
                                            </FormGroup>
                                            <button onClick={this.entrar}
                                                    className="btn btn-success">
                                                <i className="pi pi-sign-in"/>  Entrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);
