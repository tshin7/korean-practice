import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import MainContent from './MainContent';

const { Header, Content } = Layout;

class Main extends Component {

  render() {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: '40em' }}>
          <MainContent />
        </Content>
      </Layout>
    );
  }
}

export default Main;
