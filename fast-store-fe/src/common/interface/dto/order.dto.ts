import { OrderItem } from "../../../container/order";

export interface CreateOrderDto {
        name: string;
        address: string;
        phone: string;
        products: OrderItem[];
}
