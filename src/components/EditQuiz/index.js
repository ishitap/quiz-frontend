import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal } from 'antd'
import PageLayout from '../PageLayout'
import EditTitle from './EditTitle'
import Question from '../Question'
import styles from './styles.module.css'
import * as actions from '../../actions'
import QuizDetail from '../QuizDetail'

class EditQuiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: -1
    }
  }

  render() {
    let { quiz, questions, match } = this.props
    return (
      <PageLayout title="Edit Quiz">
        <QuizDetail id={match.params.id}>
          <Card style={{marginBottom: 16}}>
            <div className={styles.titleContainer}>
              <EditTitle
                title={quiz && quiz.title}
                onUpdateTitle={this.handleUpdateQuiz}
              />
              <Button 
                onClick={this.handleDeleteQuiz.bind(this)}
                type="danger"
                icon="delete"
                ghost
              >
                Delete quiz
              </Button>
            </div>
          </Card>
          <Card>
            { questions.map((e, i) => <Question 
              key={i}
              {...e}
              expanded={this.state.expanded === i}
              onToggle={() => this.handleSelectQuestion(i)}
              onDelete={() => this.handleDeleteQuestion(i)}
              onSave={(data) => this.handleUpdateQuestion(i, data)}
            />)}
            <Button
              type="primary"
              icon="plus"
              onClick={this.handleAddQuestion.bind(this)}
            >
              Add a question
            </Button>
          </Card>
        </QuizDetail>
      </PageLayout>
    )
  }


  // --- EVENT HANDLERS

  handleAddQuestion() {
    const { dispatch, questions, match } = this.props
    dispatch(actions.createQuestion(match.params.id, {
      title: "New question",
      options: ["Option 1", "Option 2"],
      correct: 0,
    }))
  }

  handleDeleteQuestion(i) {
    // this.props.dispatch(actions.deleteQuestion(i))
    // this.setState({ expanded: -1 })
  }

  handleUpdateQuestion(i, data) {
    let { dispatch, questions, match } = this.props
    dispatch(actions.updateQuestion(match.params.id, questions[i]._id, i, data))
      .then(res => {
        if (res) {
          // close once you save
          this.setState({ expanded: -1 })
        }
      })
  }

  handleSelectQuestion(i) {
    this.setState({ expanded: this.state.expanded === i ? -1 : i})
  }

  handleUpdateQuiz(data) {
    let { dispatch, match, quizIndex } = this.props
    //return dispatch(actions.updateQuiz(match.params.id, quizIndex, data))
  }

  handleDeleteQuiz(i) {
    Modal.confirm({
      title: "Delete quiz?",
      content: "This quiz will be gone forever.",
      onOk: () => {
        // this.props.dispatch(actions.deleteQuiz(this.props.active_quiz))
        //   .then(() => window.location = '/')
      }
    })
  }
}

const mapStateToProps = ({ quizzes, questions }, { match }) => {
  let index = quizzes.findIndex(e => e._id === match.params.id)
  return {
    quizIndex: index,
    quiz: index > -1 && quizzes[index],
    questions: questions,
  }
}

export default connect(mapStateToProps)(EditQuiz)