import { AxiosResponse } from "axios";
import { CreateGroupRequest, CreatePermissionRequest, Group, Permission } from "../models/auth.model";
import { http } from "./http";

export default class AuthService {
    static login(email: string, password: string) {
        return http.post(`${process.env.api}/api/v1/auth/login`, { email, password });
    }
    static getGroup(name: string): Promise<AxiosResponse<Group>> {
        return http.get(`${process.env.api}/api/v1/auth/groups/${name}`);
    }
    static removePermissionFromGroup(name: string, idx: number) {
        return http.delete(`${process.env.api}/api/v1/auth/groups/${name}/permissions/${idx}`);
    }
    static listGroups(sort?: string): Promise<AxiosResponse<Group[]>> {
        return http.get(`${process.env.api}/api/v1/auth/groups`, { params: { sort } });
    }
    static createPermission(groupName: string, perm: CreatePermissionRequest): Promise<AxiosResponse<Permission>> {
        return http.put(`${process.env.api}/api/v1/auth/groups/${groupName}/permissions`, perm);
    }
    static createGroup(perm: CreateGroupRequest): Promise<AxiosResponse<Group>> {
        return http.post(`${process.env.api}/api/v1/auth/groups`, perm);
    }
}