import { FleetResource } from "./fleet.model";

export interface User extends FleetResource {
    name: string,
    email: string
    groups: string[]
}