import React from 'react'
import ReactDOM from 'react-dom'

export default class PlayQuiz extends React.Component {
  constructor(props) {
    this.state = {
      currentQuestionIndex: 0,
      shouldShowReview: false
    }
  }
  render() {
    return false
    // let { currentQuestion, shouldShowReview } = this.state
    // return (
    //   <div>
    //     <PlayQuestion {...currentQuestion} />
    //     <QuizReviewModal visible={shouldShowReview}/>
    //   </div> 
    // )
  }
}


/*

redux state:

quizzes: {} // 

fetchquizzes
fetchquestions(quiz_id)
createquiz
deletequiz(quiz_id)
editquiz(quiz_id)
editquestion(quiz_id, question_id)
deletequestion(quiz_id, question_id)
addquestion(quiz_id)

updateQuizzes(action) {
  
}

fetchQuestions(action, state) {
  updateQuestions(state, action.quiz_id, { 
    [index]: {
      $set: [action.data]
    } 
  })
}

updateQuestions

login
logout

fetchQuestions(action, state) {
  let ns = update(state, {
    [action.quiz_id]: {
      questions: {
        $set: action.data
      }
    }
  })
}

fetchQuizzes(action, state) {
  let ns = update(state, {
    $set: action.data
  })
}

createQuiz(action, state) {
  let ns = update(state, {
    $push: [action.data]
  })
}

deleteQuiz(action, state) {
  let ns = update(state, {
    $splice: [[index, 1]]
  })
}

*/

