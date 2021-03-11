import React from 'react'
import './css/add.css'
import add from './assets/add.png'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_COLOR = gql`
    mutation Add_Color_Mutation($hex: String!, $type: String!) {
        insert_colors(objects: {hex: $hex, type: $type}) {
        returning {
            hex
            type
            uid
        }
        }
    }
`

function Add() {

    const [addColor] = useMutation(ADD_COLOR);
    
    function generateRandomColor(){
        var randomHex = "#"+Math.floor(Math.random()*16777215).toString(16).toString();
        var typeArray = ["Background","Neutral","Primary","Secondary"]
        var type = typeArray[[Math.floor(Math.random() * typeArray.length)]];
        return {
            variables:{
                hex: randomHex,
                type: type
            }
        };
    }

    function clickHandler(event){
        event.preventDefault();
        addColor(generateRandomColor())
    }

    return (
        <div className="new-color">
            <h2>Add New</h2>
            <div className="add" onClick={clickHandler}>
                <img src={add}></img>
            </div>
            <p>*Adds a random color to the pallete</p>
        </div>
    )
}

export default Add
