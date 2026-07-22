import { NextResponse } from 'next/server';
import { getSessionByTelegramMessage, addMessageToSession, updateSession } from '@/lib/chatService';

// Ensure the streams and timeouts registries are shared globally
const globalAny = global as any;
if (!globalAny.chatStreams) {
  globalAny.chatStreams = new Map();
}
if (!globalAny.chatTimeouts) {
  globalAny.chatTimeouts = new Map();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if the webhook payload is a valid Telegram message
    const message = body?.message;
    if (!message) {
      return NextResponse.json({ ok: true, note: 'No message in payload' });
    }

    const chatId = message.chat?.id;
    const replyTo = message.reply_to_message;
    const replyText = message.text;

    let session: any = null;

    if (chatId && replyText?.trim()) {
      if (replyTo) {
        const origMessageId = replyTo.message_id;
        // Find the corresponding session mapping from database
        session = await getSessionByTelegramMessage(String(chatId), String(origMessageId));
      } else {
        // Direct chat 1-on-1 fallback: If there is no reply_to_message,
        // search for the most recent session belonging to this direct chat ID.
        const { getSessions } = require('@/lib/chatService');
        const sessions = await getSessions();
        const matchingSessions = sessions.filter(
          (s: any) => {
            const chatIds = (s.telegramChatId || '').split(',');
            return chatIds.includes(String(chatId));
          }
        );
        if (matchingSessions.length > 0) {
          // Get the most recently updated session
          matchingSessions.sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          session = matchingSessions[0];
        }
      }
    }

    if (session) {
      const sessionId = session.sessionId;
      const timestamp = new Date().toISOString();

      // Clear the timeout since admin responded!
      const existingTimeout = globalAny.chatTimeouts.get(sessionId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        globalAny.chatTimeouts.delete(sessionId);
      }

      // Mark as handled by admin and clear fallback states
      await updateSession(session.id, {
        isHandledByAdmin: true,
        fallbackTriggered: false,
        fallbackState: 'completed',
      });

      // Save support's reply to server-side messages log
      await addMessageToSession(sessionId, {
        sender: 'support',
        text: replyText.trim(),
        timestamp,
      });

      // Check if there is an active SSE connection for this session
      const controller = globalAny.chatStreams.get(sessionId) as ReadableStreamDefaultController | undefined;

      if (controller) {
        const encoder = new TextEncoder();
        const ssePayload = {
          type: 'message',
          text: replyText.trim(),
          sender: 'support',
          timestamp,
        };

        try {
          // Push the reply to the web client instantly
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(ssePayload)}\n\n`));
          
          return NextResponse.json({
            ok: true,
            status: 'broadcasted',
            sessionId,
          });
        } catch (streamErr) {
          console.error('[telegram-webhook] Stream enqueue error:', streamErr);
          globalAny.chatStreams.delete(sessionId);
          return NextResponse.json({
            ok: true,
            status: 'stream_failed',
            error: 'Failed to write to stream',
          });
        }
      } else {
        return NextResponse.json({
          ok: true,
          status: 'no_active_stream',
          sessionId,
        });
      }
    }

    // Default acknowledgement to Telegram
    return NextResponse.json({ ok: true, status: 'ignored' });
  } catch (err) {
    console.error('[api/webhook/telegram] Error processing webhook:', err);
    // Always return 200 OK to Telegram to avoid redeliveries of broken payloads
    return NextResponse.json({ ok: false, error: 'Internal processing error' }, { status: 200 });
  }
}
