DROP INDEX "subscription_history_source_event_unique";--> statement-breakpoint
ALTER TABLE "revenue_event" ADD COLUMN "transaction_id" text;--> statement-breakpoint
ALTER TABLE "subscription_history" ADD COLUMN "source_type" text DEFAULT 'webhook' NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_history" ADD COLUMN "correlation_id" text;--> statement-breakpoint
CREATE UNIQUE INDEX "revenue_event_transaction_kind_unique" ON "revenue_event" USING btree ("transaction_id","kind");--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_history_correlation_event_unique" ON "subscription_history" USING btree ("event_type","correlation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_history_source_event_unique" ON "subscription_history" USING btree ("source_type","source_event_id");