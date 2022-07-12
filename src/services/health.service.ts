import axios, { AxiosResponse } from "axios";
import { Health } from "../models/health.model";

export default class HealthService {
    static health(): Promise<AxiosResponse<Health>> {
        return axios.get(`${process.env.api}/api/v1/health`)
    }
}