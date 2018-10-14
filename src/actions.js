import { QUIZZES, QUESTIONS, USER } from './reducer'
import { SET_DATA, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from './reducer'
import * as api from './api'
import * as auth from './auth'

export function login(data) {
  return dispatch => {
    return api.post('/users/login')
      .set('Authorization', null)
      .send(data)
      .then(res => {
        if (!res.ok) {
          return res
        } else {
          auth.setUser(res.body)
          dispatch(setSuccess(USER, res.body))
        }
      })
  }
}

export function getQuizzes(data) {
  return dispatch => {
    return api.get('/quizzes')
      .then(res => {
        if (!res.ok) {
          return res
        } else {
          return dispatch(setSuccess(QUIZZES, res.body))
        }
      })
  }
}

export function getQuestions(quizID) {
  return dispatch => {
    return api.get(`/quizzes/${quizID}/questions`)
      .then(res => {
        if (!res.ok) {
          return res
        } else {
          return dispatch(setSuccess(QUESTIONS, res.body.questions))
        }
      })
  }
}

export function createQuiz(data) {
  return dispatch => {
    return api.post('/quizzes')
      .send(data)
      .then(res => {
        if (!res.ok) {
          return null
        } else {
          return dispatch(createSuccess(QUIZZES, res.body))
        }
      })
  }
}

export function createQuestion(quizID, data) {
  return dispatch => {
    return api.post(`/quizzes/${quizID}/questions`)
      .send(data)
      .then(res => {
        if (!res.ok) {
          return null
        } else {
          // ugh super annoying it returns the whole quiz object 
          // so now we have to get the question we just created out
          let q = res.body.questions
          return dispatch(createSuccess(QUESTIONS, q[q.length-1]))
        }
      })
  }
}

export function updateQuestion(quizID, questionID, index, data) {
  return dispatch => {
    return api.put(`/quizzes/${quizID}/questions/${questionID}`)
      .send(data)
      .then(res => {
        if (!res.ok) {
          return null
        } else {
          return dispatch(updateSuccess(QUESTIONS, index, data))
        }
      })
  }
}


// --- HELPERS 

function setSuccess(name, data) {
  return {
    name: name,
    type: SET_DATA,
    data: data
  }
}

function createSuccess(name, data) {
  return {
    name: name,
    type: ADD_ITEM, 
    data: data
  }
}

function updateSuccess(name, index, data) {
  return {
    name: name,
    type: EDIT_ITEM,
    index: index,
    data: data
  }
}

function deleteSuccess(name, index) {
  return {
    name: name,
    type: DELETE_ITEM,
    index: index
  }
}

