import React from 'react'
import Navbaritem from "./navbaritem";

function Navbar(){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="home.html" className="navbar-brand">Desafio</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <Navbaritem href="#/home" label="Home"/>
                        <Navbaritem href="#/clientes" label="Clientes"/>
                        <Navbaritem href="#/login" label="Login" />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
