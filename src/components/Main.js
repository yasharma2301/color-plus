import React from 'react'
import Add from './Add';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import HashLoader from "react-spinners/HashLoader";
import Colors from './Colors'

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

    const { data, error, loading } = useSubscription(COLOR_SUBSCRIPTION);

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
                            <Colors key={uid} hex={hex} uid={uid} index={index} type={type}></Colors>
                    )
                }
            </div>
        </main>
    )
}

export default Main



