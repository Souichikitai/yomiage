import {CHANGE_USER_STATE_FALSE, CHANGE_USER_STATE_TRUE, USER_PRESSED_TRUE, USER_PRESSED_FALSE} from './types';

function chageUserstatetrue() {
    return {
        type: CHANGE_USER_STATE_TRUE
    };
}

function chageUserstatefalse() {
    return {
        type: CHANGE_USER_STATE_FALSE
    };
}

// function userPressedStart(){
//     return {
//         type: USER_PRESSED_TRUE
//     };
// }

// function usernotPressedStart(){
//     return {
//         type: USER_PRESSED_FALSE
//     };
// }


const actionCreators = {
    chageUserstatetrue,
    chageUserstatefalse,
    // userPressedStart,
    // usernotPressedStart
};

export {actionCreators};