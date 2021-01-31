import {
  ON_CHANGE_USERID,
  ON_CHANGE_PASSWORD,
  SET_TOKEN,
  UPDATE_MSG,
  SET_STATUS,
  SET_NAME,
  SET_REMEMBER
} from './constants'
import post from '../../../lib/post'
import get from "../../../lib/get";
import { sendToken } from "../../../lib/ws";

const setUserNameAction = value => ({
  type: SET_NAME,
  value
});

const updateStatusMessage = value => ({
  type: UPDATE_MSG,
  value
});

export const setTokenAction = (value) => ({
  type: SET_TOKEN,
  value
});

export const setStatusAction = (value) => ({
  type: SET_STATUS,
  value
});

export const onUserIdChangeAction = (value) => ({
  type: ON_CHANGE_USERID,
  value
});

export const onPasswordChangeAction = (value) => ({
  type: ON_CHANGE_PASSWORD,
  value
});

export const setRemember = (value) => ({
  type: SET_REMEMBER,
  value
})

const getUsernameAsyncAction = (token) => {
  return dispatch => {
    new Promise(resolve => {
      let ret = get('http://localhost:7001/users/info', token);
      resolve(ret)
    })
      .then(ret => {
        dispatch(setUserNameAction(ret.name));
        window.localStorage.setItem('username', ret.name);
        sendToken(JSON.stringify({
          username: ret.name,
          token
        }))
      })
      .catch(err => {
        throw new Error(err)
      })
  }
};

export const loginAsyncAction = (userId, password) => {
  return dispatch => {
    let data = {
      username: userId,
      password
    };
    new Promise(resolve => {
      let ret = post('http://localhost:7001/users/login', data, '');
      resolve(ret)
    })
      .then(ret => {
        console.log(ret)
        dispatch(setStatusAction(ret.status));
        if(ret.status === 1) {
          window.localStorage.setItem('token', ret.token);
          window.localStorage.setItem('status', ret.status);
          dispatch(getUsernameAsyncAction(ret.token));
          dispatch(setTokenAction(ret.token));
          dispatch(updateStatusMessage(ret.message));
        } else {
          dispatch(updateStatusMessage(ret.message));
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
};