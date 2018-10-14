import React from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Route} from 'react-router-dom'
import EditQuiz from './EditQuiz'
import PlayQuiz from './PlayQuiz'

class QuizDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notFound: false,
    }
  }

  componentDidMount() {
    // fetch everything...
  }

  render() {
    if (this.state.notFound) {
      return <div>404 not found!</div>
    }

    return (
      <div>
        <PlayQuiz />
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(QuizDetail)