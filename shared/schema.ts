import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const gameStates = pgTable("game_states", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  level: integer("level").notNull().default(1),
  currentStep: integer("current_step").notNull().default(0),
  codeSequence: jsonb("code_sequence").notNull().$type<string[]>(),
  playerSequence: jsonb("player_sequence").notNull().$type<string[]>(),
  isCompleted: boolean("is_completed").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameStateSchema = createInsertSchema(gameStates).pick({
  userId: true,
  level: true,
  currentStep: true,
  codeSequence: true,
  playerSequence: true,
  isCompleted: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGameState = z.infer<typeof insertGameStateSchema>;
export type GameState = typeof gameStates.$inferSelect;
