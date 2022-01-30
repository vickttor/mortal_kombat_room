import { Box, Text } from '@skynexui/components'
import React from 'react'
import Lottie from 'react-lottie'
import * as loader from './loader.json'
import appConfig from "../../../config.json"

export default function LoadingScreen(){


    const defaultOptions = {
        loop:true,
        autoplay:true,
        animationData: loader,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    return (
        <Box styleSheet={{
            display: 'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            flex:1,
            pointerEvents: 'none',
            textAlign:"center",
            position:'fixed',
            background:appConfig.theme.colors.neutrals[900],
            width:'100vw',
            height: '100vh',
            color:'white',
        }}>
            <Lottie options={defaultOptions}
            width={200}
            height={200}
            isStopped={false}
            isPaused={false}
            ></Lottie>
            <Text tag="p" variant='heading5'>Loading...</Text>
        </Box>
    )
}