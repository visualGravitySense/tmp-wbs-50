/** Comma/space/semicolon-separated chat IDs */
export function parseTelegramChatIds(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return [
    ...new Set(
      raw
        .split(/[,;\s]+/)
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ]
}

export type TelegramSendResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'all_failed'; details?: unknown }

/** Server-only: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID */
export async function sendTelegramText(text: string): Promise<TelegramSendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIds = parseTelegramChatIds(process.env.TELEGRAM_CHAT_ID)
  if (!token || chatIds.length === 0) {
    return { ok: false, reason: 'not_configured' }
  }

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`
  const results = await Promise.all(
    chatIds.map(async (chat_id) => {
      try {
        const tgRes = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id, text, disable_web_page_preview: true }),
        })
        if (!tgRes.ok) {
          const errBody = await tgRes.text().catch(() => '')
          return { chat_id, ok: false as const, status: tgRes.status, errBody: errBody.slice(0, 500) }
        }
        return { chat_id, ok: true as const }
      } catch (err) {
        return {
          chat_id,
          ok: false as const,
          status: 500,
          errBody: err instanceof Error ? err.message : 'fetch_failed',
        }
      }
    }),
  )

  const failed = results.filter((r) => !r.ok)
  if (failed.length === results.length) {
    return { ok: false, reason: 'all_failed', details: failed }
  }
  if (failed.length > 0) {
    console.error('[telegram] partial failure', failed)
  }
  return { ok: true }
}

export interface DetailedTelegramSendResult {
  ok: boolean;
  messageId?: string;
  chatId?: string;
  reason?: 'not_configured' | 'failed';
  details?: unknown;
}

/**
 * Sends a text message to Telegram and returns the specific messageId and chatId.
 * Sends to all configured chat IDs to ensure all users receive the message.
 */
export async function sendTelegramMessageDetailed(text: string): Promise<DetailedTelegramSendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIds = parseTelegramChatIds(process.env.TELEGRAM_CHAT_ID)
  if (!token || chatIds.length === 0) {
    return { ok: false, reason: 'not_configured' }
  }

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`
  
  const results = await Promise.all(
    chatIds.map(async (chat_id) => {
      try {
        const tgRes = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id, text, disable_web_page_preview: true }),
        })
        if (!tgRes.ok) {
          const errBody = await tgRes.text().catch(() => '')
          return { ok: false, chat_id, details: errBody.slice(0, 500) }
        }
        const resData = await tgRes.json();
        if (resData.ok && resData.result) {
          return {
            ok: true,
            chatId: String(resData.result.chat.id),
            messageId: String(resData.result.message_id),
          };
        }
        return { ok: false, chat_id, details: resData }
      } catch (err) {
        return {
          ok: false,
          chat_id,
          details: err instanceof Error ? err.message : 'fetch_failed',
        }
      }
    })
  )

  const successful = results.filter((r): r is { ok: true; chatId: string; messageId: string } => r.ok)
  if (successful.length === 0) {
    return { ok: false, reason: 'failed', details: results }
  }

  return {
    ok: true,
    chatId: successful.map((s) => s.chatId).join(','),
    messageId: successful.map((s) => s.messageId).join(','),
  }
}


