import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import FaKeyboard from 'react-icons/lib/fa/keyboard-o';

const { Sider } = Layout;

class Head extends Component {

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="login" />
            <span>Login</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon><FaKeyboard /></Icon>
            <span>Typing Practice</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Head;
