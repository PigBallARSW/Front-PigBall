import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useMsal } from '@azure/msal-react';
import { useUserLogin } from '../../Modules/useUserLogin';
import PropTypes from 'prop-types';

const UserContext = createContext();
/**Guardar informacion del usuario
 * @param {JSX.Element} props.children -Elmentos donde guardar el usuario
 * @returns {JSX.Element} Guardar informacion del usuario
 */
export const UserProvider = ({ children }) => {
        const { accounts } = useMsal()
        const [playerData, setPlayerData] = useState(null);
        const { getAUser } = useUserLogin();
        const [open, setOpen] = useState(false)
        const [loading, setLoading] = useState(true)
        const setPlayer = (res) => {
            setPlayerData(res);
            sessionStorage.setItem("playerData", JSON.stringify(res))
        }
        const loadUserFromMicrosoftLogin = async (id) => {
            await getAUser(id, setPlayer, setOpen); 
        };
        const logout = () => {
            setPlayerData(null); 
            sessionStorage.removeItem("playerData")      
        };

        useEffect(() => {
            let user = sessionStorage.getItem("playerData")
            try {
                const parsedUser = JSON.parse(user);
                setPlayerData(parsedUser);
            } catch (error) {
                console.error("Error parsing playerData from sessionStorage:", error);
            }
            setLoading(false)
        },[accounts])

        const contextValue = useMemo(() => ({
            playerData,
            setPlayer,
            open,
            setOpen,
            loadUserFromMicrosoftLogin,
            logout,
            loading
        }), [playerData, setPlayer]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};