import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
// import QuizDetail from '../QuizDetail'
// import QuizList from '../QuizList'
import PrivateRoute from './PrivateRoute'
import Login from '../Login'
import styles from './style.module.css'

const { Header, Content, Footer } = Layout

export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={LoggedInApp} />
      </Switch>
  </Router>
  )
}

function LoggedInApp(props) {
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

    

      <Footer style={{ textAlign: 'center' }}>
        Quiz App ©2018 
      </Footer>
    </Layout>
  )
}

/*
  <Content style={{ padding: '0 50px', display: 'flex', flexDirection: 'column', height: "100%" }}>
        <Route exact path="/" component={QuizList} />
        <Route exact path='/:detail/:id' component={QuizDetail} />
      </Content>*/