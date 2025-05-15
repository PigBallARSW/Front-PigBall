import { useIsAuthenticated } from "@azure/msal-react";
import {Navigate, Outlet} from "react-router-dom";
/**Controlar rutas protegidas
 * @returns {JSX.Element} Proteger las rutas
 */
const ProtectedRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated  ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes;

