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
        },
        articleUpdateSuccessfully: (state, action) => {
            state.entities[
                state.entities.findIndex((a) => a._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { reducer: articlesReducer, actions } = articlesSlice;
const {
    articlesRequested,
    articlesReceived,
    articlesRequestFailed,
    articleCreated,
    articleRemoved,
    articleUpdateSuccessfully
} = actions;

const addArticleRequested = createAction("articles/addArticleRequested");
const removeArticleRequested = createAction("articles/removeArticleRequested");
const articleUpdateFailed = createAction("articles/articleUpdateFailed");
const articleUpdateRequested = createAction("articles/articleUpdateRequested");

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

export const createArticle =
    ({ payload, navigate, redirect }) =>
    async (dispatch) => {
        dispatch(addArticleRequested());
        try {
            const { content } = await articleService.createArticle(payload);
            navigate(`/articles/user/${redirect}`);
            dispatch(articleCreated(content));
        } catch (error) {
            dispatch(articlesRequestFailed(error.message));
        }
    };

export const updateArticle =
    ({ payload, articleId, navigate }) =>
    async (dispatch) => {
        dispatch(articleUpdateRequested());
        try {
            const { content } = await articleService.update({
                payload,
                articleId
            });
            dispatch(articleUpdateSuccessfully(content));
            if (navigate) {
                navigate("/");
            }
        } catch (error) {
            dispatch(articleUpdateFailed(error.message));
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

export const loadArticleById = (id) => (state) => {
    if (state.articles.entities) {
        return state.articles.entities.find((a) => a._id === id);
    }
};
export const getArticles = () => (state) => state.articles.entities;
export const getArticlesLoadingStatus = () => (state) =>
    state.articles.isLoading;

export default articlesReducer;
