import  {applyMiddleware, createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
import Reducer from './reducer';
// import PressReducer from './pressreducer';


// const allReducer = combineReducers({
//     usernameState: Reducer,
//     userisPressing: PressReducer
// })

const store = createStore(Reducer)

export default store