import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { List, Icon, Card } from 'antd'
import ClickToEditInput from '../ClickToEditInput'
import QuestionOptions from '../QuestionOptions'
import * as actions from '../../actions'

const MIN_OPTIONS = 2
const MAX_OPTIONS = 10

class Question extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      titleDraft: props.title,
      optionsDraft: update(props.options, {}),
      correct: props.correct,
    }
    this.handleMarkCorrect = this.handleMarkCorrect.bind(this)
    this.handleEditOption = this.handleEditOption.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleRemoveOption = this.handleRemoveOption.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      titleDraft: props.title,
      optionsDraft: update(props.options, {}),
      correct: props.correct,
    })
  }

  render() {
    const { titleDraft, optionsDraft, correct } = this.state
    const { onToggle, onDelete, onSave, expanded } = this.props
    const actions = [
      <Icon type="delete" onClick={onDelete}/>,
      "", // using this as a spacer instead of writing a custom actions bar...
      <span onClick={onToggle}>Cancel</span>,
      <a style={{color: 'blue'}} onClick={onSave}>Save</a>
    ]
    return (
      <div style={{marginBottom: 16}}>
        <Card actions={expanded && actions}>
        <div style={{marginRight: 32, marginBottom: expanded && 16}}>
          <ClickToEditInput
            isEditing={expanded}
            value={titleDraft}
            onChange={e => this.setState({ titleDraft: e.target.value})}
            onToggle={onToggle}
          />
        </div>
        { expanded &&
          <QuestionOptions
            options={optionsDraft}
            correct={correct}
            onMarkCorrect={this.handleMarkCorrect}
            onChange={this.handleEditOption}
            onAdd={optionsDraft.length < MAX_OPTIONS && this.handleAddOption}
            onDelete={optionsDraft.length > MIN_OPTIONS && this.handleRemoveOption}
          />
        }
        </Card>
      </div>
    )
  }

  handleMarkCorrect(index) {
    this.setState({ correct: index })
  }

  handleEditOption(index, newText) {
    let newOptions = update(this.state.optionsDraft, {
      [index]: {
        $set: newText
      }
    })
    this.setState({ optionsDraft: newOptions })
  }

  handleAddOption() {
    let { optionsDraft } = this.state
    let newOptions =  update(optionsDraft, {
      $push: ["Option " + (optionsDraft.length+1)]
    })
    this.setState({ optionsDraft: newOptions })
  }

  handleRemoveOption(index) {
    let newOptions =  update(this.state.optionsDraft, {
      $splice: [[index, 1]]
    })
    let newCorrect = index > 0 ? index - 1 : 0
    this.setState({ correct: newCorrect, optionsDraft: newOptions })
  }
}

export default connect(() => {})(Question)
