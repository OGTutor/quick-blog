import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentUpdateSuccessfully: (state, action) => {
            state.entities[
                state.entities.findIndex((a) => a._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved,
    commentUpdateSuccessfully
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");
const updateCommentFailed = createAction("comments/updateCommentFailed");
const updateCommentRequested = createAction("comments/updateCommentRequested");

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(pageId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(addCommentRequested());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (!content) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const updateComment =
    ({ payload, commentId }) =>
    async (dispatch) => {
        dispatch(updateCommentRequested());
        try {
            const { content } = await commentService.update({
                payload,
                commentId
            });
            dispatch(commentUpdateSuccessfully(content));
        } catch (error) {
            dispatch(updateCommentFailed(error.message));
        }
    };

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
