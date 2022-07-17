/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { faArrowDownWideShort, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import styles from "./Table.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ColumnProps<T> {
    title?: React.ReactNode
    key: string
    formatter?: (val: T, idx: number) => React.ReactNode
    sortable?: boolean
    align?: "right" | "left" | "center"
}

export function Column<T>(props: ColumnProps<T>) {
    return {
        props: props,
        type: "__esModule",
        key: "col"
    };
}

export interface TableProps<T> {
    values?: T[]
    children?: JSX.Element[] | JSX.Element
    pagination?: boolean
    sortDirection?: number
    sortCol?: string
    setSort?: (col: string, dir: number) => void
}


export function Table<T extends { [v: string]: any }>(props: TableProps<T>) {

    const sd = props.sortDirection === -1 ? -1 : 1;
    const icon = props.sortDirection === -1 ? faArrowDownWideShort : faArrowUpWideShort;
    const eles = Array.isArray(props.children) ? props.children : [props.children]

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
                {eles.map((col, i) => {
                    if (col == null) {
                        return;
                    }
                    return <th key={i} role="columnheader" style={{ userSelect: "none", cursor: col.props.sortable ? "pointer" : "auto" }}>
                        <div className={`${styles.tableColumnHeader} ${styles[col.props.align]}`} onClick={() => handleClick(col.key?.toString() || "")}>
                            <div className={`${styles.tableColumnHeaderContent}`}>
                                {col.props.title}
                            </div>
                            {col.props.sortable && <>
                                <div style={{ flexGrow: 1 }} />
                                {props.sortCol === col.key ? <FontAwesomeIcon className={styles.sortableIconActive} icon={icon} width={18} height={18} /> : <FontAwesomeIcon className={styles.sortableIcon} icon={faArrowDownWideShort} width={18} height={18} />}
                            </>}
                        </div>
                    </th>
                }
                )}
            </tr>
        </thead>;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children]);

    const tableFooter = <tfoot>
        <tr role="row">
            {eles.map((col, i) => {
                if (col == null) {
                    return;
                }
                return <th key={i} role="columnheader">
                    <div className={styles.tableColumnHeader}>
                        <div className={styles.tableColumnHeaderContent}>
                            {col.props.title}
                            { }
                        </div>
                    </div>
                </th>
            }
            )}
        </tr>
    </tfoot>;


    return <div className={styles.tableWrapper}>
        <div className={styles.tableOverflowWrapper}>
            <table className={styles.table} role="table">
                {tableHeader}
                {props.values && props.values.length !== 0 &&
                    <tbody>
                        {props.values.map((v, i) => <tr className={styles.tableRow} key={i} role="row">
                            {eles.map((col, k) => {
                                if (col == null) {
                                    return;
                                }
                                return <td className={`${styles.tableCellContent} ${styles[col.props.align]}`} key={k} role="cell" >{
                                    col.props.formatter ? (
                                        col.props.formatter(v, i)
                                    ) : (
                                        v[col.key || ""]
                                    )
                                }</td>
                            }
                            )}

                        </tr>)}
                    </tbody>
                }
                {props.pagination && tableFooter}
            </table>
        </div>
    </div>;
}