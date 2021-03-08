import {
  RECEIVE_LIKE,
  REMOVE_LIKE
} from '../actions/like_actions';
import {
  RECEIVE_TRACK,
  RECEIVE_TRACKS
} from '../actions/track_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKE:
      return Object.assign({}, state, { [action.like.id]: action.like });
    case REMOVE_LIKE:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_TRACK:
      return Object.assign({}, state, action.likes);
    case RECEIVE_TRACKS:
      return Object.assign({}, state, action.likes);
    default:
      return state;
  }
}