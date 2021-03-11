import React, { useState } from 'react'
import './css/main.css'
import '../App.css';
import './css/color.css'
import Add from './Add';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import del from './assets/delete.png';
import HashLoader from "react-spinners/HashLoader";

const COLOR_SUBSCRIPTION = gql`
    subscription Color_Subscription {
        colors {
            hex
            type
            uid
        }
    }
`

const TYPE_UPDATE = gql`
    mutation Type_Update($uid: uuid!, $type: String!) {
        update_colors(where: {uid: {_eq: $uid}}, _set: {type: $type}) {
            returning {
                type
                uid
                hex
            }
        }
    }
`

const DELETE_COLOR = gql`
    mutation MyMutation($uid: uuid!) {
        delete_colors_by_pk(uid: $uid) {
            uid
        }
    }
`

function Main() {

    const { data, error, loading } = useSubscription(COLOR_SUBSCRIPTION);
    const [updateType] = useMutation(TYPE_UPDATE);
    const [deleteColor] = useMutation(DELETE_COLOR);
    const [deleteLoader, setLoading] = useState(() => { return false })

    function hexToRgb(hex) {
        var bigint = parseInt(hex.substring(1), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return "RGB " + r + "/" + g + "/" + b;
    }

    function elementId(n) {
        if (n < 10) {
            return "00" + n.toString();
        } else if (n >= 10 && n < 100) {
            return "0" + n.toString();
        } else {
            return n.toString();
        }
    }

    function handleData(event,uid) {
        if (event.key === "Enter") {
            updateType({ variables: { uid: uid, type: event.target.value } })
            event.target.blur();
        }
    }

    function clickHandler(uid) {
        setLoading(true)
        console.log(deleteLoader)
        deleteColor({ variables: { uid: uid } }).then(res => {
            setLoading(false)
            console.log(deleteLoader)
        })
    }

    if (loading) {
        return <div className="center">
            <HashLoader size={70} color='#74b1a1'></HashLoader>
        </div>
    }
    if (error) {
        return <div className="center">
            <h1>Aww Snap!<br></br> Something went wrong</h1>
            <p>{error}</p>
        </div>
    }

    return (
        <main>
            <div className="cards container">
                <Add></Add>
                {
                    data.colors.map(
                        ({ hex, type, uid }, index) =>
                            <div key={uid} className="card">
                                <div className="card_info">
                                    <p>{elementId(index)}</p>
                                    <div className="label">
                                        <input id={`input-${uid}`} defaultValue={type} placeholder="Enter Label" onKeyPress={(event)=>handleData(event,uid)}></input>
                                    </div>
                                    <img src={del} className="delete-color" onClick={() => clickHandler(uid)}></img>
                                </div>
                                <div>
                                    <div style={{ backgroundColor: hex }} className="showcase-color">
                                    </div>
                                </div>
                                <div className="card_info">
                                    <p>
                                        HEX {hex}
                                    </p>
                                    <p>
                                        {hexToRgb(hex)}
                                    </p>
                                </div>
                            </div>
                    )
                }
            </div>
        </main>
    )
}

export default Main