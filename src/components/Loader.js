import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import { css } from '@emotion/core'

// Custom css to loader using emotion package
const loaderCss = css`
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
`

function Loader({ size, color }) {
    return (
        <HashLoader size={size} color={color} css={loaderCss}></HashLoader>)
}

export default Loader

