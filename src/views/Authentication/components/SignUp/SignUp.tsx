import { useState } from "react";
import {
    faEnvelope,
    faLock,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import { InputField } from "src/component";
import { useSignUp } from "../../hooks";
import { FormControl } from "../FormControl";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const { signUp, error } = useSignUp();
    return (
        <FormControl
            title="Registration"
            subtitle="It will only take 1 minute"
            linkTitle="Already have account?"
            linkHref="/"
            onSubmit={() => signUp(email, password)}
        >
            <>
                <InputField
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={faUser}
                    type="text"
                />
                <InputField
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={faEnvelope}
                    type="email"
                />
                <InputField
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    icon={faPhone}
                    type=""
                />
                <InputField
                    placeholder="Password"
                    value={password}
                    icon={faLock}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                {error && <p style={{ color: "red" }}>{error.code}</p>}
            </>
        </FormControl>
    );
};
