import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : (req.headers.get('x-real-ip') ?? 'unknown');
  return NextResponse.json({ ip });
}
