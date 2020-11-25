import { connect } from 'react-redux';
import TrackPagePlayer from './track_page_player';
import {
  playTrack,
  pauseTrack
} from '../../actions/audio_actions';

const mStP = ({ audio }, ownProps) => {
  return {
    currentTrackId: audio.id,
    playing: audio.playing && ownProps.id === audio.id,
    currentTime: audio.currentTime
  }
};

const mDtP = dispatch => {
  return {
    playTrack: trackId => dispatch(playTrack(trackId)),
    pauseTrack: trackId => dispatch(pauseTrack(trackId))
  }
}

export default connect(mStP, mDtP)(TrackPagePlayer);