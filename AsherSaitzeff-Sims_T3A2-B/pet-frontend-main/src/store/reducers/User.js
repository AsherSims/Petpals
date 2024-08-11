import { SET_USER } from "../ActionTypes";

const init = {
    user: null 
}

const User = (state = init, action) => {
    switch (action.type) {
        case SET_USER:
            console.log(action.payload.user); 
            return {
                ...state,
                user: action.payload.user 
            };
        default:
            return state;
    }
}

export default User;
