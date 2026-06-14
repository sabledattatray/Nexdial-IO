/**
 * Utility functions for interacting with the Meta WhatsApp Cloud API.
 */

const WHATSAPP_API_URL = "https://graph.facebook.com/v19.0";
// In production, these will be fetched securely from the database (Integration model) per workspace.
// For now, these are mock env variables or hardcoded test keys.
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "mock_access_token";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "mock_phone_id";

export async function sendWhatsAppMessage(to: string, text: string) {
  // If we don't have real credentials, we mock the success.
  if (META_ACCESS_TOKEN === "mock_access_token") {
    console.log(`[Mock WhatsApp API] Sending message to ${to}: "${text}"`);
    return {
      success: true,
      wamid: `wamid.mock.${Date.now()}`
    };
  }

  try {
    const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${META_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
          preview_url: false,
          body: text,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[WhatsApp API Error]", data);
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    return {
      success: true,
      wamid: data.messages[0].id // The Meta official ID
    };
  } catch (error) {
    console.error("[WhatsApp Send Exception]", error);
    return {
      success: false,
      error: error
    };
  }
}
