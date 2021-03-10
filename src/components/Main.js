import React from 'react'
import './css/main.css'
import '../App.css';
import './css/color.css'
import Add from './Add';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

const COLOR_SUBSCRIPTION = gql`
    subscription Color_Subscription {
        colors {
            hex
            type
            uid
        }
    }
`

function Main() {

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

    const { data, error, loading } = useSubscription(COLOR_SUBSCRIPTION);
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error!</p>
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
                                    <p>Type: {type}</p>
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