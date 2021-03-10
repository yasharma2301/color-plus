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
    return (
        <div>
            <main>
                <div className="cards container">
                    <Add></Add>
                    <Query query={COLOR_QUERY}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>
                                if (error) return <p>Error</p>
                                return data.colors.map(({ hex, type, uid }) => (
                                    <div key={uid} className="card">
                                        <div className="card_info">
                                            <p>001</p>
                                            <p>Type: {type}</p>
                                        </div>
                                        <div>
                                            <div className="showcase-color">
                                            </div>
                                        </div>
                                        <div className="card_info">
                                            <p>
                                                HEX {hex}
                                            </p>
                                            <p>
                                                RGB 25 /25 /25
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        }
                    </Query>
                </div>
            </main>
        </div>
    )
}

export default Main
