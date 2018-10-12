import React from 'react'
import { Input, Icon, Button } from 'antd'
import ClickToEditInput from '../ClickToEditInput'

export default class EditTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      draft: props.title
    }
    this.inputRef = React.createRef()
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
          <Button type="primary" icon="check" />,
          <Button icon="close" onClick={() => this.setState({isEditing: false})} />
        ]}
      </div>
    )
  }

  handleStartEditing() {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      this.inputRef.current.focus()
    })
  }
}