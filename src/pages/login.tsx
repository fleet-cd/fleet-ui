import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { InputText } from "../components/Input/InputText";
// import { Button } from 'primereact/button';
import AuthService from "../services/auth.service";
import Button from "../components/Button/Button";

const Login: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center"}}>
            <div style={{alignItems: "center", display: "flex", flexGrow: 1, flexDirection: "column"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                        <h4 style={{margin: "16px", fontSize: "20px"}}>Fleet</h4>   
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <InputText variant="contained" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{margin: "8px", width: "250px"}} />
                        <InputText variant="contained" value={pass} onChange={(event) => setPass(event.target.value)} placeholder="Password" type="password" style={{margin: "8px", width: "250px"}} />
                    </div>
                </div>
                <Button style={{margin: "16px"}} onClick={() => {
                    AuthService.login(email, pass)
                    .then(() => {
                        router.push("/");
                    });
                }}>Login</Button>
            </div>
        </div>
    );
};

export default Login;
