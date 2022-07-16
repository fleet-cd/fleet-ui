import { NamespacedFleetResource } from './fleet.model';

export interface Ship extends NamespacedFleetResource {
    name: string,
    tags: string[]
}