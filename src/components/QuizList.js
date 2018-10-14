import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Button, Icon, Modal, Input } from 'antd'
import PageLayout from './PageLayout'
import * as actions from '../actions'

class QuizList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newQuizTitle: "",
    }
    this.renderListItem = this.renderListItem.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(actions.getQuizzes())
  }

  render() {
    let createButton = <Button type="primary" icon="plus" onClick={() => this.setState({isCreating: true})}>Create Quiz</Button>
    return (
        <PageLayout title="My quizzes" actions={createButton} home={true}>
          <List
            style={{backgroundColor: 'white'}}
            bordered
            dataSource={this.props.quizzes}
            renderItem={this.renderListItem}
          />
          { this.renderCreateModal() }
        </PageLayout>
    )
  }

  renderListItem(item, index) {
    let { title, _id } = item
    let actions = [<Link to={`/${_id}/edit`}><Icon type="edit"/></Link>]
    return (
        <List.Item key={index} actions={actions}>
          <Link to={`/${_id}/play`}><Icon type="play"/>{title}</Link>
        </List.Item>
    )
  }

  renderCreateModal() {
    const { isCreating, newQuizTitle } = this.state
    return (
      <Modal
        title="Create a new quiz"
        visible={isCreating}
        okText='Create Quiz'
        onCancel={() => this.setState({ isCreating: false, newQuizTitle: ""})}
        onOk={this.handleCreate}
      >
        <Input value={newQuizTitle} onChange={e => this.setState({newQuizTitle: e.target.value})} placeholder="New quiz title" />
      </Modal>
    )
  }

  handleCreate() {
    const payload = { title: this.state.newQuizTitle }
    this.props.dispatch(actions.createQuiz(payload))
      .then(res => {
        if(res) {
          this.setState({ isCreating: false })
        }
      })
  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes
  }
}

export default connect(mapStateToProps)(QuizList)