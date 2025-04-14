import { useIsAuthenticated } from "@azure/msal-react";
import {Navigate} from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? children : <Navigate to="/homepage/lobby" />
}

export default ProtectedRoutes;