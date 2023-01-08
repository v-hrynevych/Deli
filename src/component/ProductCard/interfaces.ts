import {HTMLAttributes} from "react";

export interface ProductCardProp extends HTMLAttributes<HTMLDivElement> {
    photoUrl: string[];
    title: string;
    stars?: number;
    price: number;
    oldPrice?: number;
    href: string;
    quantity: number;
    productId: number;
    quantityComments?: number;
    isCart?: boolean;
    category: string;
    data?: string;
    description: string;
    email: string;
    location: string;
    name: string;
    productOwner: string;
    tel: number;
}
