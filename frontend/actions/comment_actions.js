import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    comment
  }
}

export const createComment = comment => dispatch => {
  return APIUtil.createComment(comment)
    .then(comment => dispatch(receiveComment(comment)))
}