import { OrderItem } from "../../../container/homePage";

export interface CreateOrderDto {
        name: string;
        address: string;
        phone: string;
        message: string;
        products: OrderItem[];
}
