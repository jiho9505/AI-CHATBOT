/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { message } from 'antd'

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
     
        useEffect(() => {

            dispatch(auth()).then(response => {

                if (!response.payload.isAuth) {
                    if (option) {
                        message.config({
                            top: 100
                          })
                        message.success('로그인을 하셔야 이용할 수 있는 기능입니다.')
            
                            props.history.push('/login')                      
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (option === false) {
                            props.history.push('/counsel')
                        }
                    }
                }
            })

        }, [])

        return (
                <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


