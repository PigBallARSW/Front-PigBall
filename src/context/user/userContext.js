import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useMsal } from '@azure/msal-react';
import { useUserLogin } from '../../Modules/useUserLogin';
import PropTypes from 'prop-types';
const UserContext = createContext();
/**Guardar informacion del usuario
 * @param {JSX.Element} props.children -Elmentos donde guardar el usuario
 * @returns {JSX.Element} Guardar informacion del usuario
 */
export const UserProvider = ({ children }) => {
        const { accounts } = useMsal();
        const isAuthenticated = accounts.length > 0;
        const [playerData, setPlayerData] = useState(null);
        const { getAUser, createNewUser } = useUserLogin();
        const prevAuthState = useRef(isAuthenticated);
        const setPlayer = (res) => {
            setPlayerData({...res,authenticated: true});
        }
        useEffect(() => {
            const fetchOrCreateUser = async (id, name) => {
                const user = await getAUser(id, setPlayer);
                if (!user) {
                    await createNewUser(id, name, setPlayer);
                } 
            }
    
            if (prevAuthState.current !== isAuthenticated) {
                setPlayerData(null);
                prevAuthState.current = isAuthenticated;
            }
    
            if (isAuthenticated) {
                const id = accounts[0].homeAccountId;
                const name = accounts[0].name;
                fetchOrCreateUser(id, name);
            } else {
                const id = sessionStorage.getItem('guestPlayerId') || `guest-${crypto.randomUUID()}`;
                const name = sessionStorage.getItem('guestPlayerName') || `Guest${Math.floor(Math.random() * 1000000)}`;
                sessionStorage.setItem('guestPlayerId', id);
                sessionStorage.setItem('guestPlayerName', name);
                setPlayerData({
                    id: id,
                    username: name,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    lostGames: 0,
                    totalScore: 0,
                    winningPercentage: 0,
                    image: "none",
                    borderColor: "#ffffff",
                    centerColor: "#ffc107",
                    iconType: "none",
                    iconColor: "#ffffff",
                    authenticated: false
                });
            }
        }, [isAuthenticated, accounts, createNewUser, getAUser]);

        const contextValue = useMemo(() => ({
        playerData,
        setPlayer
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