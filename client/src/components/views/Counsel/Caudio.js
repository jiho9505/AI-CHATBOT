import React from 'react'
import audio from './output.mp3'

function Caudio() {
    console.log('p')
    return (
        <div>
            <audio style={{display:'none'}} src={audio} controls autoPlay/>
        </div>
        
    )
}

export default Caudio
