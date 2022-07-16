import type { NextPage } from "next";
import { useEffect, useState } from "react";
import StatisticCard from "../components/Cards/StatisticCard/StatisticCard";
import { Col } from "../components/Row/Col";
import { Row } from "../components/Row/Row";
import CargoService from "../services/cargo.service";
import ProductService from "../services/product.service";
import ShipService from "../services/ship.service";


const Home: NextPage = () => {
    const [productCount, setProductCount] = useState<number | undefined>();
    const [shipCount, setShipCount] = useState<number | undefined>();
    const [cargoCount, setCargoCount] = useState<number | undefined>();

    useEffect(() => {
        ProductService.listProducts(0, 1).then(r => {
            setProductCount(r.data.total);
        });
        ShipService.listShips(0, 1).then(r => {
            setShipCount(r.data.total);
        });
        CargoService.listCargo(0, 1).then(r => {
            setCargoCount(r.data.total);
        });
    }, []);

    return (
        <Row>
            <Col size={4}>
                <StatisticCard
                    label="Ships"
                    actions={[{ action: "View", route: "/search/ships" }, { action: "Create", route: "/create/ship" }]}
                    stat={shipCount}
                />
            </Col>
            <Col size={4}>
                <StatisticCard
                    label="Products"
                    actions={[{ action: "View", route: "" }, { action: "Create", route: "" }]}
                    stat={productCount}
                />
            </Col>
            <Col size={4}>
                <StatisticCard
                    label="Cargo"
                    actions={[{ action: "View", route: "" }, { action: "Create", route: "" }]}
                    stat={cargoCount}
                />
            </Col>
        </Row>
    );
};

export default Home;
