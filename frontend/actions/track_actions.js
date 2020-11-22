import * as APIUtil from '../util/track_api_util';

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";

const receiveTracks = tracks => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  }
}

export const fetchTracks = () => dispatch => {
  return APIUtil.fetchTracks()
    .then(tracks => dispatch(receiveTracks(tracks)))
}