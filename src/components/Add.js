import React from 'react'
import './css/add.css'
import add from './assets/add.png'
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_COLOR = gql`
    mutation Color_Mutation($hex: String!, $type: String!) {
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

    function generateRandomColor(){
        var randomHex = "#"+Math.floor(Math.random()*16777215).toString(16).toString();
        var typeArray = ["Background","Neutral","Primary","Secondary"]
        var type = typeArray[[Math.floor(Math.random() * typeArray.length)]];

    }

    // function handleAdd(event){
    //     event.preventDefault();

    // }

    return (
        <div className="new-color">
            <h2>Add New</h2>
            <div className="add" >
                <img src={add}></img>
            </div>
            <p>*Adds a random color to the pallete</p>
        </div>
    )
}

export default Add
