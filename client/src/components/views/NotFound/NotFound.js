import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <br/><br/><br/>
            <Result
                status="404"
                title="404"
                subTitle="더 이상 유효한 페이지가 아닙니다."
                extra={<Link to="/"><Button type="primary">Home</Button></Link>}
            />
        </div>
    )
}

export default NotFound