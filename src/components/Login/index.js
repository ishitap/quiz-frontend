import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Input, Button, Card, Form } from 'antd'
import * as actions from '../../actions'
import { shouldLogin } from '../../auth'
import * as styles from './styles.module.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      failedAuth: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(which, val) {
    this.setState({[which] : val })
  }

  handleSubmit(e) {
    e.preventDefault()

    let data = {
      username: this.state.username,
      password: this.state.password
    }
    this.setState({failedAuth: null})
    this.props.dispatch(actions.login(data))
      .catch(e => this.setState({ failedAuth: this.getErrorMessage(e) }))
  }

  render() {
    let { user, location } = this.props
     if (shouldLogin(user)) {
      return this.renderLogin()
    }
    let frompath = location.state && location.state.from
    if (!frompath || frompath.pathname === '/login' ) {
      frompath = { pathname: '/' }
    }
    return <Redirect to={frompath} />
  }

  renderLogin() {
    return (
      <div className={styles.login}>
        <Card>
          <Form>
          { this.renderInput('username') }
          { this.renderInput('password') }
          { this.renderError() }
          </Form>
          <Button 
            type="primary"
            disabled={!this.state.username.length || !this.state.password.length} 
            onClick={this.handleSubmit}
          >
          Login
          </Button>
        </Card>
      </div>
    )
  }

  renderInput(name) {
    return (
      <Form.Item>
        <Input 
          type={name === "password" ? "password" : "text"} 
          value={this.state[name]} 
          onChange={(e) => this.handleChange(name, e.target.value)}
          name={name} 
          placeholder={name} 
        />
      </Form.Item>
    )
  }

  renderError() {
    return (
      <span className={styles.fail}>{this.state.failedAuth}</span>
    )
  }

  getErrorMessage(error) {
    if (error.status === 400) {
      return "Invalid team, username, or password. Try again."
    } else {
      return "Something went wrong. Try again later."
    }
  }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)