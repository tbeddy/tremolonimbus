export const CLEAR_TRACK = "CLEAR_TRACK";
export const PLAY_TRACK = "PLAY_TRACK";
export const PAUSE_TRACK = "PAUSE_TRACK";
export const SEEK_TRACK = "SEEK_TRACK";
export const CHANGE_VOLUME = "CHANGE_VOLUME";
export const TOGGLE_LOOP = "TOGGLE_LOOP";
export const TOGGLE_MUTE = "TOGGLE_MUTE";

export const clearTrack = () => {
  return {
    type: CLEAR_TRACK
  }
}

export const playTrack = trackId => {
  return {
    type: PLAY_TRACK,
    trackId
  }
}

export const pauseTrack = trackId => {
  return {
    type: PAUSE_TRACK,
    trackId
  }
}

export const seekTrack = time => {
  return {
    type: SEEK_TRACK,
    time
  }
}

export const changeVolume = volume => {
  return {
    type: CHANGE_VOLUME,
    volume
  }
}

export const toggleLoop = () => {
  return {
    type: TOGGLE_LOOP
  }
}

export const toggleMute = () => {
  return {
    type: TOGGLE_MUTE
  }
}