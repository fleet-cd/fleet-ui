import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import StatisticCard from '../components/Cards/StatisticCard/StatisticCard'
import { Product } from '../models/product.model'
import CargoService from '../services/cargo.service'
import ProductService from '../services/product.service'
import ShipService from '../services/ship.service'

const Home: NextPage = () => {
    const [productCount, setProductCount] = useState<number | undefined>()
    const [shipCount, setShipCount] = useState<number | undefined>()
    const [cargoCount, setCargoCount] = useState<number | undefined>()

    useEffect(() => {
        ProductService.listProducts(0, 1).then(r => {
            setProductCount(r.data.total)
        })
        ShipService.listShips(0, 1).then(r => {
            setShipCount(r.data.total)
        })
        CargoService.listCargo(0, 1).then(r => {
            setCargoCount(r.data.total)
        })
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <StatisticCard
                    label="Ships"
                    actions={[{ action: "View", route: "/search/ships" }, { action: "Create", route: "" }]}
                    stat={shipCount}
                />
            </Grid>
            <Grid item xs={4}>
                <StatisticCard
                    label="Products"
                    actions={[{ action: "View", route: "" }, { action: "Create", route: "" }]}
                    stat={productCount}
                />
            </Grid>
            <Grid item xs={4}>
                <StatisticCard
                    label="Cargo"
                    actions={[{ action: "View", route: "" }, { action: "Create", route: "" }]}
                    stat={cargoCount}
                />
            </Grid>
        </Grid>
    )
}

export default Home
