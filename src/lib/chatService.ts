import fs from 'fs';
import path from 'path';
import { writeClient } from '@/lib/sanity/client';

export interface ChatMessage {
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  sessionId: string;
  telegramChatId: string;
  telegramMessageId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  isHandledByAdmin?: boolean;
  fallbackTriggered?: boolean;
  fallbackState?: 'waiting_for_field' | 'waiting_for_goal' | 'completed';
  enrichedLeadAttributes?: {
    fieldOfProduction?: string;
    mainGoal?: string;
  };
}

const STORAGE_DIR = path.join(process.cwd(), 'scratch');
const STORAGE_FILE = path.join(STORAGE_DIR, 'chat_sessions.json');

// Ensure local storage directory and file exist
function initLocalStorage() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORAGE_FILE)) {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Checks if cloud storage via Sanity is configured and active.
 */
function isCloudActive(): boolean {
  return Boolean(process.env.SANITY_API_TOKEN && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

/**
 * Reads all chat sessions from storage (Sanity cloud or local JSON).
 */
export async function getSessions(): Promise<ChatSession[]> {
  if (isCloudActive()) {
    try {
      const query = `*[_type == "chatSession"] | order(createdAt desc)`;
      const sanityDocs = await writeClient.fetch(query);
      return sanityDocs.map((doc: any) => ({
        id: doc._id,
        sessionId: doc.sessionId,
        telegramChatId: doc.telegramChatId,
        telegramMessageId: doc.telegramMessageId,
        messages: doc.messages || [],
        createdAt: doc._createdAt || doc.createdAt,
        updatedAt: doc._updatedAt || doc.updatedAt,
        isHandledByAdmin: doc.isHandledByAdmin,
        fallbackTriggered: doc.fallbackTriggered,
        fallbackState: doc.fallbackState,
        enrichedLeadAttributes: doc.enrichedLeadAttributes,
      }));
    } catch (err) {
      console.warn('[chatService] Sanity fetch failed, falling back to local storage:', err);
    }
  }

  // Fallback to local JSON
  initLocalStorage();
  try {
    const data = await fs.promises.readFile(STORAGE_FILE, 'utf-8');
    return JSON.parse(data) as ChatSession[];
  } catch (error) {
    console.error('[chatService] Failed to read local sessions:', error);
    return [];
  }
}

/**
 * Saves all local chat sessions to local storage file.
 */
async function saveLocalSessions(sessions: ChatSession[]): Promise<void> {
  initLocalStorage();
  try {
    await fs.promises.writeFile(STORAGE_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  } catch (error) {
    console.error('[chatService] Failed to save local sessions:', error);
  }
}

/**
 * Retrieves a chat session by the client-side sessionId.
 */
export async function getSessionByClientSessionId(sessionId: string): Promise<ChatSession | null> {
  if (isCloudActive()) {
    try {
      const query = `*[_type == "chatSession" && sessionId == $sessionId][0]`;
      const doc = await writeClient.fetch(query, { sessionId });
      if (doc) {
        return {
          id: doc._id,
          sessionId: doc.sessionId,
          telegramChatId: doc.telegramChatId,
          telegramMessageId: doc.telegramMessageId,
          messages: doc.messages || [],
          createdAt: doc._createdAt || doc.createdAt,
          updatedAt: doc._updatedAt || doc.updatedAt,
          isHandledByAdmin: doc.isHandledByAdmin,
          fallbackTriggered: doc.fallbackTriggered,
          fallbackState: doc.fallbackState,
          enrichedLeadAttributes: doc.enrichedLeadAttributes,
        };
      }
      return null;
    } catch (err) {
      console.warn('[chatService] Sanity getSessionByClientSessionId failed, using fallback:', err);
    }
  }

  const sessions = await getSessions();
  return sessions.find(s => s.sessionId === sessionId) || null;
}

/**
 * Retrieves a chat session by Telegram's chat_id and message_id.
 */
export async function getSessionByTelegramMessage(
  telegramChatId: string,
  telegramMessageId: string
): Promise<ChatSession | null> {
  const sessions = await getSessions();
  const targetChatId = String(telegramChatId);
  const targetMsgId = String(telegramMessageId);

  return sessions.find(s => {
    const chatIds = (s.telegramChatId || '').split(',');
    const msgIds = (s.telegramMessageId || '').split(',');
    const idx = chatIds.indexOf(targetChatId);
    return idx !== -1 && msgIds[idx] === targetMsgId;
  }) || null;
}

/**
 * Creates a new chat session mapping.
 */
export async function createSession(params: {
  sessionId: string;
  telegramChatId: string;
  telegramMessageId: string;
}): Promise<ChatSession> {
  const now = new Date().toISOString();

  if (isCloudActive()) {
    try {
      const newDoc = await writeClient.create({
        _type: 'chatSession',
        sessionId: params.sessionId,
        telegramChatId: String(params.telegramChatId),
        telegramMessageId: String(params.telegramMessageId),
        messages: [],
        createdAt: now,
        updatedAt: now,
        isHandledByAdmin: false,
        fallbackTriggered: false,
      });
      return {
        id: newDoc._id,
        sessionId: params.sessionId,
        telegramChatId: String(params.telegramChatId),
        telegramMessageId: String(params.telegramMessageId),
        messages: [],
        createdAt: now,
        updatedAt: now,
        isHandledByAdmin: false,
        fallbackTriggered: false,
      };
    } catch (err) {
      console.warn('[chatService] Sanity createSession failed, falling back to local:', err);
    }
  }

  const sessions = await getSessions();
  const newSession: ChatSession = {
    id: crypto.randomUUID(),
    sessionId: params.sessionId,
    telegramChatId: String(params.telegramChatId),
    telegramMessageId: String(params.telegramMessageId),
    messages: [],
    createdAt: now,
    updatedAt: now,
    isHandledByAdmin: false,
    fallbackTriggered: false,
  };

  sessions.push(newSession);
  await saveLocalSessions(sessions);
  return newSession;
}

/**
 * Appends a message to the active session's message list.
 */
export async function addMessageToSession(
  sessionId: string,
  message: ChatMessage
): Promise<ChatSession | null> {
  if (isCloudActive()) {
    try {
      const session = await getSessionByClientSessionId(sessionId);
      if (session) {
        const updatedDoc = await writeClient
          .patch(session.id)
          .setIfMissing({ messages: [] })
          .append('messages', [message])
          .set({ updatedAt: new Date().toISOString() })
          .commit();
        
        return {
          id: updatedDoc._id,
          sessionId: updatedDoc.sessionId,
          telegramChatId: updatedDoc.telegramChatId,
          telegramMessageId: updatedDoc.telegramMessageId,
          messages: updatedDoc.messages || [],
          createdAt: updatedDoc._createdAt || updatedDoc.createdAt,
          updatedAt: updatedDoc._updatedAt || updatedDoc.updatedAt,
          isHandledByAdmin: updatedDoc.isHandledByAdmin,
          fallbackTriggered: updatedDoc.fallbackTriggered,
          fallbackState: updatedDoc.fallbackState,
          enrichedLeadAttributes: updatedDoc.enrichedLeadAttributes,
        };
      }
    } catch (err) {
      console.warn('[chatService] Sanity addMessageToSession failed, falling back to local:', err);
    }
  }

  const sessions = await getSessions();
  const index = sessions.findIndex(s => s.sessionId === sessionId);
  if (index === -1) return null;

  const currentMessages = Array.isArray(sessions[index].messages) ? sessions[index].messages : [];

  const updatedSession: ChatSession = {
    ...sessions[index],
    messages: [...currentMessages, message],
    updatedAt: new Date().toISOString(),
  };

  sessions[index] = updatedSession;
  await saveLocalSessions(sessions);
  return updatedSession;
}

/**
 * Updates an existing chat session.
 */
export async function updateSession(
  id: string,
  updates: Partial<Omit<ChatSession, 'id' | 'createdAt'>>
): Promise<ChatSession | null> {
  if (isCloudActive()) {
    try {
      const updatedDoc = await writeClient
        .patch(id)
        .set(updates)
        .set({ updatedAt: new Date().toISOString() })
        .commit();
      return {
        id: updatedDoc._id,
        sessionId: updatedDoc.sessionId,
        telegramChatId: updatedDoc.telegramChatId,
        telegramMessageId: updatedDoc.telegramMessageId,
        messages: updatedDoc.messages || [],
        createdAt: updatedDoc._createdAt || updatedDoc.createdAt,
        updatedAt: updatedDoc._updatedAt || updatedDoc.updatedAt,
        isHandledByAdmin: updatedDoc.isHandledByAdmin,
        fallbackTriggered: updatedDoc.fallbackTriggered,
        fallbackState: updatedDoc.fallbackState,
        enrichedLeadAttributes: updatedDoc.enrichedLeadAttributes,
      };
    } catch (err) {
      console.warn('[chatService] Sanity updateSession failed, falling back to local:', err);
    }
  }

  const sessions = await getSessions();
  const index = sessions.findIndex(s => s.id === id);
  if (index === -1) return null;

  const updatedSession: ChatSession = {
    ...sessions[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  sessions[index] = updatedSession;
  await saveLocalSessions(sessions);
  return updatedSession;
}
