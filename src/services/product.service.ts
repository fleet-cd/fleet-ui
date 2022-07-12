import axios, { AxiosResponse } from "axios";
import { PaginationResponse } from "../models/fleet.model";
import { Product } from "../models/product.model";

export default class ProductService {
    static listProducts(offset: number, pageSize: number): Promise<AxiosResponse<PaginationResponse<Product>>> {
        return axios.get(`${process.env.api}/api/v1/products`, {params: {offset, pageSize}})
    }
}