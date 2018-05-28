import React, { Component } from 'react';
import { Layout } from 'antd';

import './App.css';

import Head from './components/Head';
import Main from './components/Main';

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
        <Head collapsed={ this.state.collapsed } />
        <Main collapsed={ this.state.collapsed } />
      </Layout>
    );
  }
}

export default App;
