import React from 'react'
import './css/main.css'
import '../App.css';
import './css/color.css'
import Add from './Add';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const COLOR_QUERY = gql`
    query Color_Query {
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

    return (
            <main>
                <div className="cards container">
                    <Add></Add>
                    <Query query={COLOR_QUERY}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>
                                if (error) return <p>Error</p>
                                return data.colors.map(({ hex, type, uid }, index) => (
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
                                ))
                            }
                        }
                    </Query>
                </div>
            </main>
    )
}

export default Main
