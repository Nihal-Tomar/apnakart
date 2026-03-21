import { NextResponse } from 'next/server';
import { getAgentResponse, agentStatuses } from '@/lib/agents';

export async function POST(request: Request) {
  const body = await request.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const response = getAgentResponse(message);

  return NextResponse.json({
    response,
    agents: agentStatuses,
  });
}

export async function GET() {
  return NextResponse.json({ agents: agentStatuses });
}
