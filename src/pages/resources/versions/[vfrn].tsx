import { useRouter } from "next/router";
import React from "react";


const Version = () => {
    const router = useRouter();
    const { vfrn } = router.query;
    console.log(vfrn)
    return <div />
};

export default Version;