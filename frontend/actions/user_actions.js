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