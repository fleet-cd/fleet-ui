import React from "react";

export default function Tab(props: { name: string, key: string, children?: React.ReactNode }) {
    return {
        props: props,
        type: "__esModule",
        key: props.key,
    };
}