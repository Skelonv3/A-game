import { numeric, pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';

export const players = pgTable('players', {
    id: uuid('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    score: numeric('score').notNull(),
  });