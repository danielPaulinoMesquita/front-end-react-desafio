import './App.css';
import React from 'react';
import 'bootswatch/dist/darkly/bootstrap.css'
import Rotas from "./rotas";

import 'toastr/build/toastr.min'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from "./components/navbar";


class App extends React.Component {
    render(){
        return (
            <>
                <Navbar></Navbar>
                <div className="container">
                    <Rotas></Rotas>
                </div>
            </>
        );
    }
}

export default App;
