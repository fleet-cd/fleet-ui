import React, { HTMLAttributes } from "react";
import styles from "./Card.module.scss";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    children?: React.ReactNode,
    button?: React.ReactNode,
    title?: React.ReactNode,
    subTitle?: React.ReactNode,
}

const Card = (props: CardProps) => {
    const {title, subTitle, ...rest} = props;
    return (
        <div className={styles.card} {...rest}>
            {props.button && <div style={{position: "absolute", top: "16px", right: "16px"}}>{props.button}</div>}
            {title && <div className={styles["card-title"]} style={{marginBottom: subTitle ? "8px" : "16px"}}>
                {title}
                {subTitle && <div className={styles["card-subtitle"]}>{subTitle}</div>}
            </div>}
            {props.children}
        </div>
    );
};


export default Card;
