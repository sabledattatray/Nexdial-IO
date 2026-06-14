require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log("Testing Resend API Key:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");
  
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "getnexdial@gmail.com",
      subject: "NexDial Test Email",
      html: "<p>This is a test email to verify your API key works.</p>",
    });

    console.log("Success! Email sent. Response data:");
    console.log(data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testEmail();
