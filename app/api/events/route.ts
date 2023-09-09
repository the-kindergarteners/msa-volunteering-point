import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<Response> {
  return NextResponse.json([{ name: 'O-Week', date: new Date(), jobsLeft: 0 }])
}
