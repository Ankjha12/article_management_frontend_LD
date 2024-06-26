import { Dispatch } from "redux"
import { ACTION_TYPE } from "../actionType";
export const SETLOADING = (loadingState: boolean) => async (dispatch: Dispatch<any>) => {
    try {
        console.log('Checking loading state', loadingState)
        dispatch({type: ACTION_TYPE.SET_LOADING, payload: loadingState})
    } catch (error) {
        console.log("error in diapatching loading state", error);
        dispatch({type: ACTION_TYPE.SET_LOADING, payload: false})
    }

}