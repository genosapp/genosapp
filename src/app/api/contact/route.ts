import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Format the lead for WhatsApp notification
    const waText = encodeURIComponent(
      `🔔 New Lead from genosapp.com!\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service: ${service || "Not specified"}\n` +
      `Budget: ${budget || "Not specified"}\n` +
      `Message: ${message}`
    );

    // Try Resend if API key is available
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "GenOS Website <noreply@genosapp.com>",
          to: ["connect@genosapp.com"],
          subject: `New Lead: ${name} — ${service || "General Inquiry"}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #ddd">${service || "Not specified"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${budget || "Not specified"}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
            </table>
            <p style="margin-top:16px">
              <a href="mailto:${email}">Reply to ${name}</a> ·
              <a href="https://wa.me/917305448354?text=${waText}">View on WhatsApp</a>
            </p>
          `,
        }),
      });
    }

    // Store lead in a simple JSON log as backup
    // (Vercel serverless won't persist, but good for local dev)
    console.log("LEAD:", JSON.stringify({ name, email, service, budget, message, date: new Date().toISOString() }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
