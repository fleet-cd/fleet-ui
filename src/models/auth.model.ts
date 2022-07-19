import { FleetResource } from "./fleet.model";

export interface User extends FleetResource {
    name: string,
    email: string
    groups: string[]
}

export interface Group {
    name: string,
    permissions: Permission[]
    modifiedAt: string
    createdAt: string
}

export interface GetGroupResponse {
    group: Group
    expandedPermissions: Permission[]
}

export interface CreatePermissionRequest {
    namespace: string
    resourceType: string
    actions: string[]
}

export interface CreateGroupRequest {
    name: string
    permissions: CreatePermissionRequest[]
}

export interface CreateUserRequest {
    name: string
    email: string
    password: string
}

export interface Permission {
    namespace: string
    resourceType: string
    actions: string[]
    createdAt: string
    modifiedAt: string
}