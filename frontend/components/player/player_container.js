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
import { openModal } from '../../actions/modal_actions';
import { selectCommentsforTrack } from '../../util/selectors';

const mStP = ({ session, audio, entities }, ownProps) => {
  const uploader = entities.users[ownProps.uploader_id];
  return {
    isCurrentUsersTrack: session.id === ownProps.uploader_id,
    currentTrackId: audio.id,
    isCurrentTrack: ownProps.id === audio.id,
    playing: audio.playing && ownProps.id === audio.id,
    currentTime: audio.currentTime,
    uploader,
    comments: selectCommentsforTrack(entities, ownProps.id),
    image: !!ownProps.image ? ownProps.image : uploader.profileImage
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId)),
    deleteTrack: trackId => dispatch(deleteTrack(trackId)),
    clearTrack: () => dispatch(clearTrack()),
    updateTrack: (track, id) => dispatch(updateTrack(track, id)),
    openModal: (modal, entity) => dispatch(openModal(modal, entity))
  }
}

export default connect(mStP, mDtP)(Player);