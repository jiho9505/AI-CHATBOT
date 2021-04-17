import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter,  Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const USER_SERVER = '/api/users';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
  
      <Menu mode={props.mode}>
        <Menu.Item key="home">
          <Link to="/counsel">
            Counsel
          </Link>
        </Menu.Item>
        <Menu.Item key="Photos">
          <Link to="/photos">
            Photos
          </Link>
        </Menu.Item> 
        <Menu.Item key="mail">
          <Link to="/login">로그인</Link>
        
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">회원 가입</Link>
        
        </Menu.Item>
      </Menu>
    )
  } else {
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="home">
              <Link to="/counsel">
                Counsel
              </Link>
            </Menu.Item>
            <Menu.Item key="Photos">
              <Link to="/photos">
                Photos
              </Link>
            </Menu.Item>
             
            <Menu.Item key="mypage">
              <Link to="/mypage">My Page</Link>
              
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to="/" onClick={logoutHandler}>로그아웃</Link>
      
            </Menu.Item>
          </Menu>
        )
      }
}

export default withRouter(RightMenu);

