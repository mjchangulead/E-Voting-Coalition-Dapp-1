import {
  SUBMIT_SHOWIDEA,
  CHANGE_SEARCHFIELD,
  REQUEST_USERS_PENDING,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAILED,
 } from './constants'


export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestUsers = () => (dispatch) => {
  dispatch({ type: REQUEST_USERS_PENDING })
    fetch('http://localhost:3000/profile/all',  {
    method: 'post',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(data => dispatch({ type: REQUEST_USERS_SUCCESS, payload: data }))
  .catch(error => dispatch({ type: REQUEST_USERS_FAILED, payload: error }))
}

export const submitShowIdea = (user) => ({
  type: SUBMIT_SHOWIDEA, 
  loginuser : user
})