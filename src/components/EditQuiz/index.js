import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal } from 'antd'
import PageLayout from '../PageLayout'
import EditTitle from './EditTitle'
import EditQuestion from './EditQuestion'
import styles from './styles.module.css'
import * as actions from '../../actions'

class EditQuiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: -1
    }
  }

  componentDidMount() {
    // fetch quiz and questions
  }

  render() {
    let { quiz, questions } = this.props
    return (
      <PageLayout title="Edit Quiz">
        <Card style={{marginBottom: 16}}>
          <div className={styles.titleContainer}>
            <EditTitle title={quiz.title} />
            <Button onClick={this.handleDeleteQuiz.bind(this)} type="danger" icon="delete" ghost>Delete quiz</Button>
          </div>
        </Card>
        <Card>
          { questions.map((e, i) => <EditQuestion 
            key={i}
            {...e}
            expanded={this.state.expanded === i}
            onToggle={() => this.handleSelectQuestion(i)}
            onDelete={() => this.handleDeleteQuestion(i)}
            onSave={() => this.handleSaveQuestion(i)}
          />)}
          <Button type="primary" icon="plus" onClick={this.handleAddQuestion.bind(this)}>Add a question</Button>
        </Card>
      </PageLayout>
    )
  }

  handleAddQuestion() {
    const { dispatch, questions } = this.props
    dispatch(actions.createQuestion({
      title: "New question " + parseInt(Math.random() * 100, 10),
      options: ["Option 1", "Option 2"],
      correct: 0,
    }))
    this.handleSelectQuestion(questions.length)
  }

  handleDeleteQuestion(i) {
    this.props.dispatch(actions.deleteQuestion(i))
    this.setState({ expanded: -1 })
  }

  handleSaveQuestion(i) {

  }

  handleSelectQuestion(i) {
    this.setState({ expanded: this.state.expanded === i ? -1 : i})
  }

  handleDeleteQuiz(i) {
    Modal.confirm({
      title: "Delete quiz?",
      content: "This quiz will be gone forever.",
      onOk: () => {
        this.props.dispatch(actions.deleteQuiz(this.props.active_quiz))
          .then(() => window.location = '/')
      }
    })
  }
}

const mapStateToProps = (state, props) => {
  const quizID = props.match.params.id
  const quiz = state.quizzes.find(e => e.id === quizID)
  return {
    quiz: quiz,
    questions: state.questions,
  }
}

export default connect(mapStateToProps)(EditQuiz)