import { connect } from 'react-redux';
import Player from './player';
import {
  playTrack,
  pauseTrack,
  clearTrack
} from '../../actions/audio_actions';
import {
  deleteTrack,
  updateTrack
} from '../../actions/track_actions';
import {
  createLike,
  deleteLike
} from '../../actions/like_actions';
import { openModal } from '../../actions/modal_actions';
import {
  selectCommentsforTrack,
  selectLikesforTrack
} from '../../util/selectors';

const mStP = ({ session, audio, entities }, { id, uploader_id, image }) => {
  const uploader = entities.users[uploader_id];
  const likes = selectLikesforTrack(entities, id);
  return {
    currentUserId: session.id,
    isCurrentUsersTrack: session.id === uploader_id,
    currentTrackId: audio.id,
    isCurrentTrack: id === audio.id,
    playing: audio.playing && id === audio.id,
    currentTime: audio.currentTime,
    uploader,
    likes,
    isLiked: likes.map(like => like.liker_id).indexOf(session.id) != -1,
    comments: selectCommentsforTrack(entities, id),
    image: image ? image : (uploader ? uploader.profileImage : null)
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    deleteTrack: trackId => dispatch(deleteTrack(trackId)),
    clearTrack: () => dispatch(clearTrack()),
    updateTrack: (track, id) => dispatch(updateTrack(track, id)),
    createLike: likeData => dispatch(createLike(likeData)),
    deleteLike: likeId => dispatch(deleteLike(likeId)),
    openModal: (modal, entity) => dispatch(openModal(modal, entity))
  }
}

export default connect(mStP, mDtP)(Player);