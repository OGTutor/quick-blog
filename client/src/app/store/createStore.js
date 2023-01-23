import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles";
import usersReducer from "./users";
import commentsReducer from "./comments";
import repliesReducer from "./replies";

const rootReducer = combineReducers({
    users: usersReducer,
    articles: articlesReducer,
    comments: commentsReducer,
    replies: repliesReducer
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
