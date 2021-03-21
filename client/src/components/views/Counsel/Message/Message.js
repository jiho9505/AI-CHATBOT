import React from 'react'
import { List, Avatar } from 'antd';
import {
    RobotOutlined,  UserOutlined
} from '@ant-design/icons';


function Message(props) {

    const AvatarSrc = props.who ==='AI 상담요원' ? <RobotOutlined /> : <UserOutlined /> 

    return (
        <div>
            {
                props.who ==='AI 상담요원' ?
                <List.Item style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar  icon={AvatarSrc} />}
                            title={props.who}
                            description={props.text}
                        />
                </List.Item>
                :
                <List.Item style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar  style={{ backgroundColor: '#87d068' }} icon={AvatarSrc} />}
                            title={props.who}
                            description={props.text}
                        />
                </List.Item>
            }
            
        </div>
       
    )
}

export default Message