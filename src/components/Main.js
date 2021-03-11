import React from 'react'
import Add from './Add';
import { useSubscription } from '@apollo/react-hooks';
import Colors from './Colors'
import Loader from './Loader'
import {COLOR_SUBSCRIPTION} from './QlRequests';


function Main() {
    const { data, error, loading } = useSubscription(COLOR_SUBSCRIPTION);

    if (loading) {
        return <Loader size={70} color='#74b1a1'></Loader>
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



