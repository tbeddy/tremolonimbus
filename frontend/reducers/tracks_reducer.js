import {
  RECEIVE_TRACKS,
  RECEIVE_TRACK,
  REMOVE_TRACK
} from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { reduceTracks } from '../util/selectors';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      return reduceTracks(state, action.tracks);
    case RECEIVE_TRACK:
      const { track } = action;
      if (state[track.id]) track.url = state[track.id].url;
      return Object.assign({}, state, {[track.id]: track});
    case REMOVE_TRACK:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_USER:
      return reduceTracks(state, action.tracks);
    default:
      return state;
  }
}