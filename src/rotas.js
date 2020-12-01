import React from 'react'

import Login from "./views/login";

import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from "./views/home";
import CadastroClientes from "./views/cliente/cadastroCliente";

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/clientes" component={CadastroClientes}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas
