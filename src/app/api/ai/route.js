import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, systemPrompt } = await req.json();

    // Mengambil API Key yang sudah kamu tanam di Vercel Settings
    const apiKey = process.env.TEGAR_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key tidak ditemukan di server Vercel." }, { status: 500 });
    }

    // Menghubungi API OpenAI Compatible milik Tegar Firman
    const response = await fetch("https://api-ai.tegarfirman.site/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        messages: [
          { role: "system", content: systemPrompt || "Kamu adalah asisten AI cerdas." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ result: data.choices[0].message.content });

  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan pada server AI MRR." }, { status: 500 });
  }
}
