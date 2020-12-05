import React from 'react'

import Login from "./views/login";

import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import Home from "./views/home";
import CadastroClientes from "./views/cliente/cadastroCliente";
import DetalheCliente from "./views/cliente/detalheCliente";
import {AuthConsumer} from "./provedorAutenticacao";

function RotaAutenticada ({component: Component, isUsuarioAutenticado, ...props}){
    return (
        <Route {...props} render={(componentProps) =>{
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps}/>
                )
            }else {
                return (
                    <Redirect to={{pathname:'/login', state: {from: componentProps.location}}}/>
                )
            }
        }}/>
    );
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/clientes" component={CadastroClientes}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cliente-detail/:id" component={DetalheCliente}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
)
