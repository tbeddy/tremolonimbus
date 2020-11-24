import {
  CLEAR_TRACK,
  PLAY_TRACK,
  PAUSE_TRACK,
  SEEK_TRACK,
  CHANGE_VOLUME
} from '../actions/audio_actions';

const initialState = {
  id: null,
  playing: false,
  currentTime: 0
}

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case CLEAR_TRACK:
      return initialState;
    case PLAY_TRACK:
      return Object.assign({}, state, { id: action.trackId, playing: true });
    case PAUSE_TRACK:
      return Object.assign({}, state, { id: action.trackId, playing: false });
    case SEEK_TRACK:
      return Object.assign({}, state, { currentTime: action.time });
    case CHANGE_VOLUME:
      return Object.assign({}, state, { volume: action.volume });
    default:
      return state;
  }
}