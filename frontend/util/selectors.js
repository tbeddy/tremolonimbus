export const selectCommentsforTrack = ({ comments, users }, trackId) => {
  const trackComments = Object.values(comments).filter(
    ({ track_id }) => track_id == trackId);
  return trackComments.map(comment => {
    comment.user = users[comment.author_id];
    return comment;
  })
}