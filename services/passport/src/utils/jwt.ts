import { env } from 'cloudflare:workers';
import type { Product } from '@checkpoint/passport/src/types/product';
import { SignJWT } from 'jose';

export const createAccessToken = async ({
	userId,
	product,
}: {
	userId: string;
	product: Product;
}): Promise<{ token: string; jti: string }> => {
	const jti = crypto.randomUUID();

	const jsonWebToken = await new SignJWT()
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setIssuer(env.ACCESS_TOKEN_ISSUER)
		.setSubject(userId)
		.setAudience(composeAccessTokenAudienceClaim(product))
		.setJti(jti)
		.setNotBefore(new Date())
		.setExpirationTime(composeAccessTokenExpirationTimeClaim())
		.setIssuedAt(new Date())
		.sign(new TextEncoder().encode(env.ACCESS_TOKEN_SECRET));

	return { token: jsonWebToken, jti };
};

export const composeAccessTokenAudienceClaim = (product: Product) => {
	const productAudiences = {
		MINERVA: env.PRODUCT_AUDIENCE_MINERVA,
	};

	return [
		env.ACCESS_TOKEN_ISSUER,
		...(productAudiences[product] ? [productAudiences[product]] : []),
	];
};

export const composeAccessTokenExpirationTimeClaim = () => {
	return new Date(new Date().setHours(new Date().getHours() + 1));
};
