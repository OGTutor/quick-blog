import { createAction, createSlice } from "@reduxjs/toolkit";
import articleService from "../services/article.service";

const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        articlesRequested: (state) => {
            state.isLoading = true;
        },
        articlesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        articlesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        articleCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        articleRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (a) => a._id !== action.payload
            );
        }
    }
});

const { reducer: articlesReducer, actions } = articlesSlice;
const {
    articlesRequested,
    articlesReceived,
    articlesRequestFailed,
    articleCreated,
    articleRemoved
} = actions;

const addArticleRequested = createAction("articles/addArticleRequested");
const removeArticleRequested = createAction("articles/removeArticleRequested");

export const loadArticlesList = () => async (dispatch) => {
    dispatch(articlesRequested());
    try {
        const { content } = await articleService.getArticles();
        dispatch(articlesReceived(content));
    } catch (error) {
        dispatch(articlesRequestFailed(error.message));
    }
};

export const loadArticlesForCurrentUser = (userId) => async (dispatch) => {
    dispatch(articlesRequested());
    try {
        const { content } = await articleService.getArticlesForUser(userId);
        dispatch(articlesReceived(content));
    } catch (error) {
        dispatch(articlesRequestFailed(error.message));
    }
};

export const createArticle = (payload) => async (dispatch) => {
    dispatch(addArticleRequested());
    try {
        const { content } = await articleService.createArticle(payload);
        dispatch(articleCreated(content));
    } catch (error) {
        dispatch(articlesRequestFailed(error.message));
    }
};

export const removeArticle = (articleId) => async (dispatch) => {
    dispatch(removeArticleRequested());
    try {
        const { content } = await articleService.removeArticle(articleId);
        if (!content) {
            dispatch(articleRemoved(articleId));
        }
    } catch (error) {
        dispatch(articlesRequestFailed(error.message));
    }
};

export const getArticles = () => (state) => state.articles.entities;
export const getArticlesLoadingStatus = () => (state) =>
    state.articles.isLoading;

export default articlesReducer;
