import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal } from 'antd'
import Question from './EditQuiz/EditQuestion'
import PageLayout from './PageLayout'
import styles from './EditQuiz/styles.module.css'
import * as actions from '../actions'

class PlayQuiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowReview: false
    }
  }

  render() {
    let { quiz, questions } = this.props
    return (
      <PageLayout title="Play Quiz">
        <Card style={{marginBottom: 16}}>
          <div className={styles.titleContainer}>
            <h3>{quiz.title}</h3>
          </div>
        </Card>
        <Card>
          { questions.map((e, i) => <Question 
            key={i}
            {...e}
            expanded={true}
          />)}
        </Card>
      </PageLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    active_quiz: state.active_quiz,
    quiz: state.quizzes[state.active_quiz],
    questions: state.questions
  }
}

export default connect(mapStateToProps)(PlayQuiz)