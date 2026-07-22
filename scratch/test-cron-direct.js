const { createClient } = require('@sanity/client');
require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function sendTelegramMessage(text) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const rawChatIds = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !rawChatIds) {
    console.log('[Telegram Mock] Bot token or chat IDs missing.');
    return { ok: false };
  }

  const chatIds = rawChatIds
    .split(/[,;\s]+/)
    .map((id) => id.trim())
    .filter(Boolean);

  const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  console.log(`Sending Telegram notification to ${chatIds.length} chats...`);

  for (const chatId of chatIds) {
    try {
      const res = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      });
      if (res.ok) {
        console.log(`Telegram notification successfully sent to chat: ${chatId}`);
      } else {
        const textErr = await res.text();
        console.error(`Telegram API error for chat ${chatId}:`, textErr);
      }
    } catch (err) {
      console.error(`Fetch error for Telegram chat ${chatId}:`, err);
    }
  }
}

async function resetAndRun() {
  const targetSessionId = "7970664e-5e19-477d-9a16-8fa9eac2e0ba";
  console.log(`Resetting session ${targetSessionId} in Sanity...`);

  try {
    // 1. Fetch current document
    const query = `*[_type == "chatSession" && sessionId == $sessionId][0]`;
    const doc = await client.fetch(query, { sessionId: targetSessionId });
    if (!doc) {
      console.error('Session not found!');
      return;
    }

    // Filter messages to only keep user messages
    const origMessages = doc.messages || [];
    const userMessages = origMessages.filter(m => m.sender === 'user');

    // Reset fields
    const resetTime = new Date(Date.now() - 300000).toISOString(); // 5 mins ago
    await client
      .patch(doc._id)
      .set({
        messages: userMessages,
        fallbackTriggered: false,
        fallbackState: null,
        isHandledByAdmin: false,
        updatedAt: resetTime
      })
      .commit();

    console.log('Reset complete. Running cron fallback test...');

    // 2. Fetch matching sessions
    const sessions = await client.fetch(`*[_type == "chatSession" && isHandledByAdmin == false && fallbackTriggered == false]`);
    console.log(`Found ${sessions.length} sessions to check.`);

    const now = Date.now();
    const threeMinutesMs = 180000;

    for (const session of sessions) {
      const sessionUpdatedTime = session.updatedAt 
        ? new Date(session.updatedAt).getTime() 
        : new Date(session.createdAt || session._createdAt).getTime();

      const timeElapsed = now - sessionUpdatedTime;
      console.log(`Checking Session: ${session.sessionId}`);
      console.log(`- Last updated: ${new Date(sessionUpdatedTime).toISOString()}`);
      console.log(`- Time elapsed: ${(timeElapsed / 1000).toFixed(1)} seconds`);

      if (timeElapsed >= threeMinutesMs) {
        console.log(`- Qualifies! Triggering fallback...`);

        const fallbackText = "Tere! Meie konsultant on hetkel tehase auditil või kliendikohtumisel. Et saaksime teid kiiremini aidata, palun kirjutage lühidalt: millise tootmisvaldkonnaga on tegu ja mis on teie peamine eesmärk?";
        const timestamp = new Date().toISOString();

        const newMessage = {
          sender: 'support',
          text: fallbackText,
          timestamp,
        };

        await client
          .patch(session._id)
          .setIfMissing({ messages: [] })
          .append('messages', [newMessage])
          .set({
            fallbackTriggered: true,
            fallbackState: 'waiting_for_field',
            updatedAt: timestamp
          })
          .commit();

        console.log(`- Session ${session._id} updated in Sanity.`);

        // Telegram notification
        await sendTelegramMessage(`🤖 Automaatne vastus saadetud kliendile (konsultant ei vastanud 3 min jooksul).`);
      }
    }

  } catch (err) {
    console.error('Error in reset and run:', err);
  }
}

resetAndRun();
