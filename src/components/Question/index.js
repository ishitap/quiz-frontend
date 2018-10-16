import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { List, Icon, Card } from 'antd'
import ClickToEditInput from '../ClickToEditInput'
import QuestionOptions from '../QuestionOptions'
import * as actions from '../../actions'
import styles from './styles.module.css'

const MIN_OPTS = 2
const MAX_OPTS = 10

// if props.onSave is present, Question becomes Editable
// ie. it will be used in EditQuiz, not PlayQuiz

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      options: update((props.options || []), {}),
      correct: props.correct,
    }
    this.handleMarkCorrect = this.handleMarkCorrect.bind(this)
    this.handleEditOption = this.handleEditOption.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleRemoveOption = this.handleRemoveOption.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.title,
      options: update((props.options || []), {}),
      correct: props.correct,
    })
  }

  render() {
    const { options, correct } = this.state
    const { onSave, expanded } = this.props
    const len = options.length
    return (
      <div style={{marginBottom: 16}}>
        <Card actions={this.renderActionsBar()}>
        <div style={{marginRight: 32, marginBottom: expanded && 16}}>
          {this.renderQuestionTitle()}
        </div>
        { expanded &&
          <QuestionOptions
            options={options}
            correct={correct}
            onMarkCorrect={this.handleMarkCorrect}
            onChange={onSave && this.handleEditOption}
            onAdd={onSave && len < MAX_OPTS && this.handleAddOption}
            onDelete={onSave && len > MIN_OPTS && this.handleRemoveOption}
          />
        }
        </Card>
      </div>
    )
  }

  renderQuestionTitle() {
    const { title } = this.state
    const { onSave, onToggle, expanded } = this.props
    if (!onSave) {
      return <span>{title}</span>
    }
    return (
      <ClickToEditInput
        isEditing={expanded}
        value={title}
        onChange={e => this.setState({ title: e.target.value})}
        onToggle={onToggle}
      />
    )
  }

  renderActionsBar() {
    const { onToggle, onDelete, onSave, expanded } = this.props
    return expanded && onSave && [
       <Icon type="delete" onClick={onDelete}/>,
        "", // using this as a spacer instead of writing a custom actions bar...
        <span onClick={onToggle}>Cancel</span>,
        <a style={{color: 'blue'}} onClick={() => onSave(this.state)}>Save</a>
    ]
  }


  // --- EVENT HANDLERS

  handleMarkCorrect(index) {
    this.setState({ correct: index })

    // if the parent wanted to do something on marking 
    // something correctlet them do it here...
    this.props.onMarkCorrect && this.props.onMarkCorrect(index)
  }

  handleEditOption(index, newText) {
    let newOptions = update(this.state.options, {
      [index]: {
        $set: newText
      }
    })
    this.setState({ options: newOptions })
  }

  handleAddOption() {
    let { options } = this.state
    let newOptions =  update(options, {
      $push: ["Option " + (options.length+1)]
    })
    this.setState({ options: newOptions })
  }

  handleRemoveOption(index) {
    let newOptions =  update(this.state.options, {
      $splice: [[index, 1]]
    })
    let newCorrect = index > 0 ? index - 1 : 0
    this.setState({ correct: newCorrect, options: newOptions })
  }
}

export default connect(() => { return {} })(Question)
