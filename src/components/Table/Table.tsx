/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { faArrowDownWideShort, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import styles from "./Table.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ColumnProps<T> {
    title?: string
    key: string
    formatter?: (val: T) => React.ReactNode
    sortable?: boolean
}

export function Column<T>(props: ColumnProps<T>) {
    return {
        props: props,
        type: "__esModule",
        key: "col"
    };
}

export interface TableProps<T> {
    values: T[]
    children?: JSX.Element[]
    pagination?: boolean
    sortDirection?: number 
    sortCol?: string
    setSort?: (col: string, dir: number) => void
}


export function Table<T extends {[v: string]: any}>(props: TableProps<T>) {
    
    const sd = props.sortDirection === -1 ? -1 : 1;
    const icon = props.sortDirection === -1 ? faArrowDownWideShort : faArrowUpWideShort;

    const handleClick = (key: string) => {
        if (!props.setSort) {
            return;
        }
        if (key === props.sortCol) {
            props.setSort(key, sd * -1);
        } else {
            props.setSort(key, -1);
        }
    };

    const tableHeader = useMemo(() => {
        return <thead>
            <tr role="row">
                {props.children?.map((col, i) => 
                    <th key={i} role="columnheader" style={{userSelect: "none", cursor: col.props.sortable ? "pointer" : "auto"}}>
                        <div className={styles.tableColumnHeader} onClick={() => handleClick(col.key?.toString() || "")}>
                            <div className={styles.tableColumnHeaderContent}>
                                {col.props.title}
                            </div>
                            {col.props.sortable && <>
                                <div style={{flexGrow: 1}} />
                                {props.sortCol === col.key ? <FontAwesomeIcon className={styles.sortableIconActive} icon={icon} width={18} height={18} /> : <FontAwesomeIcon className={styles.sortableIcon} icon={faArrowDownWideShort} width={18} height={18} />}
                            </>}
                        </div>
                    </th>
                )}
            </tr>
        </thead>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children]);

    const tableFooter = <tfoot>
            <tr role="row">
                {props.children?.map((col, i) => 
                    <th key={i} role="columnheader">
                        <div className={styles.tableColumnHeader}>
                            <div className={styles.tableColumnHeaderContent}>
                                {col.props.title}
                                {}
                            </div>
                        </div>
                    </th>
                )}
            </tr>
        </tfoot>;


    return <div className={styles.tableWrapper}>
        <div className={styles.tableOverflowWrapper}>
            <table className={styles.table} role="table">
                {tableHeader}
                <tbody>
                    {props.values.map((v, i) => <tr className={styles.tableRow} key={i} role="row">
                        {props.children?.map((c, k) => 
                            <td className={styles.tableCellContent} key={k} role="cell">{
                                c.props.formatter ? (
                                    c.props.formatter(v)
                                ) : (
                                    v[c.key || ""]
                                )
                            }</td>
                        )}
                        </tr>)}
                </tbody>
                {props.pagination && tableFooter}
            </table>
        </div>
    </div>;
}