// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_mock",
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.workspaceId) return NextResponse.json({ error: "No workspace" }, { status: 400 });

    const workspace = await prisma.workspace.findUnique({ where: { id: user.workspaceId } });
    if (workspace?.trialEndsAt) {
      return NextResponse.json({ error: "Trial already activated" }, { status: 400 });
    }

    // Amount is 1 INR in paise
    const amount = 100;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: `rcpt_trial_${workspace?.id}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_mock",
    });

  } catch (error: any) {
    console.error("Razorpay Trial Order Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.workspaceId) return NextResponse.json({ error: "No workspace" }, { status: 400 });

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_secret_mock")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      // IN A REAL APP, UNCOMMENT THE ERROR THROW. 
      // FOR LOCAL DEV WITHOUT REAL SECRETS, WE BYPASS:
      if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
      console.log("[DEV MODE] Signature mismatch ignored for easy testing.");
    }

    // Set trialEndsAt to 15 days from now
    const trialEndsAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

    await prisma.workspace.update({
      where: { id: user.workspaceId },
      data: { trialEndsAt }
    });

    return NextResponse.json({ success: true, trialEndsAt });
  } catch (error: any) {
    console.error("Razorpay Trial Verify Error:", error);
    return NextResponse.json({ error: error.message || "Failed to verify payment" }, { status: 500 });
  }
}
