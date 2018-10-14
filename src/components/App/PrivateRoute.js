import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { shouldLogin } from '../../auth'

class PrivateRoute extends React.Component {
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

export default connect(mapStateToProps)(PrivateRoute)