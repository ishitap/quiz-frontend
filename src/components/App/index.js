import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Icon } from 'antd'
import ReallySimpleRouter from '../ReallySimpleRouter'
import styles from './style.module.css'

const { Header, Content, Footer } = Layout

export default function App(props) {
  return (
    <Layout className="layout">
    <Header>
      <div className={styles.title}>
        <Icon type="home" />
      </div>
      <div className={styles.logout}>
        <Icon type="user" />
        <span>ishita</span>
        <a>Logout</a>
      </div>
    </Header>
    <Content style={{ padding: '0 50px', display: 'flex', flexDirection: 'column', height: "100%" }}>
        <ReallySimpleRouter />
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Quiz App ©2018 
    </Footer>
  </Layout>
  )
}