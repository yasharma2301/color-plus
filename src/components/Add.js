import React from 'react'
import './css/add.css'
import add from './assets/add.png'

function Add() {
    return (
        <div className="new-color">
            <h2>Add New</h2>
            <div className="add">
                <img src={add}></img>
            </div>
            <p>*Adds a random color to the pallete</p>
        </div>
    )
}

export default Add
