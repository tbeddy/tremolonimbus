import {
  RECEIVE_TRACKS,
  RECEIVE_TRACK,
  REMOVE_TRACK
} from '../actions/track_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      return action.tracks;
    case RECEIVE_TRACK:
      return Object.assign({}, state, {[action.track.id]: action.track});
    case REMOVE_TRACK:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}