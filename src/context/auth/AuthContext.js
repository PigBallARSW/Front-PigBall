import React, { createContext, useContext, useEffect, useState, useCallback,useMemo } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import PropTypes from 'prop-types';

/**Autorizar usuario
 * @param {JSX.Element} props.children -elementos que se deben verificar
 * @returns {JSX.Element} Contexto para Autorizar al usuario
 */
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const { instance } = useMsal();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
  
    const signInUser = async () => {
        try {
          const response = await instance.loginPopup(loginRequest);
          instance.setActiveAccount(response.account);
          setUser(response.account);
          return response.account;
        } catch (error) {
          console.error("Error during login:", error);
        }
      };
  
      const getToken = useCallback(async () => {
        try {
          const account = instance.getActiveAccount();
          if (!account) throw new Error("No active account. Please log in first.");
      
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account,
          });
      
          setToken(response.accessToken);
          return response.accessToken;
        } catch (error) {
          console.error("Token fetch error:", error);
          throw error;
        }
      },[instance]);
  
    const signOut = () => {
      const account = instance.getActiveAccount();
      if (account) {
        instance.logoutPopup();
        setUser(null);
        setToken(null);
      }
    };
  
    useEffect(() => {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        instance.setActiveAccount(accounts[0]);
        setUser(accounts[0]);
      }
    }, [instance]);

    const contextValue = useMemo(() => ({
    user,
    token,
    signInUser,
    getToken,
    signOut
  }), [user, token, signInUser, getToken, signOut]);
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
  };
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};