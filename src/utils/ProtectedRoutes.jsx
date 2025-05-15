import { useIsAuthenticated } from "@azure/msal-react";
import {Navigate, Outlet} from "react-router-dom";
import { useUser } from "../context/user/userContext";
/**Controlar rutas protegidas
 * @returns {JSX.Element} Proteger las rutas
 */
const ProtectedRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
    const {playerData} = useUser();
    return isAuthenticated || playerData ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes;

