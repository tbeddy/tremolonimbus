import { RECEIVE_TRACKS } from '../actions/track_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      return action.tracks;
    default:
      return state;
  }
}