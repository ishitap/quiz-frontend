import React from 'react'
import { List, Icon, Input } from 'antd'
import LinkStyleButton from '../LinkStyleButton'
import styles from './styles.module.css'

/*
Props:
- options: list of options to display
- correct: the one that should be displayed with a green check mark
- onMarkCorrect & other handlers
- if onChange, onAdd, and onDelete are provided, the editable version of this list is shown
- otherwise, the static version of this list is shown
*/

export default function QuestionOptions({ options, correct, onMarkCorrect, onChange, onAdd, onDelete }) {
  const renderOption = (e, i) => <QuestionOption
    item={e}
    isCorrect={correct === i}
    onMarkCorrect={() => onMarkCorrect(i)}
    onChange={onChange && (e => onChange(i, e.target.value))}
    onDelete={onDelete && (() => onDelete && onDelete(i))}
  />

  const addText = `Add an${options && options.length ? 'other' : ''} option`
  return (
    <div>
      { options && options.length ? <List
        size="small"
        split={false}
        dataSource={options}
        renderItem={renderOption}
      /> : false }
      { onAdd && <LinkStyleButton onClick={onAdd}>{addText}</LinkStyleButton> }
    </div>
  )
}

function QuestionOption({ item, isCorrect, onMarkCorrect, onChange, onDelete }) {
  return (
    <List.Item key={item.id} className={styles.list}>
      <CorrectOptionMarker marked={isCorrect} onClick={onMarkCorrect} />
      { onChange ? 
        <Input size="small" value={item} onChange={onChange}/> :
        <span>{item}</span>
      }
      <div className={styles.deleteIconArea}>
        { onDelete && <Icon type="delete" onClick={onDelete}/> }
      </div>
    </List.Item>
  )
}

function CorrectOptionMarker({ marked, ...rest }) {
  return (
    <Icon type='check-circle' theme={marked && 'filled'} className={[styles.check, marked && styles.marked].join(' ')} {...rest} />
  )
}