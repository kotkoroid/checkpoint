import type { UserStatus } from '@checkpoint/identity/src/types/user';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	modifiedAt: integer('modified_at', { mode: 'timestamp_ms' }).$onUpdate(
		() => new Date(),
	),
	username: text('username').unique().notNull(),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	salt: text('salt').notNull(),
	status: text('status').$type<UserStatus>().notNull(),
});
