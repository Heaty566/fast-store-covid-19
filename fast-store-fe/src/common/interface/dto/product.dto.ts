export interface AddNewProductForm {
        name: string;
        price: string;
        quantity: string;
        image: any;
}

export interface AddNewProductDto {
        name: string;
        price: number;
        quantity: number;
        image: File;
}

export interface UpdateProductDto {
        name: string;
        price: number;
        quantity: number;
        id: string;
}

export interface UpdateProductForm {
        name: string;
        price: string;
        quantity: string;
        id: string;
}
