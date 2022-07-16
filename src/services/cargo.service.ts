import { AxiosResponse } from "axios";
import { Cargo } from "../models/cargo.model";
import { PaginationResponse } from "../models/fleet.model";
import { http } from "./http";

export default class CargoService {
    static listCargo(offset: number, pageSize: number): Promise<AxiosResponse<PaginationResponse<Cargo>>> {
        return http.get(`${process.env.api}/api/v1/cargo`, {params: {offset, pageSize}})
    }
}