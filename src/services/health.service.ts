import { AxiosResponse } from "axios";
import { Health } from "../models/health.model";
import { http } from "./http";

export default class HealthService {
    static health(): Promise<AxiosResponse<Health>> {
        return http.get(`${process.env.api}/api/v1/health`)
    }
}