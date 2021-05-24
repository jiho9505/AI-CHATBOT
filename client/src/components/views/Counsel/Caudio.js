import React from 'react'
import audio from '../../../../audio/output.mp3'

function Caudio() {
    
    return (
        <div>
            <audio style={{display:'none'}} src={audio} controls autoPlay/>
        </div>
        
    )
}

export default Caudio
