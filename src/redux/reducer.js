import {CHANGE_USER_STATE_FALSE, CHANGE_USER_STATE_TRUE} from './types';

const initialState = {
    usernameState: false,
};

function userAddedName(state){
    return{
        ...state,
        usernameState: true
    };
}

function userRemovedName(state){
    return{
        ...state,
        usernameState: false
    };
}


function Reducer(state = initialState, action){
    switch(action.type){
        case CHANGE_USER_STATE_TRUE:
            return userAddedName(state);
        case CHANGE_USER_STATE_FALSE:
            return userRemovedName(state);
        default:
            return state;
    }
}

export default Reducer;