import React from 'react'

class Home extends React.Component{
    render() {
        return(
            <div className="jumbotron">
                <h1 className="display-3">Desafio</h1>
                <p className="lead">Sistema front end para acessar API Spring</p>
                <hr className="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out within the larger
                        container.</p>
                    <p className="lead">
                        <a className="btn btn-danger btn-lg"
                           href="#/clientes"
                           role="button"><i className="pi pi-dollar p-mr-2"></i> Acessar Clientes</a>
                    </p>
            </div>
        )
    }
}

export default Home;


