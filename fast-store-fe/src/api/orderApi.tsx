import { ServerResponse } from "../common/interface/api.interface";
import { CreateOrderDto } from "../common/interface/dto/order.dto";
import http from "./axiosCommon";

export const orderApi = {
        createOrder: async (input: CreateOrderDto) => {
                const url = `/order`;
                const res = await http.post<ServerResponse<any>>(url, input);
                return res;
        },
};
