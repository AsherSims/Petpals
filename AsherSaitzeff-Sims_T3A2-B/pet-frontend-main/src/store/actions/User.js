import { SET_USER } from "../ActionTypes";

export const setUser = data => dispatch => {
    dispatch({
        type: SET_USER,
        payload: data
    })
}