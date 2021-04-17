import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import Counsel from "./views/Counsel/Counsel"
import NotFound from "./views/NotFound/NotFound"
import Footer from "./views/Footer/Footer"
import Auth from "../hoc/auth";
import LoginPage from './views/LoginPage/LoginPage.js'
import RegisterPage from './views/RegisterPage/RegisterPage.js'
import MyPage from './views/MyPage/MyPage'
import NavBar from './views/NavBar/NavBar.js'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


  return (
 
    <Suspense fallback={(<div style={{display:'flex', marginTop:'200px', justifyContent:'center', alignItems: 'center'}}>
      <Spin indicator={antIcon} /></div>)}>

      <NavBar/>
      <br/>
      <div className='bg'>
        <div style={{ minHeight: 'calc(100vh - 80px)'}}>
          
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/counsel" component={Auth(Counsel, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/mypage" component={Auth(MyPage, true)} />
            <Route exact path="/:url" component={Auth(NotFound, null)} />
          </Switch>
          
        </div>
        
        <Footer />
      </div>

    </Suspense>
  
  );
}

export default App;




