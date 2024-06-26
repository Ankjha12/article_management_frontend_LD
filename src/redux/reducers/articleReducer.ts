import { ACTION_TYPE } from "../actionType";

const initialState = {
  articles: [],
};

const articleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.GET_ALL_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    case ACTION_TYPE.CREATE_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    case ACTION_TYPE.UPDATE_ARTICLE:
      const articleId = action.payload.articleId;
      const updatedArticle = action.payload.articleData;

      const newUpdatedArticles = state.articles.map((article: any) =>
        article?._id === articleId ? { ...article, ...updatedArticle } : article
      );
      console.log('Checking newUpdatedArticle', newUpdatedArticles, articleId)
      return {
        ...state,
        articles: newUpdatedArticles,
      };
      break;
    case ACTION_TYPE.DELETE_ARTICLE:
      return {
        ...state,
        articles: state?.articles?.filter((article: any) => article?._id !== action.payload),
      };
    default:
      return state;
  }
};

export default articleReducer;
