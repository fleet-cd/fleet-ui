import { FleetResource } from "./fleet.model";
import { Product } from "./product.model";

export interface Cargo extends FleetResource {
    productFrn: string
    shipFrn: string
    products?: Product[]
}