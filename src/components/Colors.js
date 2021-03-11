import React, { useState } from 'react'
import './css/color.css'
import { useMutation } from '@apollo/react-hooks';
import del from './assets/delete.png';
import gql from 'graphql-tag';
import HashLoader from "react-spinners/HashLoader";
import './css/main.css'
import { css } from '@emotion/core'

const loaderCss = css`
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
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

function Colors({ uid, hex, type, index }) {

    const [updateType] = useMutation(TYPE_UPDATE);
    const [deleteColor] = useMutation(DELETE_COLOR);
    const [deleteLoader, setLoading] = useState(false)

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

    function handleData(event, uid) {
        if (event.key === "Enter") {
            updateType({ variables: { uid: uid, type: event.target.value } })
            event.target.blur();
        }
    }

    async function clickHandler(uid) {
        setLoading(true)
        await deleteColor({ variables: { uid: uid } })
        setLoading(false)
    }

    return (
        <div key={uid} className="card">
            <div className="card_info">
                <p>{elementId(index)}</p>
                <div className="label">
                    <input id={`input-${uid}`} defaultValue={type} placeholder="Enter Label" onKeyPress={(event) => handleData(event, uid)}></input>
                </div>
                <div className="delete-color">
                    {
                        deleteLoader ? <HashLoader size={20} color='#74b1a1' css={loaderCss}></HashLoader>
                            : <img src={del} onClick={() => clickHandler(uid)}></img>
                    }
                </div>

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

export default Colors
