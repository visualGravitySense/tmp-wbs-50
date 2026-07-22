# Telegram bot (optional leads)

Server routes can notify a Telegram chat when forms are submitted.

## Env vars

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=chat_id_or_comma_separated_ids
```

## Setup

1. Create a bot via BotFather; copy the token.
2. Add the bot to a private chat or channel; obtain the chat id.
3. Set both variables in `.env.local` and Vercel (server-only — never `NEXT_PUBLIC_`).
4. Never commit real tokens.

## Notes

- Tokens that ever appeared in a client repo must be **rotated**.
- Prefer separate bots per client environment.
