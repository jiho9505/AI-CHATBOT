import React, { useState, useEffect , useRef} from 'react';
import Axios from 'axios';
import Message from './Message/Message';

function Counsel() {
    
    const messagesEnd = useRef(null)
    const [allMessage, setallMessage] = useState([])

    useEffect(() => {
        eventQuery('welcomeToMyWebsite')
    }, [])

    useEffect(() => {
        messagesEnd.current.scrollTo({
            top: 10000,
            behavior: 'smooth'
          });

    }, [allMessage])

 



    const textQuery = async (text) => {

        let conversations = {
            who: '손님',
            content: {
                text: {
                    text: text
                }
            }
        }
    
       
    
        const textQueryVariables = {
            text
        }

        try {
            
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'AI 상담요원',
                    content: content
                }
               
                setallMessage([...allMessage,conversations,conversation])
            } 


        } catch (error) {
            let conversation = {
                who: 'AI 상담요원',
                content: {
                    text: {
                        text: "에러가 발생하였습니다. 다시 시도해주세요."
                    }
                }
            }

            setallMessage([...allMessage,conversations,conversation])


        }

    }


    const eventQuery = async (event) => {

        const eventQueryVariables = {
            event
        }
        try {

            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            
            for (let content of response.data.fulfillmentMessages) {
                let content1 = {
                    text : {
                        text : content.payload.fields.conv1.stringValue
                    }
                } 
                
                let content2 = {
                    text : {
                        text : content.payload.fields.conv2.stringValue
                    }
                } 

                let content3 = {
                    text : {
                        text : content.payload.fields.conv3.stringValue
                    }
                }

                let conversation = {
                    who: 'AI 상담요원',
                    content: content1
                }

                let conversation1 = {
                    who: 'AI 상담요원',
                    content: content2
                }

                let conversation2 = {
                    who: 'AI 상담요원',
                    content: content3
                }
              
            
                setallMessage([...allMessage,conversation,conversation1,conversation2])
            }


        } catch (error) {
            let conversation = {
                who: 'AI 상담요원',
                content: {
                    text: {
                        text: "에러가 발생하였습니다. 다시 시도해주세요."
                    }
                }
            }
            setallMessage([...allMessage,conversation])
        }           

    }


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('최소 1글자 이상 입력해주시기 바랍니다.')
            }

            textQuery(e.target.value)
            e.target.value = ""
        }
    }


    const renderOneMessage = (message, i) => {
       
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        }
    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }


    return (
        <div className='pageSize'>

            <h2 className="pageStart">
                Test Code
            </h2>
            <div className='grayBorder'/>
            <br/>
            <div className="counsel__whole">
                <div className="counsel__wholechat">
                    <div className="counsel__chat" ref={messagesEnd}>

                        {renderMessage(allMessage)}

                    </div>
                    <input
                        className="counsel__input"
                        placeholder="입력해주시기 바랍니다..."
                        onKeyPress={keyPressHanlder}
                        type="text"
                    />

                </div>
            </div>
            <br/>
        </div>
        
    )
}

export default Counsel;