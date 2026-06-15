const http = require("http");

const payload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "2860721667611916",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15556691195",
              phone_number_id: "1133919889805532"
            },
            statuses: [
              {
                id: "wamid.HBgMOTE4MDEwODAzNzU2FQIAERgSRjc2MDNBODVFQkNBQ0JBRkVBAA==",
                status: "delivered",
                timestamp: "1780651591",
                recipient_id: "918010803756"
              }
            ]
          },
          field: "messages"
        }
      ]
    }
  ]
};

const data = JSON.stringify(payload);

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/webhooks/whatsapp",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = "";
  console.log(`Status Code: ${res.statusCode}`);
  res.on("data", (chunk) => body += chunk);
  res.on("end", () => {
    console.log("Response:", body);
  });
});

req.on("error", (e) => {
  console.error("Problem with request:", e.message);
});

req.write(data);
req.end();
