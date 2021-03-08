import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

const receiveLike = like => {
  return {
    type: RECEIVE_LIKE,
    like
  }
}

const removeLike = id => {
  return {
    type: REMOVE_LIKE,
    id
  }
}

export const createLike = likeData => dispatch => {
  return APIUtil.createLike(likeData)
    .then(like => dispatch(receiveLike(like)))
}

export const deleteLike = likeId => dispatch => {
  return APIUtil.deleteLike(likeId)
    .then(_ => dispatch(removeLike(likeId)))
}