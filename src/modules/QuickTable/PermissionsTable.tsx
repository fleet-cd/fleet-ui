import React from "react";
import { Column, ColumnProps, Table } from "../../components/Table/Table";


export default function QuickTable<T>(
    props: {
        items?: T[]
        cols?: ColumnProps<T>[]
    }
) {
    const getCols = () => {
        if (!props.cols) {
            return []
        }
        return props.cols
    }

    return <>
        <Table values={props.items}>
            {getCols().map(c =>
                <Column {...c} key={c.key} />
            )}
        </Table>
    </>
}