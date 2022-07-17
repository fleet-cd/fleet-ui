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
    static getUser(frn: string): Promise<AxiosResponse<User>> {
        return http.get(`${process.env.api}/api/v1/users/${frn}`);
    }
    static removeGroup(frn: string, groupName: string) {
        return http.delete(`${process.env.api}/api/v1/users/${frn}/groups/${groupName}`);
    }
    static addGroup(frn: string, groupName: string) {
        return http.put(`${process.env.api}/api/v1/users/${frn}/groups/${groupName}`);
    }
}