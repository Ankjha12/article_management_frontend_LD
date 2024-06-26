import { ACTION_TYPE } from "../actionType";

const initialState: any = {
    authData: {}
}

export const authReducer = async (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.AUTH:
        return {
            ...state,
            authData: action.payload
        }
  
    default:
        break;
  }
}