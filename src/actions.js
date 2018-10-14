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
      .then((e, r) => {
        if (e || !r.ok) {
          return e
        } else {
          dispatch(setSuccess(QUIZZES, r.body))
        }
      })
  }
}

export function getQuestions(quizID) {
  return dispatch => {
    return api.get(`/quizzes/${quizID}/questions`)
      .then((e, r) => {
        if (e || !r.ok) {
          return e
        } else {
          dispatch(setSuccess(QUESTIONS, r.body))
        }
      })
  }
}

export function createQuiz(data) {
  return dispatch => {
    return api.post('/quizzes')
      .then((e, r) => {
        if (e || !r.ok) {
          return e
        } else {
          dispatch(createSuccess(QUIZZES, r.body))
        }
      })
  }
}

export function createQuestion(quizID, data) {
  return dispatch => {
    return api.post(`/quizzes/${quizID}/questions`)
      .then((e, r) => {
        if (e || !r.ok) {
          return e
        } else {
          dispatch(createSuccess(QUESTIONS, r.body))
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

