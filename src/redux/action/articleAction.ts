import { Dispatch } from "redux"
import { DELETE, GET, PATCH, POST } from "../../services/axios.method";
import { GET_ARTICLE } from "../../constants/apiConstants";
import { ACTION_TYPE } from "../actionType";
import { SETLOADING } from "./commonAction";

export const getAllArticles = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(SETLOADING(true))
        const res: any = await GET(GET_ARTICLE);

        if(res && res?.data && res?.data?.statusCode === 200) {
            dispatch({type: ACTION_TYPE.GET_ALL_ARTICLE, payload: res?.data?.data})
            dispatch(SETLOADING(false));
        }
    } catch (error) {
        console.log('Error in getting articles', error);
        dispatch(SETLOADING(false));
    }
}

export const createArticle = (articleData: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(SETLOADING(true))
        const res: any = await POST("/article", articleData);

        console.log('Checking res of create post', res);

        if(res && res?.data && res?.data?.statusCode === 200) {
            const updateArticleData = {...articleData, _id: res?.data?.data?.id, author: {_id: localStorage.getItem("profile_id")}}
            await dispatch({type: ACTION_TYPE.CREATE_ARTICLE, payload: updateArticleData});
            dispatch(SETLOADING(false))
        }
    } catch (error) {
        console.log('checking error in creating article', error);
        dispatch(SETLOADING(false))
        return null;
    }
}

export const updateArticle = (articleId: string, articleData: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(SETLOADING(true));

        const res: any = await PATCH(`/article?articleId=${articleId}`, articleData);

        if(res && res?.data && res?.data?.statusCode === 200) {
            dispatch({type: ACTION_TYPE.UPDATE_ARTICLE, payload: {articleId: articleId,articleData}});
            dispatch(SETLOADING(false));
        }
    } catch (error) {
        console.log("checking error in updating article", error);
        dispatch(SETLOADING(false));
        return null;
    }
}

export const deleteArticle = (articleId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(SETLOADING(true))
        const res: any = await DELETE(`/article?articleId=${articleId}`);

        if(res && res?.data && res?.data?.statusCode === 200) {
            dispatch({type: ACTION_TYPE.DELETE_ARTICLE, paylod: articleId})
            dispatch(SETLOADING(false));
        }
    } catch (error) {
        console.log('Checking error in deleting article', error);
        dispatch(SETLOADING(false));
        return null;
    }
}