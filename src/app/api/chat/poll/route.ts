import { NextResponse } from 'next/server';
import { getSessionByClientSessionId } from '@/lib/chatService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    const session = await getSessionByClientSessionId(sessionId);
    
    // Return the messages array (or empty array if session is not yet registered/empty)
    const messages = session ? (session.messages || []) : [];

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error('[api/chat/poll] Route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
