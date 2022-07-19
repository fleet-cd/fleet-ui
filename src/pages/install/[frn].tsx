import { useRouter } from "next/router";
import React from "react";
import { Ship } from "../../models/ship.model";
import ShipService from "../../services/ship.service";
import { IconButton } from "../../components/IconButton/IconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Cards/Card/Card";
import { MenuItem } from "../../components/MenuItem/MenuItem";
import Skeleton from "../../components/Skeleton/Skeleton";
import { Product, Version } from "../../models/product.model";
import ProductService from "../../services/product.service";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { semverSortVersions } from "../../utils/versions";
import { Column, Table } from "../../components/Table/Table";
import Loader from "../../components/Loader/Loader";


const InstallOnShip = () => {

    const router = useRouter();
    const { frn } = router.query;
    const [ship, setShip] = React.useState<Ship | undefined>();
    const [products, setProducts] = React.useState<Product[] | undefined>();
    const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>();
    const [versions, setVersions] = React.useState<Version[] | undefined>();

    React.useEffect(() => {
        if (frn) {
            ShipService.getShip(frn.toString()).then(r => {
                setShip(r.data);
            });
        }
        ProductService.listProducts(0, 0, "+name").then(r => {
            setProducts(r.data.items);
        });
    }, [frn]);

    React.useEffect(() => {
        if (selectedProduct) {
            ProductService.getProduct(selectedProduct.frn, true).then(r => {
                setVersions(semverSortVersions(r.data.versions))
            });
        }
    }, [selectedProduct]);


    return <>
        <Card title={ship ? `Install Product on ${ship.name}` : <Skeleton />}>
            <Dropdown
                items={products}
                selected={selectedProduct}
                renderer={(item) => <MenuItem onClick={() => setSelectedProduct(item)}>{item.name}</MenuItem>}
                stringRenderer={(item) => item.name}
            />
        </Card>
        <Card title="Versions" style={{ marginTop: "8px" }}>
            <Table values={versions}>
                <Column key="version" title="Version" />
                <Column key="createdAt" title="Date Created" formatter={(val: Version) => new Date(val.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })} />
                <Column key="modifiedAt" title="Last Modified" formatter={(val: Version) => new Date(val.modifiedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })} />
                <Column key="action" title="Is Compatable" formatter={() => <Loader />} />
                <Column align="right" key="action" formatter={() => <IconButton icon={faCheck} />} />
            </Table>
        </Card>
    </>
};


export default InstallOnShip;