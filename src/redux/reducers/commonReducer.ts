import { ACTION_TYPE } from "../actionType";

const initialState = {
    isLoading: false
};

const commonReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPE.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default commonReducer;