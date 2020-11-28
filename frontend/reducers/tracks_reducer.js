import {
  RECEIVE_TRACKS,
  RECEIVE_TRACK,
  REMOVE_TRACK
} from '../actions/track_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      const newTracks = {};
      Object.values(action.tracks).forEach(track => {
        if (state[track.id]) track.url = state[track.id].url;
        newTracks[track.id] = track;
      });
      return newTracks;
      // return action.tracks;
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