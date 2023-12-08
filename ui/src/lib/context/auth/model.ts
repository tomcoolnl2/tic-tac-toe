import { User } from '@tic-tac-toe/model';
import { AuthError } from './error';

export interface AuthContextState {
	fetchUserName: () => Promise<string | AuthError | null>;
	login: (pwd: string) => Promise<AuthError | User>;
	logout: () => Promise<User>;
}
