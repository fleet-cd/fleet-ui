import { AxiosResponse } from "axios";
import { CreateGroupRequest, CreatePermissionRequest, Group, Permission } from "../models/auth.model";
import { http } from "./http";

export default class AuthService {
    static login(email: string, password: string) {
        return http.post(`${process.env.api}/api/v1/auth/login`, { email, password });
    }
    static listGroups(sort?: string): Promise<AxiosResponse<Group[]>> {
        return http.get(`${process.env.api}/api/v1/auth/groups`, { params: { sort } });
    }
    static listPermissions(sort?: string): Promise<AxiosResponse<Permission[]>> {
        return http.get(`${process.env.api}/api/v1/auth/permissions`, { params: { sort } });
    }
    static createPermission(perm: CreatePermissionRequest): Promise<AxiosResponse<Permission>> {
        return http.post(`${process.env.api}/api/v1/auth/permissions`, perm);
    }
    static createGroup(perm: CreateGroupRequest): Promise<AxiosResponse<Group>> {
        return http.post(`${process.env.api}/api/v1/auth/groups`, perm);
    }
}