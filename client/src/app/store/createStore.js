import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles";
import usersReducer from "./users";

const rootReducer = combineReducers({
    users: usersReducer,
    articles: articlesReducer
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
