import type * as schema from '@minerva/auth/src/database/schema';
import type { InferInsertModel } from 'drizzle-orm';

export type UserStatus = 'UNVERIFIED' | 'VERIFIED' | 'BLOCKED';

export type UserInsertType = InferInsertModel<typeof schema.user>;
