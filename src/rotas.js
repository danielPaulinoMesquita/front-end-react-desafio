import React from 'react'

import Login from "./views/login";

import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from "./views/home";
import CadastroClientes from "./views/cliente/cadastroCliente";
import DetalheCliente from "./views/cliente/detalheCliente";

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/clientes" component={CadastroClientes}/>
                <Route path="/cliente-detail/:id" component={DetalheCliente}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas
