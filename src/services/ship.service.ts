import { AxiosResponse } from 'axios';
import { PaginationResponse } from '../models/fleet.model';
import { Ship } from '../models/ship.model';
import { http } from './http';

export default class ShipService {
    static listShips(offset: number, pageSize: number, sort?: string): Promise<AxiosResponse<PaginationResponse<Ship>>> {
        return http.get(`${process.env.api}/api/v1/ships`, {params: {offset, pageSize, sort}});
    }
    static getShip(frn: string): Promise<AxiosResponse<Ship>> {
        return http.get(`${process.env.api}/api/v1/ships/${frn}`);
    }
    static deleteShip(frn: string | undefined): Promise<AxiosResponse<string>> {
        return http.delete(`${process.env.api}/api/v1/ships/${frn}`);
    }
    static createShip(params: {name: string, namespace?: string, tags?: string[]}): Promise<AxiosResponse<Ship>> {
        return http.post(`${process.env.api}/api/v1/ships`, params);
    }
}