import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../common/interface/user.interface";
import { userAPI } from "../../api/userApi";

export const userThunk = {
        getCurrentUser: createAsyncThunk<User, void>("getCurrentUser", async (_, { dispatch }) => {
                const res = await userAPI.getCurrentUser();

                return res.data.data;
        }),
};
