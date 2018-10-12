import React from 'react'
import { connect } from 'react-redux'
import EditQuiz from './EditQuiz'
import PlayQuiz from './PlayQuiz'
import QuizList from './QuizList'

function ReallySimpleRouter({ mode }) {
  if (mode === 'edit') {
    return <EditQuiz />
  } else if (mode === 'play') {
    return <PlayQuiz />
  } else {
    return <QuizList />
  }
}

const mapStateToProps = state => {
  return {
    mode: state.mode,
  }
}

export default connect(mapStateToProps)(ReallySimpleRouter)