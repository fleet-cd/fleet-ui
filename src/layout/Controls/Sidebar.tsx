import { useRouter } from "next/router";
import Card from "../../components/Cards/Card/Card";

function Sidebar(props: { open: boolean, setOpen: (b: boolean) => void }) {
  const { open } = props;
  const router = useRouter();
  if (router.pathname.includes("/login")) {
    return null;
  }

  const styles: React.CSSProperties = { 
    position: "fixed", 
    display: "flex",
    flexDirection: "column",
    width: "240px",
    height: "100vh", 
    backgroundColor: "#1c2127", 
    zIndex: 100, 
    borderRadius: 0,
    padding: 0,
    marginLeft: open ? "-240px" : "0px",
    transition: "margin 225ms ease-out"
  };

  return <Card style={styles} className="sidebar">
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <div onClick={() => router.push("/search/ships")} className="sidebar-item">
        Ships
      </div>
      <div style={{flexGrow: 1}} />
      <div onClick={() => router.push("/settings")} className="sidebar-item">
        Settings
      </div>
    </div>
  </Card>;

}

export default Sidebar;
