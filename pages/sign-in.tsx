import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {Modal} from "src/component";
import {SignIn} from "src/views/Authentication";

const SignInPage = () => {
    const router = useRouter();
    const backHome = () => {
        router.push("/");
    };
    return (
        <MainLayout>
            <Modal handleClick={backHome}>
                <SignIn />
            </Modal>
        </MainLayout>
    );
};

export default SignInPage;
