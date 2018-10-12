import React from 'react'
import ReactDOM from 'react-dom'
import { List } from 'antd'

export default function ListForm({ addButton, maxItems, minItems, data, ...rest }) {
  let footer = maxItems && data.length <= maxItems && data.length >= minItems && addButton
  return (
    <List data={data} {...rest} footer={footer}/>
  )
}
