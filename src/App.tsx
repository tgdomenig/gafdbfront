import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';

import HasDatastore from './components/Base/HasDatastore';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { NavigationMenu, NavigationRoutes } from './components/Base/Navigation';

import './App.css';
// import './AppConfig.css';
import RestrictedAdmin from './components/Base/RestrictedAdmin';
import { Styling } from './components/Base/StylingConstants';
import { Context } from './util/dbFront/Context';
import { useState } from 'react';

Amplify.configure(awsconfig);

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [datastoreSynced, setDatastoreSynced] = useState(false);

  const { Header, Footer, Content } = Layout;
//  const {datastoreSynced} = useContext(Context)

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: Styling.PRIMARY_COLOR,
            algorithm: true, // Enable algorithm
          },
          Input: {
            colorPrimary: Styling.SECONDARY_COLOR,
            algorithm: true, // Enable algorithm
          }
    
        },
        token: {
          // Seed Token
          colorPrimary: '#254e5c',
  //        borderRadius: 2,

          // Alias Token
  //        colorBgContainer: '#f6ffed',
        },
      }}
    >
      <Context.Provider value={{
          isAuthenticated,
          setIsAuthenticated,
          datastoreSynced,
          setDatastoreSynced
      }}
      >
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
    </Context.Provider>
    </ConfigProvider>
  );
}

export default App;
