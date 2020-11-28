import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRACKS } from '../actions/track_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_TRACKS:
      return Object.assign({}, state, action.users);
    default:
      return state;
  }
}