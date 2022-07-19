import { Cargo } from './cargo.model';
import { NamespacedFleetResource } from './fleet.model';
import { Product } from './product.model';

export interface Source {
    owner: string
    repo: string
}

export interface Ship extends NamespacedFleetResource {
    name: string,
    tags: string[]
    source: Source
}

export interface GetCargoResponse {
    cargo: Cargo[],
    products: { [x: string]: Product }
}