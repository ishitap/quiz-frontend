import jwt_decode from 'jwt-decode'

const USER_KEY = 'user'

export function setUser(json) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(json))
}

export function getUser() {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export function shouldLogin(user) {
  try {
    let unix = Math.round(+new Date()/1000);
    let jwt = user.token
    return (!jwt || (jwt_decode(jwt).exp <= unix))
  } catch(e) {
    return true
  }
}
