import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // mock fetching agents and scheduling next run
  console.log('Running agents...');
  return NextResponse.json({ ok: true });
}
