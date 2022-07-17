import Card from "../../components/Cards/Card/Card";
import { FlexList } from "../../components/FlexList/FlexList";
import { LabelString } from "../../components/LabelString/LabelString";
import Skeleton from "../../components/Skeleton/Skeleton";

export default function ResourceTitleCard(
    props: {
        name?: string
        hasFrn?: boolean
        frn?: string
        createdAt?: string
        modifiedAt?: string
        children?: React.ReactNode
        actions?: React.ReactNode
    }
) {
    return <Card button={props.actions} title={props.name || <Skeleton />} subTitle={props.hasFrn && (props.frn || <Skeleton />)}>
        <FlexList gap={24}>
            <LabelString label="Date Created">
                {props.createdAt && `${new Date(props.createdAt).toLocaleTimeString()} ${new Date(props.createdAt).toLocaleDateString()}` || <Skeleton />}
            </LabelString>
            <LabelString label="Last Modified">
                {props.modifiedAt && `${new Date(props.modifiedAt).toLocaleTimeString()} ${new Date(props.modifiedAt).toLocaleDateString()}` || <Skeleton />}
            </LabelString>
        </FlexList>
        <div style={{ marginTop: "8px" }}>
            {props.children}
        </div>
    </Card>
}