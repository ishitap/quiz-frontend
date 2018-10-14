import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
    let { title, id } = item
    let actions = [<Link to={`/edit/${id}`}><Icon type="edit"/></Link>]
    return (
        <List.Item
          key={index}
          actions={actions}
          onClick={() => this.props.history.push({ pathname: `/play/${id}`})}
        >
          <a>{title}</a>
        </List.Item>
    )
  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes
  }
}

export default connect(mapStateToProps)(QuizList)