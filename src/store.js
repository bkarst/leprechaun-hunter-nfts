// import { configureStore } from '@reduxjs/toolkit'


// export default configureStore({
//   reducer: {
//     mainReducer: mainReducer
//   }

// })



import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import mainReducer from '../src/reducers/mainReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

// const middleware2 = applyMiddleware(promise(), thunk, logger());

const initialState = {
  fetching: false,
  fetched: false,
  nextURL: null,
  error: null, 
};

const reducer = combineReducers({
  mainReducer,
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware( promise, thunk, )
));

// console.log(middleware);

export default store;