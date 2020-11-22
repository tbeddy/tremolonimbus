import * as APIUtil from '../util/track_api_util';

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";

const receiveTracks = tracks => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  }
}

const receiveTrack = track => {
  return {
    type: RECEIVE_TRACK,
    track
  }
}

export const fetchTracks = () => dispatch => {
  return APIUtil.fetchTracks()
    .then(tracks => dispatch(receiveTracks(tracks)))
}

export const createTrack = track => dispatch => {
  return APIUtil.createTrack(track)
    .then(track => dispatch(receiveTrack(track)))
}