
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

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
      },[]);
  
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
  
    return (
      <AuthContext.Provider value={{ user, token, signInUser, getToken, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  };
  export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
  };
