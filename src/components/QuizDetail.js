import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class QuizDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notFound: false,
      loadingQuizzes: true,
      loadingQuestions: true,
    }
  }

  componentDidMount() {
    this.setState({ loadingQuestions: true, loadingQuizzes: true })

    // could load just one quiz instead of all but oh well
    this.props.dispatch(actions.getQuizzes())
      .then(() => this.setState({ loadingQuizzes: false }))
    this.props.dispatch(actions.getQuestions(this.props.id))
      .then(() => this.setState({ loadingQuestions: false }))
  }

  render() {
    if (this.state.notFound) {
      return <div>404 not found!</div>
    }

    if (this.state.loadingQuestions || this.state.loadingQuizzes) {
      return <div>Loading...</div>
    }

    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(QuizDetail)