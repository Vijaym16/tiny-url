import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  code: varchar("code", { length: 50 }).primaryKey(),
  targetUrl: text("target_url").notNull(),
  totalClicks: integer("total_clicks").default(0),
  lastClicked: timestamp("last_clicked").default(null),
  createdAt: timestamp("created_at").defaultNow(),
});
