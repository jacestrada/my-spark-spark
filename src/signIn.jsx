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
                console.log(userCredential)
            })
            .catch((error) => {
                setOpen(true)
                setMessage(error.message)
            });
    };

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
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
                console.log("sign out successful");
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
                    <div> {authUser ? (
                        <Admin adminBool={adminBool} />
                    ) : (
                        null
                    )}
                    </div>
                </div>
            </Card>

        </Grid >
    );
};

export default SignIn;