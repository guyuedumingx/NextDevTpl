import { and, eq } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

import { revenueEvent } from "@/db/schema/payment";
import { subscriptionHistory } from "@/db/schema/subscription";
import {
  recordRevenueEvent,
  recordSubscriptionHistory,
} from "@/features/payment";
import {
  cleanupTestUsers,
  createTestSubscription,
  createTestUser,
  testDb,
} from "../utils";

const createdUserIds: string[] = [];

afterAll(async () => {
  await cleanupTestUsers(createdUserIds);
});

describe("payment revenue and subscription history idempotence", () => {
  it("records a proration amount once per provider transaction", async () => {
    const testUser = await createTestUser();
    createdUserIds.push(testUser.id);
    const transactionId = `in_adjustment_${Date.now()}`;
    const subscriptionId = `sub_adjustment_${Date.now()}`;

    await recordRevenueEvent({
      amountMinor: 425,
      currency: "USD",
      externalEventId: `evt_${Date.now()}_1`,
      kind: "subscription_adjustment",
      occurredAt: new Date("2026-08-10T00:00:00.000Z"),
      provider: "stripe",
      subscriptionId,
      transactionId,
      userId: testUser.id,
    });
    await recordRevenueEvent({
      amountMinor: 999,
      currency: "USD",
      externalEventId: `evt_${Date.now()}_2`,
      kind: "subscription_adjustment",
      occurredAt: new Date("2026-08-10T00:00:01.000Z"),
      provider: "stripe",
      subscriptionId,
      transactionId,
      userId: testUser.id,
    });

    const rows = await testDb
      .select()
      .from(revenueEvent)
      .where(
        and(
          eq(revenueEvent.transactionId, transactionId),
          eq(revenueEvent.kind, "subscription_adjustment")
        )
      );

    expect(rows).toHaveLength(1);
    expect(rows[0]?.amountMinor).toBe(425);
  });

  it("keeps one action request and one webhook confirmation per correlation", async () => {
    const testUser = await createTestUser();
    createdUserIds.push(testUser.id);
    const testSubscription = await createTestSubscription({
      userId: testUser.id,
      subscriptionId: `sub_history_${Date.now()}`,
    });
    const requestId = crypto.randomUUID();
    const effectiveAt = new Date("2026-09-01T00:00:00.000Z");

    await testDb.transaction(async (tx) => {
      await recordSubscriptionHistory(tx, {
        correlationId: requestId,
        effectiveAt,
        eventType: "downgrade_requested",
        fromPriceId: "price_pro_monthly",
        sourceEventId: requestId,
        sourceType: "action",
        subscriptionId: testSubscription.subscriptionId,
        toPriceId: "price_starter_monthly",
        userId: testUser.id,
      });
      await recordSubscriptionHistory(tx, {
        correlationId: requestId,
        effectiveAt,
        eventType: "downgrade_requested",
        fromPriceId: "price_pro_monthly",
        sourceEventId: requestId,
        sourceType: "action",
        subscriptionId: testSubscription.subscriptionId,
        toPriceId: "price_starter_monthly",
        userId: testUser.id,
      });
      await recordSubscriptionHistory(tx, {
        correlationId: requestId,
        effectiveAt,
        eventType: "downgrade_confirmed",
        fromPriceId: "price_pro_monthly",
        sourceEventId: "evt_downgrade_confirmed",
        sourceType: "webhook",
        subscriptionId: testSubscription.subscriptionId,
        toPriceId: "price_starter_monthly",
        userId: testUser.id,
      });
      await recordSubscriptionHistory(tx, {
        correlationId: requestId,
        effectiveAt,
        eventType: "downgrade_confirmed",
        fromPriceId: "price_pro_monthly",
        sourceEventId: "evt_downgrade_replayed",
        sourceType: "webhook",
        subscriptionId: testSubscription.subscriptionId,
        toPriceId: "price_starter_monthly",
        userId: testUser.id,
      });
    });

    const rows = await testDb
      .select()
      .from(subscriptionHistory)
      .where(eq(subscriptionHistory.correlationId, requestId));

    expect(rows.map((row) => row.eventType).sort()).toEqual([
      "downgrade_confirmed",
      "downgrade_requested",
    ]);
  });
});
