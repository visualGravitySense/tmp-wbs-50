import { NextResponse } from 'next/server';
import { getSessionByClientSessionId, addMessageToSession, updateSession } from '@/lib/chatService';
import { sendTelegramMessageDetailed } from '@/lib/telegram/server';

const globalAny = global as any;

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // Double-check the status from DB to prevent race conditions
    const freshSession = await getSessionByClientSessionId(sessionId);
    if (!freshSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (freshSession.isHandledByAdmin === false && freshSession.fallbackTriggered === false) {
      const fallbackText = "Tere! Meie konsultant on hetkel tehase auditil või kliendikohtumisel. Et saaksime teid kiiremini aidata, palun kirjutage lühidalt: millise tootmisvaldkonnaga on tegu ja mis on teie peamine eesmärk?";
      const timestamp = new Date().toISOString();

      // 1. Add the fallback auto-reply to session messages
      await addMessageToSession(sessionId, {
        sender: 'support',
        text: fallbackText,
        timestamp,
      });

      // 2. Update session status flags
      await updateSession(freshSession.id, {
        fallbackTriggered: true,
        fallbackState: 'waiting_for_field',
      });

      // 3. Notify Telegram of automatic reply
      await sendTelegramMessageDetailed(`🤖 Automaatne vastus saadetud kliendile (konsultant ei vastanud 3 min jooksul).`);

      // 4. Try sending to active SSE streams if registered
      const controller = globalAny.chatStreams?.get(sessionId);
      if (controller) {
        try {
          const encoder = new TextEncoder();
          const ssePayload = {
            type: 'message',
            text: fallbackText,
            sender: 'support',
            timestamp,
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(ssePayload)}\n\n`));
        } catch (sseErr) {
          console.error(`[trigger-fallback] Failed pushing SSE to sessionId: ${sessionId}`, sseErr);
        }
      }

      return NextResponse.json({
        success: true,
        triggered: true,
      });
    }

    return NextResponse.json({
      success: true,
      triggered: false,
      note: 'Session is already handled by admin or fallback is already triggered',
    });
  } catch (err) {
    console.error('[trigger-fallback] General error in trigger fallback handler:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
