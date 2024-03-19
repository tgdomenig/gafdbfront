import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import HasDatastore from './components/Base/HasDatastore';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { NavigationMenu, NavigationRoutes } from './components/Base/Navigation';
import { AppConfig } from './AppConfig';

import './App.css';
// import './AppConfig.css';
import RestrictedAdmin from './components/Base/RestrictedAdmin';

Amplify.configure(awsconfig);

function App() {

  const { Header, Footer, Content } = Layout;

  return (
      <Router>
        <Layout>
        <Header className="header">
          <NavigationMenu />
      </Header>

        <Content>
          <RestrictedAdmin>
            <HasDatastore>
              <NavigationRoutes />
            </HasDatastore>
          </RestrictedAdmin>
        </Content>

        <Footer />
      </Layout>
    </Router>
      
  );
}

export default App;
