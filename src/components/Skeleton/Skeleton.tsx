import styles from "./Skeleton.module.scss";
import SK from "react-loading-skeleton";

export default function Skeleton() {
    return <SK className={styles.skeleton} />;
}
