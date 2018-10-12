import React from 'react'
import { connect } from 'react-redux'
import styles from './style.module.css'

function PageLayout({ mode, title, actions, children }) {
  return (
    <div>
      <div>
        {mode !== 'home' && 'Back to all quizzes'}
      </div>
      <div className={styles.header}>
        <h2>{title}</h2>
        {actions}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    mode: state.mode,
  }
}

export default connect(mapStateToProps)(PageLayout)