import { Dispatch } from "redux";
import { SETLOADING } from "./commonAction";
import { POST } from "../../services/axios.method";
import { LOGIN_API, SIGNUP_API } from "../../constants/apiConstants";
import { ACTION_TYPE } from "../actionType";
import { jwtDecode } from "jwt-decode";

export const SignUp =  (signupData: any, callback: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(SETLOADING(true));

        const response: any = await POST(SIGNUP_API, signupData);

        console.log('Checking response', response);

        if(response && response?.data && response?.data?.status && response.data?.statusCode === 200) {
            // dispatch({type: ACTION_TYPE.AUTH, payload: })
            callback(true)
            dispatch(SETLOADING(true));
        }

        callback(false);
        dispatch(SETLOADING(false));
    } catch (error) {
        console.log('Checking error in signing up', error);
        return null;
    }
}

export const SignIn = ({email, password}: any, navigate: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(SETLOADING(true));
        const res: any = await POST(LOGIN_API, {email, password});

        console.log('Checking res of login', res);

        if(res && res?.data && res?.data?.statusCode === 200) {
            dispatch({type: ACTION_TYPE.AUTH, payload: res?.data?.data});
            const token = res?.data?.data;
            const decodedToken: any =  jwtDecode(token);
            console.log('checking decoded token', decodedToken);
            localStorage.setItem("token", res.data?.data);
            localStorage.setItem("profile_id", decodedToken?.user?.id);
            navigate("/home")
        }
    } catch (error) {
        console.log('Checking error in signin method', error);
        dispatch(SETLOADING(false));
        return null;
    }
}