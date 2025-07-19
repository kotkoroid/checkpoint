import type { Audience } from '@checkpoint/passport/src/types/audience';

export interface IssueRefreshTokenInput {
	userId: string;
	audience: Audience;
	issueDate: Date;
}

export interface IssueRefreshTokenOutput {
	jti: string;
	token: string;
}
