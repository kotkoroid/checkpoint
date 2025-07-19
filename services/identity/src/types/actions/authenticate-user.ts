import type { UserSelectType } from '@checkpoint/identity/src/types/entities/user';

export interface AuthenticateUserInput {
	username: string | undefined;
	email: string | undefined;
	password: string;
}

export interface AuthenticateUserOutput {
	user: UserSelectType;
}
