import { FleetResource } from "./fleet.model";

export interface User extends FleetResource {
    name: string,
    email: string
    groups: string[]
}

export interface Group {
    name: string,
    permissions: string[]
    modifiedAt: string
    createdAt: string
}

export interface CreatePermissionRequest {
    name: string
    namespace: string
    resourceType: string 
    actions: string[]
}

export interface Permission {
    frn: string
    name: string
    namespace: string
    resourceType: string 
    actions: string[]
    createdAt: string
    modifiedAt: string
}