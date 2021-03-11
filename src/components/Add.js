import React, { useState } from 'react'
import './css/add.css'
import add from './assets/add.png'
import { useMutation } from '@apollo/react-hooks';
import Loader from './Loader'
import {ADD_COLOR} from './QlRequests';

function Add() {
    const [addColor] = useMutation(ADD_COLOR);
    const [loading, setLoading] = useState(false)

    function generateRandomColor() {
        var randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).toString();
        var typeArray = ["Background", "Neutral", "Primary", "Secondary"]
        var type = typeArray[[Math.floor(Math.random() * typeArray.length)]];
        return {
            variables: {
                hex: randomHex,
                type: type
            }
        };
    }

    async function clickHandler(event) {
        event.preventDefault();
        setLoading(true)
        await addColor(generateRandomColor())
        setLoading(false)
    }

    return (
        <div className="new-color">
            <h2>Add New</h2>
            <div className="add" onClick={clickHandler}>
                {
                    loading ? <Loader size={40} color='white'></Loader> : <img src={add} alt="+"></img>
                }
            </div>
            <p>*Adds a random color to the pallete</p>
        </div>
    )
}

export default Add
