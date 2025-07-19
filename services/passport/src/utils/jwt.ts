import { env } from 'cloudflare:workers';
import type { Audience } from '@checkpoint/passport/src/types/audience';
import { SignJWT } from 'jose';

export const createRefreshToken = async ({
	userId,
	audience,
	issueDate,
}: {
	userId: string;
	audience: Audience;
	issueDate: Date;
}) => {
	const jti = crypto.randomUUID();

	const refreshToken = await new SignJWT()
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setIssuer(env.REFRESH_TOKEN_ISSUER)
		.setSubject(userId)
		.setAudience(composeAudienceClaim(audience))
		.setJti(jti)
		.setNotBefore(issueDate)
		.setExpirationTime(composeExpirationTimeClaim(issueDate, 12))
		.setIssuedAt(issueDate)
		.sign(new TextEncoder().encode(env.REFRESH_TOKEN_SECRET));

	return { jti, token: refreshToken };
};

export const createAccessToken = async ({
	userId,
	audience,
	issueDate,
}: {
	userId: string;
	audience: Audience;
	issueDate: Date;
}): Promise<{ token: string; jti: string }> => {
	const jti = crypto.randomUUID();

	const jsonWebToken = await new SignJWT()
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setIssuer(env.ACCESS_TOKEN_ISSUER)
		.setSubject(userId)
		.setAudience(composeAudienceClaim(audience))
		.setJti(jti)
		.setNotBefore(issueDate)
		.setExpirationTime(composeExpirationTimeClaim(issueDate, 1))
		.setIssuedAt(issueDate)
		.sign(new TextEncoder().encode(env.ACCESS_TOKEN_SECRET));

	return { token: jsonWebToken, jti };
};

export const composeAudienceClaim = (audience: Audience) => {
	const audiences = {
		MINERVA: env.PRODUCT_AUDIENCE_MINERVA,
	};

	return [env.ACCESS_TOKEN_ISSUER, audiences[audience]];
};

export const composeExpirationTimeClaim = (date: Date, hours: number) => {
	return new Date(date.getTime() + hours * 60 * 60 * 1000);
};
