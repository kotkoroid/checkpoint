import type { user } from '@checkpoint/identity/src/database/schema/user';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type UserSelectType = InferSelectModel<typeof user>;
export type UserInsertType = InferInsertModel<typeof user>;
