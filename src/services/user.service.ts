import { AxiosResponse } from "axios";
import { PaginationResponse } from "../models/fleet.model";
import { User } from "../models/auth.model";
import { http } from "./http";

export default class UserService {
    static listUsers(offset: number, pageSize: number, sort?: string): Promise<AxiosResponse<PaginationResponse<User>>> {
        return http.get(`${process.env.api}/api/v1/users`, {params: {offset, pageSize, sort}});
    }
}