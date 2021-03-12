export const selectCommentsforTrack = ({ comments, users }, trackId) => {
  if (!comments) return [];
  const trackComments = Object.values(comments).filter(
    ({ track_id }) => track_id == trackId);
  return trackComments.map(comment => {
    comment.user = users[comment.author_id];
    return comment;
  })
}

export const selectLikesforTrack = ({ likes, users }, trackId) => {
  if (!likes) return [];
  const trackLikes = Object.values(likes).filter(
    ({ track_id }) => track_id == trackId);
  return trackLikes.map(like => {
    like.user = users[like.liker_id];
    return like;
  })
}

export const isCurrentTrackLiked = (likes, trackId, currentUserId) => {
  if (!likes) return false;
  // Object.values(likes).forEach(({ id, track_id, liker_id }) => {
  //   if ((track_id === trackId) && (liker_id === currentUserId)) {
  //     return id;
  //   }
  // });
  for (let id in likes) {
    const { track_id, liker_id } = likes[id];
    if ((track_id === trackId) && (liker_id === currentUserId)) {
      return id;
    }
  }
  return null;
}

export const selectTracksforUser = ({ tracks }, userId) => {
  if (!tracks) return [];
  return Object.values(tracks).filter(
    ({ uploader_id }) => uploader_id == userId);
}

export const reduceTracks = (state, tracks) => {
  if (!tracks) return state;
  const newTracks = {};
  Object.values(tracks).forEach(track => {
    if (state[track.id]) track.url = state[track.id].url;
    newTracks[track.id] = track;
  });
  return Object.assign({}, state, newTracks);
}