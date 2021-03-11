import React, { useState } from 'react'
import './css/color.css'
import { useMutation } from '@apollo/react-hooks';
import del from './assets/delete.png';
import './css/main.css'
import Loader from './Loader'
import { TYPE_UPDATE, DELETE_COLOR } from './QlRequests';

function Colors({ uid, hex, type, index }) {

    // hooks
    const [updateType] = useMutation(TYPE_UPDATE);
    const [deleteColor] = useMutation(DELETE_COLOR);
    const [deleteLoader, setLoading] = useState(false)
    const [hovering, setHover] = useState(false)

    // Utility function to generate RGB codes from a given hex code
    function hexToRgb(hex) {
        var bigint = parseInt(hex.substring(1), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return "RGB " + r + "/" + g + "/" + b;
    }

    // Function to generate serial number from index number
    function elementId(n) {
        if (n < 10) {
            return "00" + n.toString();
        } else if (n >= 10 && n < 100) {
            return "0" + n.toString();
        } else {
            return n.toString();
        }
    }

    // Function to update the type of color on press of enter-key
    function handleData(event, uid) {
        if (event.key === "Enter") {
            try {
                updateType({ variables: { uid: uid, type: event.target.value } })
                    .then((res) => {
                        const data = res.data.update_colors.returning;
                        updateLocalStorage(data[0].uid, data[0].type, data[0].hex);
                    })
            } catch (err) {
                console.log(err)
            }
            event.target.blur();
        }
    }

    // update local storage with new data
    function updateLocalStorage(uid, type, hex) {
        var obj = { hex: hex, type: type }
        localStorage.setItem(uid, JSON.stringify(obj))
    }

    // Function to delete color from the pallete
    async function clickHandler(uid) {
        setLoading(true)
        try {
            const deletedItem = await deleteColor({ variables: { uid: uid } })
            deleteFromLocalStorage(deletedItem.data.delete_colors_by_pk.uid)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    // delete data from local storage
    function deleteFromLocalStorage(uid) {
        localStorage.removeItem(uid)
    }

    // Set state based on hovering over color cards
    function handleMouseHover() {
        setHover(prev => !prev);
    }


    return (
        <div key={uid} className="card">
            <div className="card_info">
                <p>{elementId(index)}</p>
                <div className="label">
                    <input id={`input-${uid}`} defaultValue={type} placeholder="Enter Label" onKeyPress={(event) => handleData(event, uid)}></input>
                </div>

            </div>
            <div>
                <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} style={{ backgroundColor: hex }} className="showcase-color">
                    <div className="center">
                        {
                            deleteLoader ? <div className="delete-color">
                                <Loader size={25} color='#74b1a1'></Loader>
                            </div>
                                :
                                hovering ? <div className="delete-color" onClick={() => clickHandler(uid)}>
                                    <img className="center" src={del} alt="X" ></img>
                                </div> : <></>
                        }
                    </div>
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
