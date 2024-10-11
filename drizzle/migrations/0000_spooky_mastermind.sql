CREATE TABLE IF NOT EXISTS "players" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"score" numeric NOT NULL
);
