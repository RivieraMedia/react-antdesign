// eslint-disable-next-line 
import React from 'react';
import logo from './logo.svg';
import { Layout } from 'antd';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import Login from './pages/Login';
import { PrivateRoute } from './components/privateRoute';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: null
    }
  }
  handleUserSearch = async (value) => {
    this.setState({ keyword: value })
  }
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" >
              <img src={logo} className="logo" alt="logo"/>
            </div>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <BrowserRouter >
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/users/:userId" component={UserDetail} />
                <Route path="/login" component={Login} />
                <Redirect from="*" to="/" />
              </Switch>
            </BrowserRouter>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Demo project @2019 Created by Sambath</Footer>
        </Layout>
      </div>
    )
  }
}
export default App;
