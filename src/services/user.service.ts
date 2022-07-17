import { AxiosResponse } from "axios";
import { PaginationResponse } from "../models/fleet.model";
import { CreateUserRequest, User } from "../models/auth.model";
import { http } from "./http";

export default class UserService {
    static listUsers(offset: number, pageSize: number, sort?: string): Promise<AxiosResponse<PaginationResponse<User>>> {
        return http.get(`${process.env.api}/api/v1/users`, { params: { offset, pageSize, sort } });
    }
    static createUser(perm: CreateUserRequest): Promise<AxiosResponse<User>> {
        return http.post(`${process.env.api}/api/v1/users`, perm);
    }
}