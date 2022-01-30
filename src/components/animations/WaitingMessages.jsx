import { Box, Text } from '@skynexui/components'
import React from 'react'
import Lottie from 'react-lottie'
import * as loader from './waitingMessages.json'

export default function WaitingMessages(){


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
            textAlign:"center"
        }}>
            <Lottie options={defaultOptions}
            width={200}
            height={200}
            isStopped={false}
            isPaused={false}
            ></Lottie>
            <Text tag="p" variant='body4'>There're no messages yet. Try to send ...</Text>
        </Box>
    )
}