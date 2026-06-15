require("dotenv").config();

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TO = "918010803756";

async function sendTemplate() {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  
  console.log(`Sending template to ${TO} using Phone ID ${PHONE_NUMBER_ID}...`);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${META_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: TO,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US"
        }
      }
    })
  });

  const data = await response.json();
  console.log("Response Status:", response.status);
  console.log("Response Data:", JSON.stringify(data, null, 2));
}

sendTemplate().catch(console.error);
