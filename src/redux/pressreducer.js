import {USER_PRESSED_TRUE, USER_PRESSED_FALSE} from './types';

const initialState = {
    userisPressing: false,
};

function userPressed(state){
    return{
        ...state,
        userisPressing: true
    }
}

function usernotPressed(state){
    return{
        ...state,
        userisPressing: false
    }
}

function PressReducer(state = initialState, action){
    switch(action.type){
        case USER_PRESSED_TRUE:
            return userPressed(state);
        case USER_PRESSED_FALSE:
            return usernotPressed(state);
        default:
            return state;
    }
}

export default PressReducer;