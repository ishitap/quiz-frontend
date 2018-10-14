import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { Button, Card, Modal } from 'antd'
import Question from './Question'
import PageLayout from './PageLayout'
import styles from './EditQuiz/styles.module.css'
import * as actions from '../actions'
import QuizDetail from './QuizDetail'

class PlayQuiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shuffled: []
    }
    this.handleGradeQuiz = this.handleGradeQuiz.bind(this)
  }

  componentWillReceiveProps({ questions: newQuestions }) {
    // ideally you'd only shuffle when the GET finishes but 
    // this is fine for now
    const { questions } = this.props
    let clone = update(newQuestions, {})

    // question.correct is the user selected answer, 
    // question.trueCorrect is the actual answer
    clone.forEach(e => {
      e.trueCorrect = e.correct
      e.correct = -1
    })

    this.setState({ shuffled: shuffle(clone) })
  }

  render() {
    const { quiz, questions, match} = this.props
    const { shuffled } = this.state
    return (
      <PageLayout title="Play Quiz">
        <QuizDetail id={match.params.id}>
          <Card style={{marginBottom: 16}}>
            <div className={styles.titleContainer}>
              <h3>{quiz && quiz.title}</h3>
            </div>
          </Card>
          <Card>
            { shuffled.map((e, i) => <Question 
              key={i}
              {...e}
              expanded={true}
              onMarkCorrect={(oi) => this.handleMarkCorrect(i, oi)}
            />)}
            <Button type="primary" onClick={this.handleGradeQuiz}>Grade me now!</Button>
          </Card>
        </QuizDetail>
      </PageLayout>
    )
  }

  handleMarkCorrect(question_index, option_index) {
    let ns = update(this.state.shuffled, {
      [question_index]: {
        $merge: { correct: option_index }
      }
    })
    this.setState({ shuffled: ns })
  }

  handleGradeQuiz() {
    const { shuffled } = this.state
    let grade = gradeQuiz(shuffled)
    Modal.info({
      title: `You got ${grade} out of ${shuffled.length} correct`,
      onOk: () => {},
      iconType: 'smile',
    })
  }
}

const mapStateToProps = (state, props) => {
  return {
    quiz: state.quizzes.find(e => e._id === props.match.params.id),
    questions: state.questions
  }
}

export default connect(mapStateToProps)(PlayQuiz)




// --- ARRAY HELPERS

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function gradeQuiz(questions) {
  return questions.reduce((acc, cur) => acc + (cur.trueCorrect === cur.correct ? 1 : 0), 0)
}