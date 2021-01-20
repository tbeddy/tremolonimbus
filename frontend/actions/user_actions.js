import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = ({ tracks, user }) => {
  return {
    type: RECEIVE_USER,
    tracks,
    user
  }
}

export const fetchUser = userId => dispatch => {
  return APIUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)))
}

export const updateUser = (user, id) => dispatch => {
  return APIUtil.updateUser(user, id)
    .then(user => dispatch(receiveUser(user)))
}