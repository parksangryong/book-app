import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
// 다른 리듀서들을 추가할 수 있습니다.

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  // 다른 리듀서들을 추가할 수 있습니다.
});

export default rootReducer;
