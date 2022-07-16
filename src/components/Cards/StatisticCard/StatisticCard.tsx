// import { Button, ButtonGroup, Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material'
import Link from "next/link";
import Card from "../Card/Card";
import ButtonSet from "../../ButtonSet/ButtonSet";
import Button from "../../Button/Button";
import Skeleton from "../../Skeleton/Skeleton";

const StatisticCard = (props: { stat?: number, label: string, actions?: { route: string, action: string }[] }) => {
    return (
        <Card style={{ flexGrow: 1 }} title={props.label}>
            <div>
                {props.stat != null ? props.stat.toString() : <Skeleton />}
            </div>
            {props.actions &&
                <ButtonSet style={{marginTop: "16px"}}>
                    {props.actions.map(action => <Link href={action.route} key={action.action}><Button>{action.action}</Button></Link>)}
                </ButtonSet>
            }
        </Card>
    );
};

export default StatisticCard;
