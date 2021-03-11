import React, { Fragment } from 'react'
import logo from './assets/logo.png'
import './css/header.css'
import '../App.css';

function Header() {
    return (
        <Fragment>
            <header className="navbar">
                <div className="title container">
                    <img className="logo" src={logo} alt=""></img>
                    <h1>ColorPlus</h1>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
