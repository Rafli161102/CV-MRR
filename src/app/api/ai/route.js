import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, systemPrompt } = await req.json();
    const apiKey = process.env.TEGAR_AI_API_KEY;

    const response = await fetch("https://api-ai.tegarfirman.site/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Server AI Error" }, { status: 500 });
  }
}
