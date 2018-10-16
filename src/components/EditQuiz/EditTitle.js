import React from 'react'
import { Button } from 'antd'
import ClickToEditInput from '../ClickToEditInput'

export default class EditTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      draft: props.title
    }
    this.inputRef = React.createRef()
    this.handleStopEditing = this.handleStopEditing.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
  }

  render() {
    const { isEditing, draft } = this.state
    return (
      <div style={{display: 'flex'}}>
        <ClickToEditInput 
          isEditing={isEditing}
          hint="Rename"
          value={draft}
          onChange={e => this.setState({ draft: e.target.value})}
          onToggle={this.handleStartEditing.bind(this)}
          inputRef={this.inputRef}
        />
        {isEditing && [
          <Button 
            type="primary" 
            icon="check" 
            onClick={this.handleUpdateTitle} 
            key="edit-confirm"
            disabled={!draft || !draft.length}
          />,
          <Button icon="close" onClick={this.handleStopEditing} key="edit-cancel" />
        ]}
      </div>
    )
  }

  handleStartEditing() {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      this.inputRef.current.focus()
    })
  }

  handleStopEditing() {
    this.setState({ isEditing: false })
  }

  handleUpdateTitle() {
    this.props.onUpdateTitle({ title: this.state.draft })
      .then(res => {
        if (res) {
          this.handleStopEditing()
        }
      })
  }
}