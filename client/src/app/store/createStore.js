import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";

const rootReducer = combineReducers({
    users: usersReducer
});

export function createStore() {
    return configureStore({ reducer: rootReducer });
}
