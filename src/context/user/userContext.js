import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useMsal } from '@azure/msal-react';
import { useUserLogin } from '../../Modules/useUserLogin';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
        const { accounts } = useMsal();
        const isAuthenticated = accounts.length > 0;
        const [playerData, setPlayerData] = useState(null);
    
        const { getAUser, createNewUser } = useUserLogin();
        const prevAuthState = useRef(isAuthenticated);
        const setPlayer = (res) => {
            setPlayerData(res);
        }
        useEffect(() => {
            const fetchOrCreateUser = async (id, name) => {
                const user = await getAUser(id, setPlayer);
                if (!user) {
                    await createNewUser(id, name, setPlayer);
                } 
            };
    
            // Si cambió el estado de login, limpia el estado anterior
            if (prevAuthState.current !== isAuthenticated) {
                setPlayerData(null);
                prevAuthState.current = isAuthenticated;
            }
    
            if (isAuthenticated) {
                const id = accounts[0].homeAccountId;
                const name = accounts[0].name;
                fetchOrCreateUser(id, name);
            } else {
                // Cargar datos locales para un invitado
                const id = sessionStorage.getItem('guestPlayerId') || `guest-${crypto.randomUUID()}`;
                const name = sessionStorage.getItem('guestPlayerName') || `Guest${Math.floor(Math.random() * 1000000)}`;
                sessionStorage.setItem('guestPlayerId', id);
                sessionStorage.setItem('guestPlayerName', name);
                setPlayerData({
                    id,
                    username: name,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    lostGames: 0,
                    totalScore: 0,
                    winningPercentage: 0,
                });
            }
        }, [isAuthenticated, accounts]);

    return (
        <UserContext.Provider value={playerData}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
