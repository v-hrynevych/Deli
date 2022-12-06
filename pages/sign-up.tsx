import {MainLayout} from "layout";
import {Modal} from "src/component";
import {SignUp} from "src/views/Authentication";
import {useRouter} from "next/router";

const SignUpPage = () => {
    const router = useRouter();
    const backHome = () => {
        router.push('/')
    };
    return (
        <MainLayout isSidebar={true}>
            <Modal handleClick={backHome}>
                <SignUp />
            </Modal>
        </MainLayout>
    );
};

export default SignUpPage;
