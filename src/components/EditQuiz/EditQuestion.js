import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { List, Icon, Input, Card } from 'antd'
import ClickToEditInput from '../ClickToEditInput'

const MIN_OPTIONS = 2
const MAX_OPTIONS = 10

export default class EditQuestion extends React.Component {
  constructor(props) {
    super(props)

    // makes sure options has at *least* two options
    let draftOptions = update(props.options || [], {})
    for (let i = draftOptions.length; i < MIN_OPTIONS; i++) {
      draftOptions.push("Option " + (i+1))
    }
    this.state = {
      expanded: false,
      titleDraft: props.title || "Question 1",
      optionsDraft: draftOptions,
      correct: props.correct || 0,
    }
    this.renderOption = this.renderOption.bind(this)
  }

  render() {
    let { titleDraft, optionsDraft, expanded } = this.state
    return (
      <div style={{marginBottom: 16}}>
        <Card actions={expanded && [<Icon type="delete" />, "", "Cancel", "Save"]}>
        <ClickToEditInput
          isEditing={expanded}
          value={titleDraft}
          onChange={e => this.setState({ titleDraft: e.target.value})}
          onToggle={e => this.setState({ expanded: !expanded })}
        />
        { expanded && [
          <List
            size="small"
            split={false}
            dataSource={optionsDraft}
            renderItem={this.renderOption}
          />,
          optionsDraft.length < MAX_OPTIONS && <a onClick={this.handleAddOption.bind(this)}>Add another option</a>
        ]}
        </Card>
      </div>
    )
  }

  renderOption(item, index) {
    let { optionsDraft, correct } = this.state
    let actions = optionsDraft.length > MIN_OPTIONS && [<Icon type="delete" onClick={() => this.handleRemoveOption(index)}/>]
    return (
      <List.Item key={index} actions={actions}>
        <CorrectOptionMarker marked={correct === index} onClick={() => this.handleMarkCorrect(index)} />
        <Input size="small" value={item} onChange={e => this.handleEditOption(index, e.target.value)}/>
      </List.Item>
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

function CorrectOptionMarker({ marked, ...rest }) {
  return (
    <Icon type='check-circle' style={{color: marked && 'lightgreen'}} {...rest} />
  )
}
