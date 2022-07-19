import type { NextPage } from "next";
import { useEffect, useState } from "react";
import StatisticCard from "../components/Cards/StatisticCard/StatisticCard";
import { Col } from "../components/Row/Col";
import { Row } from "../components/Row/Row";
import ProductService from "../services/product.service";
import ShipService from "../services/ship.service";


const Home: NextPage = () => {
    const [productCount, setProductCount] = useState<number | undefined>();
    const [shipCount, setShipCount] = useState<number | undefined>();

    useEffect(() => {
        ProductService.listProducts(0, 1).then(r => {
            setProductCount(r.data.total);
        });
        ShipService.listShips(0, 1).then(r => {
            setShipCount(r.data.total);
        });
    }, []);

    return (
        <Row>
            <Col size={6}>
                <StatisticCard
                    label="Ships"
                    actions={[{ action: "View", route: "/search/ships" }, { action: "Create", route: "/create/ship" }]}
                    stat={shipCount}
                />
            </Col>
            <Col size={6}>
                <StatisticCard
                    label="Products"
                    actions={[{ action: "View", route: "/search/products" }, { action: "Create", route: "/create/product" }]}
                    stat={productCount}
                />
            </Col>
        </Row>
    );
};

export default Home;
