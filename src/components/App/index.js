import React from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import PlayQuiz from '../PlayQuiz'
import EditQuiz from '../EditQuiz'
import QuizList from '../QuizList'
import { Login, Logout } from '../Login'
import { shouldLogin } from '../../auth'
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
          <Logout />
        </div>
      </Header>

      <Content style={{ padding: '0 50px', display: 'flex', flexDirection: 'column', height: "100%" }}>
        <Route exact path="/:id/play" component={PlayQuiz} />
        <Route exact path="/:id/edit" component={EditQuiz} />
        <Route exact path="/" component={QuizList} />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Quiz App ©2018 
      </Footer>
    </Layout>
  )
}

// Private Route: if not logged in, redirects to login, otherwise proceed
class UnconnectedPrivateRoute extends React.Component {
  render() {
    let { component, user } = this.props
    if (shouldLogin(user)) {
      return (
        <Route render={props => (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
        } />
      )
    } 
    return <Route component={component} />
  }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    user: state.user
  }
}

let PrivateRoute = connect(mapStateToProps)(UnconnectedPrivateRoute)
