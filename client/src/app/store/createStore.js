import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles";
import usersReducer from "./users";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    users: usersReducer,
    articles: articlesReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
