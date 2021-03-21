import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import Counsel from "./views/Counsel/Counsel"
import NotFound from "./views/NotFound/NotFound"
import Footer from "./views/Footer/Footer"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


  return (
 
    <Suspense fallback={(<div style={{display:'flex', marginTop:'200px', justifyContent:'center', alignItems: 'center'}}>
      <Spin indicator={antIcon} /></div>)}>
      
      
     
      <br/>
      
      <div style={{ minHeight: 'calc(100vh - 80px)'}}>
        
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/counsel" component={Counsel} />
          <Route exact path="/:url" component={NotFound} />
          
          
        </Switch>
        
      </div>
      <div className='space'></div>
      
      
      <Footer />
     
      <div className='spacing'/>

    </Suspense>
  
  );
}

export default App;
