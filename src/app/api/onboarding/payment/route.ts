import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      // Fallback to simulated mode
      return NextResponse.json({
        simulated: true,
        orderId: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
        amount: 100, // ₹1 (in paise)
        currency: "INR",
        keyId: "rzp_test_mockkeyid12345",
      });
    }

    // Call real Razorpay API to create a ₹1 checkout order
    const authString = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        amount: 100, // ₹1 (100 paise)
        currency: "INR",
        receipt: `receipt_onboard_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Razorpay API Order Error:", errData);
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }

    const order = await response.json();
    return NextResponse.json({
      simulated: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error("Razorpay Order API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
