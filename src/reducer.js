import update from 'immutability-helper'
import { getUser } from './auth'

// reducer key names (top-level fields of the reducer):
// could use combine reducer but whatever
export const USER = 'user'
export const QUIZZES = 'quizzes'
export const QUESTIONS = 'questions'

// action types (what can u do with each name?):
export const SET_DATA = 'SET_DATA'
export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'

const defaultState = {
  user: getUser(),
  quizzes: [],
  questions: [],
}

export function quizApp(state = defaultState, action) {
  switch(action.type) {
    case SET_DATA: 
      return setData(state, action)
    case ADD_ITEM: 
      return addItem(state, action)
    case DELETE_ITEM:
      return deleteItem(state, action)
    case EDIT_ITEM:
      return editItem(state, action)
    default:
      return state
  }
}


function setData(state, action) {
  let ns = update(state, {
    $merge: { [action.name]: action.data }
  })
  console.log(ns)
  return ns
}

function addItem(state, action) {
  return update(state, {
    [action.name]: {
      $push: [action.data]
    }
  })
}

function deleteItem(state, action) {
  console.log(state.questions)
  return update(state, {
    [action.name]: {
      $splice: [[action.index, 1]]
    }
  })
}

function editItem(state, action) {
  return update(state, {
    [action.name]: {
      [action.index]: {
        $merge: action.data
      }
    }
  })
}