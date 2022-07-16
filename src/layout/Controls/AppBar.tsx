import { useEffect, useState } from "react";
import { Availability, Health } from "../../models/health.model";
import HealthService from "../../services/health.service";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconButton } from "../../components/IconButton/IconButton";
import Card from "../../components/Cards/Card/Card";

function AppBar(props: { open: boolean, setOpen: (b: boolean) => void }) {
  const { open, setOpen } = props;
  const [health, setHealth] = useState<Health | null>(null);
  useEffect(() => {
    HealthService.health().then(r => {
      setHealth(r.data);
    });
  }, []);
  const router = useRouter();
  if (router.pathname.includes("/login")) {
    return null;
  }

  const getColor = () => {
    if (!health) {
      return "#5F6B7C";
    }
    if (health.status === Availability.AVAILABLE) {
      return "#32A467";
    } else {
      return "#CD4246";
    }
  };

  return <Card style={{ position: "fixed", transition: "width 225ms ease-out, margin 225ms ease-out", width: `calc(100% - ${open ? "0px" : "240px"})`, marginLeft: `${open ? "0px" : "240px"}`, zIndex: 100, borderRadius: 0, padding: "10px" }}>
    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      <IconButton icon={faBars} onClick={() => setOpen(!open)} style={{ marginRight: "0.5em" }} />
      <h3 style={{ margin: 0, flexGrow: 1 }}><Link href="/">Fleet</Link></h3>
      <FontAwesomeIcon icon={faCircle} color={getColor()} width={16} height={16} />
    </div>
  </Card>;

}

export default AppBar;
