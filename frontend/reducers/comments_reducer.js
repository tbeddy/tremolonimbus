import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment.id]: action.comment });
    case RECEIVE_TRACK:
      return Object.assign({}, state, action.comments);
    default:
      return state;
  }
}