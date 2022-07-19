import { Column, Table } from "../../components/Table/Table";
import { Cargo } from "../../models/cargo.model";
import { Product } from "../../models/product.model";


export default function CargoTable(
    props: {
        cargo?: Cargo[]
        products?: { [x: string]: Product }
    }
) {
    const actualProducts = props.products ? props.products : {}
    return <>
        <Table values={props.cargo}>
            <Column key="name" title="Name" formatter={(c: Cargo) => actualProducts[c.productFrn].name} />
        </Table>
    </>
}