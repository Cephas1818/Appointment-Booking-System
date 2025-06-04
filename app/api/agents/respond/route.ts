import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { businessSlug, message } = await request.json();
  // TODO: integrate OpenAI GPT-4
  const reply = `Echo from ${businessSlug}: ${message}`;
  return NextResponse.json({ reply });
}
