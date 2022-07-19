import { AxiosResponse } from "axios";
import { PaginationResponse } from "../models/fleet.model";
import { CreateProductRequest, CreateVersionRequest, GetProductResponse, Product } from "../models/product.model";
import { http } from "./http";

export default class ProductService {
    static listProducts(offset: number, pageSize: number, sort?: string): Promise<AxiosResponse<PaginationResponse<Product>>> {
        return http.get(`${process.env.api}/api/v1/products`, { params: { offset, pageSize, sort } })
    }
    static createProduct(req: CreateProductRequest): Promise<AxiosResponse<Product>> {
        return http.post(`${process.env.api}/api/v1/products`, req)
    }
    static getProduct(frn: string, expandVersions?: boolean): Promise<AxiosResponse<GetProductResponse>> {
        return http.get(`${process.env.api}/api/v1/products/${frn}`, { params: { expandVersions } })
    }
    static createVersion(frn: string, v: CreateVersionRequest): Promise<AxiosResponse<Product>> {
        return http.post(`${process.env.api}/api/v1/products/${frn}/versions`, v)
    }
    static uploadVersionArtifact(frn: string, vfrn: string, body: File): Promise<AxiosResponse<Product>> {
        const formData = new FormData();
        formData.append('file', body);
        return http.post(`${process.env.api}/api/v1/products/${frn}/versions/${vfrn}/artifact`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}