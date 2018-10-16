import React from 'react'

export default function LinkStyleButton({ style, children, ...rest}) {
  return <span style={{...style, color: '#1890ff'}} {...rest}>{children}</span>
}