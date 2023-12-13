import React from 'react';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

interface AuthState {
	signedIn: boolean;
	authError: Error | null;
	handleSignIn: (username: string, password: string) => Promise<void>;
	handleSignOut: () => Promise<void>;
	setAuthError: React.Dispatch<React.SetStateAction<Error | null>>;
}

const initialAuthContext: AuthState = {
	signedIn: false,
	authError: null,
	handleSignIn: async () => void 0,
	handleSignOut: async () => void 0,
	setAuthError: () => void 0,
};

const AuthContext = React.createContext<AuthState>(initialAuthContext);

export const useAuthContext = () => {
	return React.useContext(AuthContext);
};

interface Props {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = React.memo(({ children }) => {
	//
	const [authError, setAuthError] = React.useState<Error | null>(null);
	const [signedIn, setSignedIn] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async () => {
			try {
				const currentUser = await getCurrentUser();
				console.log(`currentUser: `, currentUser);
				setSignedIn(true);
			} catch (err) {
				setSignedIn(false);
			}
		})();
	}, []);

	const handleSignIn = React.useCallback(async (username: string, password: string) => {
		try {
			const { isSignedIn } = await signIn({ username, password });
			if (isSignedIn) {
				setSignedIn(isSignedIn);
			} else {
				throw new Error('Error signing in');
			}
		} catch (error: unknown) {
			const authError = error instanceof Error ? error : new Error('');
			setAuthError(authError);
			setSignedIn(false);
		}
	}, []);

	const handleSignOut = React.useCallback(async () => {
		try {
			await signOut();
		} catch (error) {
			const authError = error instanceof Error ? error : new Error('Error signing out');
			setAuthError(authError);
			console.log('Error signing out: ', error);
		}
		setSignedIn(false);
	}, []);

	const contextValue = React.useMemo(
		() => ({
			signedIn,
			authError,
			handleSignIn,
			handleSignOut,
			setAuthError,
		}),
		[signedIn, authError, handleSignIn, handleSignOut]
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
});
