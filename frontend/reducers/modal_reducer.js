import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal_actions';

const defaultState = {
  type: null,
  entity: null
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return defaultState;
    default:
      return state;
  }
}