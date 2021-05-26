import React, { useState } from 'react'
import { Input, Button, Form , message } from 'antd'
import PictureUpload from './PictureUpload/PictureUpload'
import Axios from 'axios';

const {TextArea} = Input

    
function Postlist(props) {

    const [Description, setDescription] = useState("")
    const [Images, setImages] = useState([])
 
    const DescHandler = (e) => {
        setDescription(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }



    const submitHandler = (e) => {
        
        e.preventDefault();
        
        if (!Description || !Images[0]) {
            return alert("안 채운부분을 확인해주세요.")
        }

        const body = {
                writer: localStorage.getItem('userId'),
                description: Description,
                images: Images
    
            }
 
        Axios.post('/api/board', body)
            .then(response => {
                if (response.data.success) {
                    message.config({
                        top: 100
                        })
                    message.success('업로드 성공!')
            
                    setTimeout(() => {
                        props.history.push('/photos')
                    }, 1000)
                } else {
                    alert('업로드 실패!')
                }
            })
       
    }

    return (
    
    <div style = {{ width: '75%', margin: '3rem auto' }}>
        
             <div className='postlist'>
            <Form onSubmit={submitHandler}>
                
                <br />
                <br />
                <div className='center'>
                    <PictureUpload images={Images}  refreshFunction={updateImages} />
                </div>
                
                <br />
        
                <TextArea showCount onChange={DescHandler} value={Description} style={{height:100}} 
                 maxLength={2500} placeholder='내용을 입력해주세요.'/>

                <div style = {{display:'flex', justifyContent:'center'}}>
                    <Button type="primary" htmlType="submit" onClick={submitHandler}>Upload</Button>
                </div>
                
                
            </Form>
            
        </div>
         
        
       
    </div>
     
    )
}
export default Postlist
