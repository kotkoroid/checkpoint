import type * as schema from '@checkpoint/identity/src/database/schema';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type UserStatus = 'UNVERIFIED' | 'VERIFIED' | 'BLOCKED';

export type UserSelectType = InferSelectModel<typeof schema.user>;
export type UserInsertType = InferInsertModel<typeof schema.user>;
