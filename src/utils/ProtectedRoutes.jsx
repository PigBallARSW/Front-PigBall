import { useIsAuthenticated } from "@azure/msal-react";
import {Navigate} from "react-router-dom";
import PropTypes from 'prop-types';
/**Controlar rutas protegidas
 * @param {JSX.Element} props.children -Elmentos donde proteger las rutas
 * @returns {JSX.Element} Proteger las rutas
 */
const ProtectedRoutes = ({children}) => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? children : <Navigate to="/homepage/lobby" />
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired
};