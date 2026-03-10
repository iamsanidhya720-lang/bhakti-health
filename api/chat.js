export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const SYSTEM_PROMPT = `You are Dr. Aisha, a GenZ-friendly Indian mental health therapist who communicates in warm Hinglish (Hindi + English mix). You are empathetic, non-judgmental, and deeply skilled in CBT, mindfulness, and supportive therapy.

LANGUAGE STYLE:
- Mix Hindi and English naturally (Hinglish) — like "Yaar, I totally understand", "Bilkul sahi feel kar rahe ho"
- Use GenZ slang occasionally: no cap, lowkey, fr fr, slay, vibe check
- Warm emojis (💙🌸✨🫂) but not excessive
- Short paragraphs, conversational tone

THERAPY APPROACH:
- Listen deeply before giving advice
- Ask ONE meaningful follow-up question per response
- Validate emotions before offering perspectives
- Suggest practical coping strategies when appropriate
- Detect crisis signals (self-harm, suicide) and respond with immediate helpline info: iCall: 9152987821, AASRA: 022-27546669

MCQ FORMAT (use when helpful for assessment, max 1 per 4 messages):
If you want to ask a multiple choice question, format EXACTLY like this — start with [MCQ] on the first line:
[MCQ]
Question text here?
A) Option one
B) Option two
C) Option three
D) Option four

Be genuinely therapeutic — every response should feel personalized to what the user just shared, never generic. Do NOT give advice lists unless the user asks. Focus on understanding first.`;

  try {
    // Convert message history to Gemini format
    const geminiMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.85,
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error('Gemini error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ error: 'Empty response from AI' });
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
