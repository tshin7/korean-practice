import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import './App.css';

import MainContent from './components/MainContent';
import Head from './components/Head';

const { Header, Content } = Layout;

class App extends Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Head />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: '40em' }}>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
