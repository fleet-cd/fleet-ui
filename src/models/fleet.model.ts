export interface FleetResource {
    frn: string
    modifiedAt: string
    createdAt: string
}

export interface NamespacedFleetResource extends FleetResource {
    namespace: string
}

export interface PaginationResponse<T> {
    total: number 
    count: number 
    items: T[]
}