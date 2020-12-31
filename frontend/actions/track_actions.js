import * as APIUtil from '../util/track_api_util';

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";

const receiveTracks = ({ tracks, users }) => {
  return {
    type: RECEIVE_TRACKS,
    tracks,
    users
  }
}

const receiveTrack = ({ track, user }) => {
  return {
    type: RECEIVE_TRACK,
    track,
    user
  }
}

const removeTrack = ({ id }) => {
  return {
    type: REMOVE_TRACK,
    id
  }
}

export const fetchTracks = () => dispatch => {
  return APIUtil.fetchTracks()
    .then(tracks => dispatch(receiveTracks(tracks)))
}

export const fetchTrack = trackId => dispatch => {
  return APIUtil.fetchTrack(trackId)
    .then(track => dispatch(receiveTrack(track)))
}

export const fetchSplashTracks = () => dispatch => {
  return APIUtil.fetchSplashTracks()
    .then(tracks => dispatch(receiveTracks(tracks)))
}

export const createTrack = track => dispatch => {
  return APIUtil.createTrack(track)
    .then(track => dispatch(receiveTrack(track)))
}

export const deleteTrack = trackId => dispatch => {
  return APIUtil.deleteTrack(trackId)
    .then(trackId => dispatch(removeTrack(trackId)))
}

export const updateTrack = track => dispatch => {
  return APIUtil.updateTrack(track)
    .then(track => dispatch(receiveTrack(track)))
}