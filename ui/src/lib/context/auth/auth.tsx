import React from 'react';
import { AuthContextState } from './model';
import { fetchUserName, login, logout } from './api';

const initialAuthContext: AuthContextState = {
	fetchUserName,
	login,
	logout,
};

const AuthContext = React.createContext<AuthContextState>(initialAuthContext);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <AuthContext.Provider value={initialAuthContext}>{children}</AuthContext.Provider>;
};
