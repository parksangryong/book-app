import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // redux 사용시 추가
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk)); // reducers/index.js 사용

export default store;
