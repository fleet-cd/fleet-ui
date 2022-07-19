import React from "react";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import Skeleton from "../../components/Skeleton/Skeleton";
import { LabelString } from "../../components/LabelString/LabelString";
import Card from "../../components/Cards/Card/Card";
import { FlexList } from "../../components/FlexList/FlexList";

const ResourceContainer = (props: {
    open?: boolean
    name?: string
    hasFrn?: boolean
    frn?: string
    createdAt?: string
    modifiedAt?: string
    actions?: React.ReactNode
    more?: React.ReactNode
    children: React.ReactNode
}) => {
    const prps = useSpring({ right: props.open ? "8px" : "-280px", paddingRight: props.open ? "288px" : "0px" })

    return <>
        <animated.div style={{ right: prps.right, position: "fixed", height: "calc(100% - 68px)" }}>
            <Card small style={{ width: "280px", height: "100%" }} button={props.actions} title={props.name || <Skeleton />} subTitle={props.hasFrn && (props.frn || <Skeleton />)}>
                <FlexList gap={24}>
                    <LabelString label="Date Created">
                        {props.createdAt && `${new Date(props.createdAt).toLocaleTimeString()} ${new Date(props.createdAt).toLocaleDateString()}` || <Skeleton />}
                    </LabelString>
                    <LabelString label="Last Modified">
                        {props.modifiedAt && `${new Date(props.modifiedAt).toLocaleTimeString()} ${new Date(props.modifiedAt).toLocaleDateString()}` || <Skeleton />}
                    </LabelString>
                </FlexList>
                <div>
                    {props.more}
                </div>
            </Card>
        </animated.div>
        <animated.div style={{ width: "100%", height: "100%", paddingRight: prps.paddingRight }}>
            {props.children}
        </animated.div>
    </>
};

export default ResourceContainer;