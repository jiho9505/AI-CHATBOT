import React from 'react'
import audio from './output.mp3'

function Caudio(props) {
    
    return (
        <div>
            <audio style={{display:'none'}} type = "audio/mpeg"  src={props.audio} controls autoPlay/>
        </div>
        
    )
}

export default Caudio
