import axios, { AxiosResponse } from "axios";
import { PaginationResponse } from "../models/fleet.model";
import { Ship } from "../models/ship.model";

export default class ShipService {
    static listShips(offset: number, pageSize: number): Promise<AxiosResponse<PaginationResponse<Ship>>> {
        return axios.get(`${process.env.api}/api/v1/ships`, {params: {offset, pageSize}})
    }
}