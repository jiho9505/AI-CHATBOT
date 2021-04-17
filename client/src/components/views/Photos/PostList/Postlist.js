import React, { useState, useEffect } from 'react'
import { Input, Button, Form , message, Result} from 'antd'
import PictureUpload from './PictureUpload/PictureUpload'
import Axios from 'axios';
import { Link } from 'react-router-dom';

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
        
        if (!Description) {
            return alert("내용 부분을 입력했는지 확인해주세요.")
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
                    message.success('글 게시 성공!')
            
                    setTimeout(() => {
                        // props.history.push('/community')
                    }, 1000)
                } else {
                    alert('글을 게시하는데 실패했습니다.')
                }
            })
       
    }

    return (
    
    <div style = {{ width: '75%', margin: '3rem auto' }}>
        
             <div className='postlist'>
            <Form onSubmit={submitHandler}>
                
               
                <br />
                <br />
                <label style={{fontSize : '16px'}}>내용</label>
                
                <br />
        
                <TextArea showCount onChange={DescHandler} value={Description} style={{height:300}} 
                 maxLength={2500} placeholder='내용을 입력해주세요.'/>

                <br />
                <br />
                <PictureUpload images={Images} refreshFunction={updateImages} />
                <br />
                <br />
                <div style = {{display:'flex', justifyContent:'center'}}>
                    <Button type="primary" htmlType="submit" onClick={submitHandler}>글 게시하기</Button>
                </div>
                
                
            </Form>
            
        </div>
         
        
       
    </div>
     
    )
}
export default Postlist
