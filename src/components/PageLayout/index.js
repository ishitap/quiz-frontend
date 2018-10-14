import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './style.module.css'

function PageLayout({ mode, title, actions, home, children }) {
  return (
    <div>
      <div>
        {!home && <Link to='/'>Back to all quizzes</Link>}
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