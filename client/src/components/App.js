import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import Footer from "./views/Footer/Footer"
import Auth from "../hoc/auth";
import NavBar from './views/NavBar/NavBar.js'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoginPage = React.lazy(() => import('./views/LoginPage/LoginPage.js'));
const RegisterPage = React.lazy(() => import('./views/RegisterPage/RegisterPage.js'));
const Photos = React.lazy(() => import('./views/Photos/Photos'));
const Postlist = React.lazy(() => import('./views/Photos/PostList/Postlist'));
const Counsel = React.lazy(() => import('./views/Counsel/Counsel'));
const MyPage = React.lazy(() => import('./views/MyPage/MyPage'));
const NotFound = React.lazy(() => import('./views/NotFound/NotFound'));

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
            <Route exact path="/postlist" component={Auth(Postlist, true)} />
            <Route exact path="/photos" component={Auth(Photos, true)} />
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




