import http from "./axiosCommon";
import { ServerResponse } from "../common/interface/api.interface";
import { User } from "../common/interface/user.interface";
import { AddNewProductDto, UpdateProductDto } from "../common/interface/dto/product.dto";
import { Product } from "../common/interface/product.interface";

export const productAPI = {
        addNewProduct: async (input: AddNewProductDto) => {
                const obj = new FormData();
                obj.append("image", input.image);
                obj.append("quantity", String(input.quantity));
                obj.append("name", input.name);
                obj.append("price", String(input.price));

                const url = `/product`;
                const res = await http.post<ServerResponse<User>>(url, obj);
                return res;
        },

        getAll: async () => {
                const url = "/product";
                const res = await http.get<ServerResponse<Product[]>>(url);
                return res.data.data;
        },

        updateProduct: async (input: UpdateProductDto) => {
                const url = `/product`;
                const res = await http.put<ServerResponse<User>>(url, input);
                return res;
        },
};
