import http from "./axiosCommon";
import { ServerResponse } from "../common/interface/api.interface";

export const authApi = {
        logoutUser: async () => {
                const url = `/auth/logout"}`;
                const res = await http.post<ServerResponse<null>>(url);
                return res;
        },
};
