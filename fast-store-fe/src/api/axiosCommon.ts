import axios, { AxiosError } from "axios";

import { store } from "../store";
import { ServerResponse } from "../common/interface/api.interface";
import { apiActions } from "../store/api";

const axiosClient = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL + "/api",
        withCredentials: true,
});

axiosClient.interceptors.request.use(function (req) {
        store.dispatch(apiActions.initReq());

        return req;
});
axiosClient.interceptors.response.use(
        function (response) {
                store.dispatch(apiActions.resetState());
                if (response?.data?.details?.message) store.dispatch(apiActions.updateSuccessMessage(response.data));

                return response;
        },
        function (error: AxiosError<ServerResponse<null>>) {
                store.dispatch(apiActions.resetState());

                if (error.response?.status) store.dispatch(apiActions.updateErrorDetails(error.response.data.details));

                return Promise.reject(error.response);
        }
);

export default axiosClient;
