import request from 'superagent'
import { getUser } from './auth'

let host = (process.env.REACT_APP_BACKEND || 'http://localhost:5000') + '/api'

function headers() {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': (getUser() || {}).token
  }
}

export function get(path) {
  return request.get(host + path)
    .set(headers())
}

export function post(path) {
  return request.post(host + path)
    .set(headers())
}

export function put(path) {
  return request.put(host + path)
    .set(headers())
}

export function del(path) {
  return request('DELETE', host + path)
    .set(headers())
}