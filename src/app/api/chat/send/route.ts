import { NextResponse } from 'next/server';
import { createSession, getSessionByClientSessionId, addMessageToSession, updateSession } from '@/lib/chatService';
import { sendTelegramMessageDetailed } from '@/lib/telegram/server';

const globalAny = global as any;
if (!globalAny.chatTimeouts) {
  globalAny.chatTimeouts = new Map();
}

export async function POST(req: Request) {
  try {
    const { sessionId, name, contact, message } = await req.json();

    if (!sessionId || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanName = String(name || 'Anonymous').trim();
    const cleanContact = String(contact || '—').trim();
    const cleanMessage = String(message).trim();

    // Clear any existing pending timeout
    const existingTimeout = globalAny.chatTimeouts.get(sessionId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      globalAny.chatTimeouts.delete(sessionId);
    }

    // Format the telegram notification text
    const tgText = `💬 Uus sõnum reaalajas vestlusest (Live Chat)\n\nNimi: ${cleanName}\nKontakt: ${cleanContact}\n\nSõnum:\n${cleanMessage}`;

    // Send the message to Telegram and retrieve metadata
    const result = await sendTelegramMessageDetailed(tgText);

    if (!result.ok || !result.messageId || !result.chatId) {
      console.error('[api/chat/send] Telegram delivery failed:', result);
      return NextResponse.json({ error: 'Failed to deliver message to support' }, { status: 502 });
    }

    // Save/Get mapping
    let session = await getSessionByClientSessionId(sessionId);
    let fallbackState: string | undefined = undefined;
    let enrichedLeadAttributes: any = {};

    if (session) {
      fallbackState = session.fallbackState;
      enrichedLeadAttributes = session.enrichedLeadAttributes || {};
    }

    if (!session) {
      session = await createSession({
        sessionId,
        telegramChatId: result.chatId,
        telegramMessageId: result.messageId,
      });
      await updateSession(session.id, {
        isHandledByAdmin: false,
        fallbackTriggered: false,
      });
    } else {
      // Update the session mapping with the latest message ID so Andres can reply to the newest post
      const sessionUpdates: any = {
        telegramChatId: result.chatId,
        telegramMessageId: result.messageId,
      };

      if (fallbackState === 'waiting_for_field') {
        enrichedLeadAttributes.fieldOfProduction = cleanMessage;
        sessionUpdates.fallbackState = 'waiting_for_goal';
        sessionUpdates.enrichedLeadAttributes = enrichedLeadAttributes;
        
        // Notify Telegram of enriched lead attribute
        await sendTelegramMessageDetailed(`ℹ️ [Reaalajas vestlus - Lead rikastamine]\nNimi: ${cleanName}\nKontakt: ${cleanContact}\nTootmisvaldkond: ${cleanMessage}`);
      } else if (fallbackState === 'waiting_for_goal') {
        enrichedLeadAttributes.mainGoal = cleanMessage;
        sessionUpdates.fallbackState = 'completed';
        sessionUpdates.enrichedLeadAttributes = enrichedLeadAttributes;

        // Notify Telegram of enriched lead attribute
        await sendTelegramMessageDetailed(`ℹ️ [Reaalajas vestlus - Lead rikastamine]\nNimi: ${cleanName}\nKontakt: ${cleanContact}\nPeamine eesmärk: ${cleanMessage}`);

        // Post premium auto-acknowledgement message back to live chat
        const ackText = "Suur tänu! Edastasin info konsultandile, võtame teiega peagi ühendust.";
        const ackTimestamp = new Date().toISOString();

        // Save auto-acknowledgement after a tiny delay
        setTimeout(async () => {
          await addMessageToSession(sessionId, {
            sender: 'support',
            text: ackText,
            timestamp: ackTimestamp,
          });

          // Send to active SSE stream
          const controller = globalAny.chatStreams?.get(sessionId);
          if (controller) {
            const encoder = new TextEncoder();
            const ssePayload = {
              type: 'message',
              text: ackText,
              sender: 'support',
              timestamp: ackTimestamp,
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(ssePayload)}\n\n`));
          }
        }, 1000);
      } else {
        // Normal user message
        sessionUpdates.isHandledByAdmin = false;
        sessionUpdates.fallbackTriggered = false;
        sessionUpdates.fallbackState = undefined;
      }

      await updateSession(session.id, sessionUpdates);
    }

    // Add user's message to the session's server messages log
    await addMessageToSession(sessionId, {
      sender: 'user',
      text: cleanMessage,
      timestamp: new Date().toISOString(),
    });

    // Return successfully
    return NextResponse.json({
      success: true,
      session: await getSessionByClientSessionId(sessionId),
      messageId: result.messageId,
    });
  } catch (err) {
    console.error('[api/chat/send] Route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
