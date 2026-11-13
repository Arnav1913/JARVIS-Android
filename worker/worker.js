const ALLOWED_ORIGIN = "https://arnav1913.github.io";
const SYSTEM_INSTRUCTION = "You are J.A.R.V.I.S., a helpful, concise, calm personal AI assistant with a polished, lightly witty butler-like tone. Address the user respectfully. Be honest about uncertainty. Never claim to control the phone or perform actions unless the app explicitly does so. Keep answers useful and easy to understand.";

function cors(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (origin !== ALLOWED_ORIGIN) return json({ error: "Origin not allowed." }, 403, headers);
    if (request.method !== "POST") return json({ error: "Use POST." }, 405, headers });
    if (!env.GEMINI_API_KEY) return json({ error: "AI service is not configured yet. Add the GEMINI_API_KEY secret to your Worker." }, 503, headers);
    try {
      const body = await request.json();
      const message = typeof body.message === "string" ? body.message.trim() : "";
      const previousId = typeof body.previous_interaction_id === "string" ? body.previous_interaction_id : "";
      if (!message || message.length > 4000) return json({ error: "Please send a message of 1–4000 characters." }, 400, headers);
      const payload = {
        model: "gemini-flash-latest",
        input: message,
        system_instruction: SYSTEM_INSTRUCTION,
        store: true,
        generation_config: { max_output_tokens: 700, temperature: 0.7 }
      };
      if (previousId) payload.previous_interaction_id = previousId;
      const upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
        body: JSON.stringify(payload)
      });
      const data = await upstream.json();
      if (!upstream.ok) return json({ error: data.error?.message || "Gemini request failed." }, 502, headers);
      const parts = (data.steps || []).filter(step => step.type === "model_output").flatMap(step => step.content || []);
      const answer = parts.filter(part => part.type === "text").map(part => part.text || "").join("\n").trim();
      if (!answer) return json({ error: "Gemini returned no text. Please try again." }, 502, headers);
      return json({ answer, interaction_id: data.id || null }, 200, headers);
    } catch (error) {
      return json({ error: "Could not reach the AI service. Please try again." }, 500, headers);
    }
  }
};