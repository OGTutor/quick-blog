import { createAction, createSlice } from "@reduxjs/toolkit";
import replyService from "../services/reply.service";

const repliesSlice = createSlice({
    name: "replies",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        repliesRequested: (state) => {
            state.isLoading = true;
        },
        repliesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        repliesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        replyCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        replyRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        replyUpdateSuccessfully: (state, action) => {
            state.entities[
                state.entities.findIndex((a) => a._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { reducer: repliesReducer, actions } = repliesSlice;
const {
    repliesRequested,
    repliesReceived,
    repliesRequestFailed,
    replyCreated,
    replyRemoved,
    replyUpdateSuccessfully
} = actions;

const addReplyRequested = createAction("replies/addReplyRequested");
const removeReplyRequested = createAction("replies/removeReplyRequested");
const updateReplyFailed = createAction("replies/updateReplyFailed");
const updateReplyRequested = createAction("replies/updateReplyRequested");

export const loadRepliesList = (pageId) => async (dispatch) => {
    dispatch(repliesRequested());
    try {
        const { content } = await replyService.getRepliesForPage(pageId);
        dispatch(repliesReceived(content));
    } catch (error) {
        dispatch(repliesRequestFailed(error.message));
    }
};

export const createReply = (payload) => async (dispatch) => {
    dispatch(addReplyRequested());
    try {
        const { content } = await replyService.createReply(payload);
        dispatch(replyCreated(content));
    } catch (error) {
        dispatch(repliesRequestFailed(error.message));
    }
};

export const removeReply = (replyId) => async (dispatch) => {
    dispatch(removeReplyRequested());
    try {
        const { content } = await replyService.removeReply(replyId);
        if (!content) {
            dispatch(replyRemoved(replyId));
        }
    } catch (error) {
        dispatch(repliesRequestFailed(error.message));
    }
};

export const updateReply =
    ({ payload, replyId }) =>
    async (dispatch) => {
        dispatch(updateReplyRequested());
        try {
            const { content } = await replyService.update({
                payload,
                replyId
            });
            dispatch(replyUpdateSuccessfully(content));
        } catch (error) {
            dispatch(updateReplyFailed(error.message));
        }
    };

export const getReplies = () => (state) => state.replies.entities;
export const getRepliesLoadingStatus = () => (state) => state.replies.isLoading;
export const getReplyById = (replyId) => (state) => {
    if (state.replies.entities) {
        return state.replies.entities.filter((r) => r.commentId === replyId);
    }
};

export default repliesReducer;
