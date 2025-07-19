import type { UserSelectType } from '@checkpoint/identity/src/types/entities/user';

export interface CreateUserInput {
	username: string;
	email: string;
	password: string;
}

export interface CreateUserOutput {
	user: UserSelectType;
}
