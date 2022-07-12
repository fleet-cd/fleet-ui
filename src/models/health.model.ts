export enum Availability {
    AVAILABLE = "AVAILABLE",
    UNAVAILABLE = "UNAVAILABLE"
}

export interface Health {
    status: Availability,
    reason: string
}