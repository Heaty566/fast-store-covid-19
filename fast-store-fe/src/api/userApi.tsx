import http from "./axiosCommon";
import { ServerResponse } from "../common/interface/api.interface";
import { User } from "../common/interface/user.interface";

export const userAPI = {
        getCurrentUser: async () => {
                const url = `/user`;

                const res = await http.get<ServerResponse<User>>(url);
                return res;
        },
};
