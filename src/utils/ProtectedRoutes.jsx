import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadResponse } from "../components/Load/LoadResponse";
import { useUser } from "../context/user/userContext";

const ProtectedRoutes = () => {
    const { inProgress } = useMsal(); 
    const isAuthenticated = useIsAuthenticated();
    const { playerData, loading} = useUser();
    const closePage = () =>{
        return <Navigate to="/" />
    }
    if (loading) {
        return <LoadResponse open={true} message="Loading..." onClose={closePage}/>
    }


    return isAuthenticated && playerData ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;


