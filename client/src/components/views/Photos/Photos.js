import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { Col, Row, Card , Button  } from 'antd'
import moment from "moment";
import axios from 'axios';

const { Meta } = Card;



function Photos() {
    let id = localStorage.getItem('userId');
    
    useEffect(() => {
        if(id){
            axios.get(`/api/board/?id=${id}`)
                .then(response => {
                    if (response.data.success) {
                        setphotos(response.data.result)
                    } else {
                        alert('Error')
                    }
                })
        }
        
    }, [])

    const [photos, setphotos] = useState([])

    const renderCards = photos.map((photo, index) => {

        return <Col  lg={12} md={12} xs={12} key = {index}>
            <Card
                hoverable={true}
                cover={<img src={photo.images[0]}></img>}
            >
                <Meta
                    title={moment(photo.createdAt ).format("YYYY-MM-D")}
                    description={photo.description}
                />
            </Card>
        </Col>
    })

    return (
        <div style={{width : '90%', margin: 'auto'}} >
            <br/><br/><br/><br/>
            <h2  style={{display:'flex', justifyContent:'center'}}>행복한 순간 기록하기</h2>
            
            <div style={{display:'flex', justifyContent:'center'}}>
                <Link to='/postlist'><Button  >Upload Photos</Button></Link>
            </div>
            
            <br/>
            <Row gutter={[32,32]}>
                
                     {renderCards}
               
            </Row>
            
        </div>
    )
}

export default Photos