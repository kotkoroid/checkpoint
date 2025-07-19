import type { Audience } from '@checkpoint/passport/src/types/audience';

export interface IssueAccessTokenInput {
	userId: string;
	audience: Audience;
	issueDate: Date;
}

export interface IssueAccessTokenOutput {
	jti: string;
	token: string;
}
