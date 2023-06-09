import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {InputField} from "src/component";
import {useSignIn} from "../../hooks";
import {FormControl} from "../FormControl";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signIn, user, error} = useSignIn({redirectUrl: "/"});
    return (
        <FormControl
            onSubmit={() => signIn(email, password)}
            title="Sign in"
            subtitle="Welcome back!"
            linkTitle="Don't have account?"
            linkHref="/sign-up"
        >
            <>
                <InputField
                    type="email"
                    placeholder="Email"
                    label="Email:"
                    icon={faEnvelope}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    label="Password:"
                    icon={faLock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <p style={{color: "red", paddingTop: "1rem"}}>
                        {error.code}
                    </p>
                )}
            </>
        </FormControl>
    );
};
