import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function LandingPage() {
    
    
    return (
        <div className='pageSize_'>
            
            <h2 className="_pageStart">   
            
            </h2>
            
            <div className="centermode"> 
                <h3>안녕, 오늘 하루도 고생많았어!</h3> 
                <Link to='/counsel'>
                    <Button>
                        Click
                    </Button>
                    
                </Link>
            </div>
            
  
            
        
                
    
            
        </div>
    )
}

export default LandingPage
