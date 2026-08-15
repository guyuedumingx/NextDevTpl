import type { DatabaseTransaction } from "@/db";
import {
  type NewSubscriptionHistory,
  subscriptionHistory,
} from "@/db/schema/subscription";

export type SubscriptionHistoryEventType =
  | "created"
  | "upgraded"
  | "downgraded"
  | "upgrade_requested"
  | "upgrade_confirmed"
  | "downgrade_requested"
  | "downgrade_confirmed"
  | "cancellation_requested"
  | "cancellation_resumed"
  | "canceled"
  | "renewed"
  | "changed";

export type SubscriptionHistorySourceType = "action" | "system" | "webhook";

export type RecordSubscriptionHistoryInput = Omit<
  NewSubscriptionHistory,
  "id" | "sourceType"
> & {
  eventType: SubscriptionHistoryEventType;
  sourceType?: SubscriptionHistorySourceType;
};

export async function recordSubscriptionHistory(
  tx: DatabaseTransaction,
  input: RecordSubscriptionHistoryInput
): Promise<void> {
  await tx
    .insert(subscriptionHistory)
    .values({
      id: crypto.randomUUID(),
      sourceType: input.sourceType ?? "webhook",
      ...input,
    })
    .onConflictDoNothing();
}
