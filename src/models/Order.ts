import type { OrderRow } from "./OrderRow"
import type { Person } from "./Person"

export type Order = {
    id?: number,
    created: Date,
    total: number,
    parcelMachine: string,
    person: Person,
    orderRows: OrderRow[]
}