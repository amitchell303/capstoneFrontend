import { createSlice } from "@reduxjs/toolkit";
import api from "../app/api";
import { storeToken } from "./tokenService";

// stores the token from register api call
const registerSlice = createSlice({
  name: "registerUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.registerUser.matchFulfilled, storeToken);
  },
});

// stores the token from login api call
const loginSlice = createSlice({
  name: "loginUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.loginUser.matchFulfilled, storeToken);
  },
});

// dont uncomment untill ready to implement
/*
export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
*/
