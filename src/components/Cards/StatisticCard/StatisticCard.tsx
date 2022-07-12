import { Button, ButtonGroup, Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material'
import Link from 'next/link';

const StatisticCard = (props: { stat?: number, label: string, actions?: {route: string, action: string}[] }) => {
    return (
        <Card sx={{ minWidth: "100%" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.label}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.stat != null ? (
                        props.stat
                    ) : (
                        <Skeleton />
                    )}
                </Typography>
            </CardContent>
            {props.actions &&
                <CardActions>
                    <ButtonGroup variant="contained">
                        {props.actions.map(action => <Link href={action.route} key={action.action}><Button>{action.action}</Button></Link>)}
                    </ButtonGroup>
                </CardActions>
            }
        </Card>
    )
}

export default StatisticCard
