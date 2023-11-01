import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
    Alert,
    Grid,
    Card,
} from "@mui/material";

import Admin from "./admin"
import FoodTable from "./foodTable"


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authUser, setAuthUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [adminBool, setAdminBool] = useState(false)

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            })
            .catch((error) => {
                setOpen(true)
                setMessage(error.message)
            });
    };

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user.uid === "ZrNVX9d3MwSktPHTExIUkjMIPSM2") {
                setAdminBool(true)
                setAuthUser(user);
            } else {
                setAuthUser(null);
                setAdminBool(false)
            }
        });

        return () => {
            listen();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    function handleAlertClose() {
        setOpen(false);
    }

    return (
        <Grid
            container
            direction="column"
        >
            {
                open && (
                    <Alert severity="info" onClose={handleAlertClose}>
                        {message}
                    </Alert>
                )
            }
            <Card
            >
                <div className="sign-in-container">
                    {!authUser ? (
                        <form onSubmit={signIn}>
                            <h1>Log In to your Account</h1>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <button type="submit">Log In</button>
                        </form>
                    ) : (null
                    )}
                    <div>
                        {authUser ? (
                            <>
                                <p>{`Signed In as ${authUser.email}`}</p>
                                <button onClick={userSignOut}>Sign Out</button>
                            </>
                        ) : (
                            <p>Signed Out</p>
                        )}
                    </div>
                    <Grid container
                        direction="column"
                        alignItems="center"
                        justify="center">{authUser ? (
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    pb: 2,
                                }}>
                                <Admin adminBool={adminBool} /><FoodTable adminBool={adminBool} />
                            </Grid>
                        ) : (
                            null
                        )}
                    </Grid>

                </div>
            </Card>

        </Grid >
    );
};

export default SignIn;