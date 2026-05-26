"use client";

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const webhookUrl =
    "https://tgpm.app.n8n.cloud/webhook/1eebb123-9c0e-4dc2-9d83-d7169a2ec550";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartLink: link,
          notes: notes,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setMessage("Request submitted successfully.");
        setLink("");
        setNotes("");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Could not submit request. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>PM Order Request</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Cart Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="Paste Lowe's cart link"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            placeholder="Property address and any notes"
            rows={8}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </main>
  );
}
