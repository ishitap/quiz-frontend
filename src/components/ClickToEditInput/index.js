import React from 'react'
import { Input, Icon, Button } from 'antd'
import styles from './styles.module.css'

export default class ClickToEditInput extends React.Component {
    render() {
    const { isEditing, onToggle, value, inputRef, ...rest } = this.props
    return (
      <div className={styles.titleContainer}>
        <Input 
          className={!isEditing && styles.titleInput}
          disabled={!isEditing}
          value={value}
          ref={inputRef}
          {...rest}
        />
        {this.renderInvisibleText()}
      </div>
    )
  }

  renderInvisibleText() {
    const { isEditing, onToggle, value, hint } = this.props
    if(isEditing) {
      return false
    }
    return (
      <div className={styles.invisibleText} onClick={onToggle}> 
        <span>{value}</span>
        <span className={styles.invisibleTextHelper}>{hint}</span>
        <Icon className={styles.icon} type="edit"/>
      </div>
    )
  }
}