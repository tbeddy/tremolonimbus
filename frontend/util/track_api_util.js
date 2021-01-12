export const fetchTracks = () => {
  return $.ajax({
    method: "GET",
    url: "/api/tracks"
  })
}

export const fetchTrack = trackId => {
  return $.ajax({
    method: "GET",
    url: `/api/tracks/${trackId}`
  })
}

export const fetchSplashTracks = () => {
  return $.ajax({
    method: "GET",
    url: "/api/tracks",
    data: {splash: true}
  })
}

export const createTrack = track => {
  return $.ajax({
    method: "POST",
    url: "/api/tracks",
    data: track,
    contentType: false,
    processData: false
  })
}

export const deleteTrack = trackId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/tracks/${trackId}`
  })
}

export const updateTrack = (track, id) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/tracks/${id}`,
    data: track,
    contentType: false,
    processData: false
  })
}