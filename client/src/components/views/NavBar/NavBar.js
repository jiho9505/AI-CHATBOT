import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import logo from './logo.PNG';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const clickHandler = () => {
    setVisible(false)
  }

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div>
        
        <Link to="/">
          <img className='logoimg' src={logo} alt='심리상담소'></img>
        </Link>
        
      </div>
      <div className="menu__container">
        
        <div className="menu_rigth" >
          <RightMenu mode="horizontal" />
        </div>

        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>

        <Drawer
          title="심리상담소"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
          onClick={clickHandler}
        >

          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
