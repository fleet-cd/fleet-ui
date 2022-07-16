import styles from "./MenuItem.module.scss";

interface MenuItemProps {
    children?: React.ReactNode
    onClick?: () => void
}

export function MenuItem(props: MenuItemProps) {
    return <div onClick={props.onClick} className={styles.menuItem}>
        {props.children}
    </div>

}