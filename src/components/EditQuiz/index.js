import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Divider } from 'antd'
import PageLayout from '../PageLayout'
import EditTitle from './EditTitle'
import EditQuestion from './EditQuestion'
import styles from './styles.module.css'

class EditQuiz extends React.Component {
  render() {
    let { quiz } = this.props
    return (
      <PageLayout title="Edit Quiz">
        <Card style={{marginBottom: 16}}>
          <div className={styles.titleContainer}>
            <EditTitle title={quiz.title} />
            <Button type="danger" icon="delete" ghost>Delete quiz</Button>
          </div>
        </Card>
        <Card>
          { [0,0,0].map(e => <EditQuestion />) }
        </Card>
      </PageLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.quizzes[state.active_quiz],
    questions: state.questions
  }
}

export default connect(mapStateToProps)(EditQuiz)