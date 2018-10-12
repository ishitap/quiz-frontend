import { ACTIVE_QUIZ, MODE, QUIZZES, QUESTIONS } from './reducer'
import { SET_DATA, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './reducer'

export function goHome(index) {
  return {
    data: {
      [MODE]: 'home'
    }
  }
}

export function startEditingQuiz(index) {
  return {
    type: SET_DATA,
    data: {
      [ACTIVE_QUIZ]: index,
      [MODE]: 'edit'
    }
  }
}

export function startPlayingQuiz(index) {
  return {
    type: SET_DATA,
    data: {
      [ACTIVE_QUIZ]: index,
      [MODE]: 'edit'
    }
  }
}

export function setLoading(value) {

}

export function createQuiz(data) {
  return {
    name: QUIZZES,
    type: ADD_ITEM,
    data: data
  }
}

export function deleteQuiz(index) {
  return dispatch => {
    //return api.delete()
  }
}