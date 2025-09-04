import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "user"]);

export const users = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  discordSnowflake: text("discord_snowflake").notNull(),
});

export const teams = pgTable("team", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  abbreviation: text("abbreviation").notNull(),
});

export const players = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  teamId: integer("team_id").references(() => teams.id),
  imageUrl: text("imageUrl"),
  stats: jsonb("stats"),
});

export const fieldingPositions = pgEnum("fielding_positions", [
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
  "P",
]);

export const teamLineups = pgTable("team_lineup", {
  playerId: integer("player_id")
    .primaryKey()
    .references(() => players.id),
  fieldingPosition: fieldingPositions("fielding_position"),
  battingOrder: integer("batting_order"),
  isStarred: boolean("is_starred").notNull().default(false),
});
