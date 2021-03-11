import React from 'react'
import logo from './assets/logo.png'
import './css/header.css'
import '../App.css';

function Header() {
    return (
        <header className="navbar">
            <div className="title container">
                <img className="logo" src={logo} alt=""></img>
                <h1>ColorPlus</h1>
            </div>
        </header>
    )
}

export default Header
