import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    comment
  }
}

const removeComment = id => {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export const createComment = commentData => dispatch => {
  return APIUtil.createComment(commentData)
    .then(comment => dispatch(receiveComment(comment)))
}

export const deleteComment = commentId => dispatch => {
  return APIUtil.deleteComment(commentId)
    .then(_ => dispatch(removeComment(commentId)))
}