import { FleetResource } from './fleet.model';

export interface Environment extends FleetResource {
    name: string
    image: string
}

export interface CreateEnvironmentRequest {
    name: string
    image: string
}