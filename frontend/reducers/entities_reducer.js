import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import tracksReducer from "./tracks_reducer";
import commentsReducer from "./comments_reducer";
import likesReducer from "./likes_reducer";

export default combineReducers({
  users: usersReducer,
  tracks: tracksReducer,
  comments: commentsReducer,
  likes: likesReducer
});