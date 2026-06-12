import crypto from "crypto";
import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/verify-payment
//
// Handles TWO different callers:
//   1. CLIENT-SIDE  – frontend sends { razorpay_order_id, razorpay_payment_id,
//                     razorpay_signature } after checkout modal closes.
//   2. RAZORPAY WEBHOOK – Razorpay server sends event JSON with header
//                         X-Razorpay-Signature (signed with WEBHOOK_SECRET).
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const webhookSignature = req.headers.get("x-razorpay-signature");

    // ── PATH A: Razorpay Server Webhook ──────────────────────────────────────
    if (webhookSignature) {
      const rawBody = await req.text();
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error("[Webhook] RAZORPAY_WEBHOOK_SECRET is not set.");
        return NextResponse.json(
          { error: "Webhook secret not configured." },
          { status: 500 }
        );
      }

      // Verify webhook authenticity
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== webhookSignature) {
        console.warn("[Webhook] Signature mismatch — possible spoofed request.");
        return NextResponse.json(
          { error: "Invalid webhook signature." },
          { status: 400 }
        );
      }

      // Parse and handle the event
      const event = JSON.parse(rawBody);
      const eventType: string = event.event;

      console.log(`[Webhook] Received event: ${eventType}`);

      switch (eventType) {
        case "payment.captured":
          console.log("[Webhook] ✅ Payment captured:", event.payload?.payment?.entity?.id);
          // TODO: Mark user as paid in DB, activate workspace
          break;

        case "payment.authorized":
          console.log("[Webhook] 🔑 Payment authorized:", event.payload?.payment?.entity?.id);
          break;

        case "payment.failed":
          console.warn("[Webhook] ❌ Payment failed:", event.payload?.payment?.entity?.id);
          // TODO: Notify user, mark trial as failed
          break;

        case "order.paid":
          console.log("[Webhook] ✅ Order paid:", event.payload?.order?.entity?.id);
          break;

        case "subscription.activated":
          console.log("[Webhook] 🟢 Subscription activated:", event.payload?.subscription?.entity?.id);
          // TODO: Set user plan to active in DB
          break;

        case "subscription.charged":
          console.log("[Webhook] 💳 Subscription charged (monthly renewal):", event.payload?.subscription?.entity?.id);
          // TODO: Extend subscription period in DB
          break;

        case "subscription.halted":
          console.warn("[Webhook] ⚠️ Subscription halted (payment failed):", event.payload?.subscription?.entity?.id);
          // TODO: Notify user, restrict access after grace period
          break;

        case "subscription.cancelled":
          console.log("[Webhook] 🔴 Subscription cancelled:", event.payload?.subscription?.entity?.id);
          // TODO: Downgrade user to free/trial in DB
          break;

        default:
          console.log(`[Webhook] Unhandled event type: ${eventType}`);
      }

      return NextResponse.json({ received: true, event: eventType });
    }

    // ── PATH B: Client-Side Payment Verification ─────────────────────────────
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification parameters." },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay key secret is not configured on the server." },
        { status: 500 }
      );
    }

    // HMAC-SHA256(order_id | payment_id, KEY_SECRET)
    const dataToSign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(dataToSign)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed. Signature mismatch." },
        { status: 400 }
      );
    }

    console.log("[Client Verify] ✅ Payment verified:", razorpay_payment_id);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
    });
  } catch (error: any) {
    console.error("Verify Payment API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
