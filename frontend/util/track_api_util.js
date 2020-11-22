export const fetchTracks = () => {
  return $.ajax({
    method: "GET",
    url: "/api/tracks"
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