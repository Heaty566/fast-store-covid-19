import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { AuthState } from "../../common/interface/user.interface";
import { authThunk } from "./thunk";
import { userThunk } from "./userThunk";

const initialState: AuthState = {
        email: "",
        name: "",
        id: "",
        isLogin: false,
};

const reducer = createSlice({
        name: "auth",
        initialState,
        reducers: {
                resetState: () => ({ ...initialState }),
                updateLogin: (state) => ({ ...state, isLogin: true }),
        },
        extraReducers: (builder) => {
                builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
                        const newState = { ...state };
                        newState.name = payload.name;
                        newState.email = payload.email;
                        newState.id = payload.id;
                        newState.isLogin = true;
                        return newState;
                });
                builder.addCase(authThunk.logoutUser.fulfilled, () => ({ ...initialState }));

                builder.addCase(userThunk.getCurrentUser.rejected, (state) => {
                        const cookies = new Cookies();
                        cookies.set("auth-token", "", { maxAge: -999 });

                        return {
                                ...state,
                                isLogin: false,
                                isSocketLogin: false,
                        };
                });
        },
});
export const authActions = {
        ...reducer.actions,
};
export const authReducer = reducer.reducer;
