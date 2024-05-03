import { useContext } from "react";
import { Login } from "../page/LoginUser"
import { AuthContext } from "./auth";


export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Login />;
    }

    return children;
}