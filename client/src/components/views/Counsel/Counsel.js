import React, { useState, useEffect , useRef} from 'react';
import Axios from 'axios';
import Message from './Message/Message';
import { Button, message } from 'antd';
import Caudio from './Caudio.js'


const _id = window.localStorage.getItem('userId');

function Counsel() {
    
    const messagesEnd = useRef(null)
    const [allMessage, setallMessage] = useState([])
    let prev = [];
    
    useEffect( () => {
       const fun = async () => {
            let data = {'_id' : _id};
            const rep = await Axios.post('/api/chats/get',data)
                            .then(response => response.data);

            if(rep.success){
                if(rep.msg) prev = [rep.msg.msg]
            }
            eventQuery('welcomeToMyWebsite');
        }
       fun();
       
    }, [])

    useEffect(() => {
        messagesEnd.current.scrollTo({
            top: 10000,
            behavior: 'smooth'
          });

    }, [allMessage])

 



    const textQuery = async (text) => {

        let conversations = {
            who: '나',
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
            let data = response.data[0]
            let conversation = {
                who: '심상이',
                content: {
                    text: {
                        text: data
                    }
                }
            }
            await Axios.post('/api/gs/tts',{'text':data})
            setallMessage([...allMessage,conversations,conversation])

        } catch (error) {
            let conversation = {
                who: '심상이',
                content: {
                    text: {
                        text: "에러가 발생하였습니다. 다시 시도해주세요."
                    }
                }
            }
            await Axios.post('/api/gs/tts',{'text':"에러가 발생하였습니다. 다시 시도해주세요."})
            
          
            setallMessage([...allMessage,conversations,conversation])


        }

    }


    const eventQuery = async (event) => {

        const eventQueryVariables = {
            event
        }
        try {

            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            let data = response.data[0];
            let conversation = {
                who: '심상이',
                content: {
                    text: {
                        text: data
                    }
                }
            }
            await Axios.post('/api/gs/tts',{'text':data})
       
            prev.length === 0 ? setallMessage([conversation]) : setallMessage([...prev[0],conversation])

        } catch (error) {
            let conversation = {
                who: '심상이',
                content: {
                    text: {
                        text: "에러가 발생하였습니다. 다시 시도해주세요."
                    }
                }
            }
            await Axios.post('/api/gs/tts',{'text':"에러가 발생하였습니다. 다시 시도해주세요."})
            prev.length === 0 ? setallMessage([conversation]) : setallMessage([...prev[0],conversation])
            
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

    const clickSave = async () => {
        if(window.confirm('대화를 저장하시겠습니까?')){
            let data = {
                'writer' : _id,
                'msg' : allMessage
            };
            const rep = await Axios.post('/api/chats/make',data)
                             .then(response => response.data);
            if(rep.success){
                message.config({
                    top: 100
                  })
                message.success("Success Save")
            }else{
                alert('Error(chats dont save !!)')
            }
        }
    }

    return (
        <div className='pageSize'>

            <h2 className="pageStart">
                심리 상담소
            </h2>
            <div className='grayBorder'/>
            <br/>
            <Caudio></Caudio>
            
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
            <div> <Button onClick={clickSave}>Save</Button></div>
            <br/>
        </div>
        
    )
}

export default Counsel;