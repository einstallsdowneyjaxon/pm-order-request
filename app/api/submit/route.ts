import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { link, notes } = body;

    if (!link || !notes) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "New PM Order Request",
      html: `
        <h2>New Order Request</h2>

        <p>
          <strong>Cart Link:</strong><br/>
          <a href="${link}">${link}</a>
        </p>

        <p>
          <strong>Notes:</strong><br/>
          ${notes.replace(/\n/g, "<br/>")}
        </p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
