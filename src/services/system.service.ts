import { AxiosResponse } from "axios";
import { CreateEnvironmentRequest, Environment } from "../models/system.model";
import { http } from "./http";

export default class SystemService {
    static listEnvs(sort?: string): Promise<AxiosResponse<Environment[]>> {
        return http.get(`${process.env.api}/api/v1/system/environments`, { params: { sort } });
    }
    static createEnv(req: CreateEnvironmentRequest): Promise<AxiosResponse<Environment>> {
        return http.post(`${process.env.api}/api/v1/system/environments`, req);
    }
}