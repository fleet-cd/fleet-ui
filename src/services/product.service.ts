import { AxiosResponse } from "axios";
import { PaginationResponse } from "../models/fleet.model";
import { Product } from "../models/product.model";
import { http } from "./http";

export default class ProductService {
    static listProducts(offset: number, pageSize: number): Promise<AxiosResponse<PaginationResponse<Product>>> {
        return http.get(`${process.env.api}/api/v1/products`, {params: {offset, pageSize}})
    }
}