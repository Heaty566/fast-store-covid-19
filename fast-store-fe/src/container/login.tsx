import * as React from "react";
import GoogleIcon from "../components/icon/google";

interface LoginGoogleProps {}

const LoginGoogle: React.FunctionComponent<LoginGoogleProps> = () => {
        return (
                <div className="flex items-center justify-center min-h-screen">
                        <a
                                href={process.env.REACT_APP_SERVER_URL + "/api/auth/google"}
                                className="flex items-center justify-between p-2 space-x-4 bg-white rounded-lg shadow-lg "
                        >
                                <GoogleIcon />
                                <p className="font-semibold ">Login With Google</p>
                        </a>
                </div>
        );
};

export default LoginGoogle;
