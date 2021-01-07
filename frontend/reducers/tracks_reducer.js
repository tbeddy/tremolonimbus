import {
  RECEIVE_TRACKS,
  RECEIVE_TRACK,
  REMOVE_TRACK
} from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newTracks = {};
  switch (action.type) {
    case RECEIVE_TRACKS:
      Object.values(action.tracks).forEach(track => {
        if (state[track.id]) track.url = state[track.id].url;
        newTracks[track.id] = track;
      });
      return newTracks;
    case RECEIVE_TRACK:
      const { track } = action;
      if (state[track.id]) track.url = state[track.id].url;
      return Object.assign({}, state, {[track.id]: track});
    case REMOVE_TRACK:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_USER:
      Object.values(action.tracks).forEach(track => {
        if (state[track.id]) track.url = state[track.id].url;
        newTracks[track.id] = track;
      });
      return newTracks;
    default:
      return state;
  }
}