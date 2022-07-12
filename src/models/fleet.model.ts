export interface FleetResource {
    frn: string
    modifiedAt: Date
    createdAt: Date
}

export interface NamespacedFleetResource extends FleetResource {
    namespace: string
}

export interface PaginationResponse<T> {
    total: number 
    count: number 
    items: T[]
}