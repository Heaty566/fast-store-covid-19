import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";

export const authThunk = {
        logoutUser: createAsyncThunk<null, void>("LogoutUser", async () => {
                await authApi.logoutUser();
                return null;
        }),
};
