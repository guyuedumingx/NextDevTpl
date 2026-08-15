import { defineModule } from "@/core/modules";

export const paymentModule = defineModule({
  id: "payment",
  name: "Payment",
  description: "支付结账、订阅生命周期和 Webhook",
  kind: "optional",
  dependencies: ["subscription"],
  routes: [
    {
      path: "/api/webhooks/payment",
      source: "src/app/api/webhooks/payment/route.ts",
    },
  ],
  navigation: [],
  translations: [],
  schema: ["payment"],
  telemetryEvents: [
    "payment.checkout.started",
    "payment.checkout.completed",
    "payment.subscription.created",
    "payment.subscription.canceled",
    "payment.subscription.cancel_requested",
    "payment.subscription.past_due",
    "payment.subscription.paused",
    "payment.subscription.upserted",
  ],
});
