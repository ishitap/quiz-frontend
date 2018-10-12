import React from 'react'
import { connect } from 'react-redux'
import { List, Button, Icon } from 'antd'
import PageLayout from './PageLayout'
import * as actions from '../actions'

class QuizList extends React.Component {
  constructor(props) {
    super(props)
    this.renderListItem = this.renderListItem.bind(this)
  }

  render() {
    let createButton = <Button type="primary" icon="plus" onClick={() => this.props.dispatch(actions.createQuiz({ title: 'New Quiz' }))}>Create Quiz</Button>
    return (
        <PageLayout title="My quizzes" actions={createButton}>
          <List
            style={{backgroundColor: 'white'}}
            bordered
            dataSource={this.props.quizzes}
            renderItem={this.renderListItem}
          />
        </PageLayout>
    )
  }

  renderListItem(item, index) {
    let { title } = item
    let actions = [<Icon onClick={()=>this.handleEditClick(index)} type="edit" />]
    return (
      <List.Item key={index} actions={actions} onClick={() => this.handleTitleClick(index)}>
        <a>{title}</a>
      </List.Item>
    )
  }

  handleEditClick(index) {
    this.props.dispatch(actions.startEditingQuiz(index))
  }

  handleTitleClick() {

  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes
  }
}

export default connect(mapStateToProps)(QuizList)