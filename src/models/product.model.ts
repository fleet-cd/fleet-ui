import { FleetResource, NamespacedFleetResource } from "./fleet.model";
import { Environment } from "./system.model";

export interface CreateProductRequest {
    name: string,
    namespace: string
    environment: Environment
}

export interface Version extends FleetResource {
    version: string,
    artifactLocation: string
}

export interface CreateVersionRequest {
    version: string,
    dependencies: { [x: string]: { minVersion?: string, maxVersion?: string } }
    artifactLocation?: string
}

export interface Product extends NamespacedFleetResource {
    name: string,
    environment: Environment
    versions: { [x: string]: Version }
}

export interface GetProductResponse {
    product: Product
    versions: Version[]
}