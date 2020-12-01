import React from 'react'

function Navbaritem(props){
    return (
        <li className="nav-item">
            <a className="nav-link" href={props.href}>{props.label}</a>
        </li>
    )
}

export default Navbaritem;
