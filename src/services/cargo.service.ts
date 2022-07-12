import axios, { AxiosResponse } from "axios";
import { Cargo } from "../models/cargo.model";
import { PaginationResponse } from "../models/fleet.model";

export default class CargoService {
    static listCargo(offset: number, pageSize: number): Promise<AxiosResponse<PaginationResponse<Cargo>>> {
        return axios.get(`${process.env.api}/api/v1/cargo`, {params: {offset, pageSize}})
    }
}