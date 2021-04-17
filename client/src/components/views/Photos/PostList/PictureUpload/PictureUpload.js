import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';


function PictureUpload(props) {
    useEffect(() => {
       
        if(props.images.length>0){
            setImages([...props.images])
            setShow(true)
        }
    }, [props.images])

    const [Images, setImages] = useState([])
    const [Show, setShow] = useState(false)

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/board/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                    setShow(true)
                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)
        
        if(newImages.length > 0){
            setShow(true)
        }
        else{
            setShow(false)
        }

    }


    return (
        <div>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                   <div style={{display:'flex', justifyContent:'center' , height: 30}} {...getRootProps()}>
                        <input {...getInputProps()} />
                       
                        <Icon type="plus" /> 사진 추가
                        
                        
                  </div>
                )}
            </Dropzone>
            {Show ? 
            <div style={{display:'flex', justifyContent:'center'}}>
                <div style={{  width: '300px', height: '290px', overflowX: 'scroll' }}>

                {Images && Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={image} alt='image'
                        />
                       
                    </div>
                ))}


                </div>
            </div>
            : ""} 
        </div>
    )
}

export default PictureUpload