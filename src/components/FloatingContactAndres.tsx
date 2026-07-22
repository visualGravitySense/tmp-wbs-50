'use client'

import { MessageCircle, Send, X, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Alert, GlassPanel, Spinner } from '@/components/ui'
import { createPortal } from 'react-dom'
import ScrollToTopButton from '@/components/ScrollToTopButton'

type SendState = 'idle' | 'sending' | 'success' | 'error'

interface ChatMessage {
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

type FloatingContactAndresProps = {
  hidden?: boolean
}

const CHAT_TITLE = 'VESTLUS.'
const CHAT_INTRO =
  'Tere! Kirjuta mõtted siia – vastan otse telefonist. Kui olen hõivatud või tegevuses, siis peale seda.'
const CHAT_INPUT_PLACEHOLDER = 'Kirjuta oma mõtted siia…'

export default function FloatingContactAndres({ hidden = false }: FloatingContactAndresProps) {
  const panelId = useId()
  
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  
  // Form states
  const [message, setMessage] = useState('')
  const [sendState, setSendState] = useState<SendState>('idle')

  // Chat engine states
  const [chatActive, setChatActive] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  
  const eventSourceRef = useRef<EventSource | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize and restore session from localStorage
  useEffect(() => {
    setMounted(true)
    const storedSessionId = localStorage.getItem('andres_chat_sessionId')
    const storedMessages = localStorage.getItem('andres_chat_messages')
    
    if (storedSessionId) {
      setSessionId(storedSessionId)
      setChatActive(true)
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages))
        } catch {
          // ignore
        }
      }
    }
  }, [])

  // Auto-scroll within the open chat panel only — never scroll the page behind it.
  useEffect(() => {
    if (!open || !messagesEndRef.current) return
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, open])

  // Establish SSE Connection
  const connectSSE = useCallback((sid: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    const es = new EventSource(`/api/chat/stream?sessionId=${sid}`)
    eventSourceRef.current = es

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'message' && data.sender === 'support') {
          const newMsg: ChatMessage = {
            sender: 'support',
            text: data.text,
            timestamp: data.timestamp || new Date().toISOString(),
          }
          setMessages((prev) => {
            const updated = [...prev, newMsg]
            localStorage.setItem('andres_chat_messages', JSON.stringify(updated))
            return updated
          })
        }
      } catch (err) {
        console.error('[EventSource] Failed parsing data:', err)
      }
    }

    es.onerror = (err) => {
      console.warn('[EventSource] Connection error or reset. Attempting auto-reconnect...', err)
    }
  }, [])

  // Re-establish SSE connection and setup backup long polling for Vercel compatibility
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null

    if (chatActive && sessionId) {
      // Connect standard SSE
      connectSSE(sessionId)

      // Backup Long Polling: polls the server every 3 seconds when the dialog window is open
      if (open) {
        pollingInterval = setInterval(async () => {
          try {
            const res = await fetch(`/api/chat/poll?sessionId=${sessionId}`)
            if (res.ok) {
              const data = await res.json()
              if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
                // If message count is larger, synchronize new replies
                setMessages((prev) => {
                  if (data.messages.length > prev.length) {
                    localStorage.setItem('andres_chat_messages', JSON.stringify(data.messages))
                    return data.messages
                  }
                  return prev
                })
              }
            }
          } catch (err) {
            console.warn('[Chat Poll] Failed polling messages:', err)
          }
        }, 3000)
      }
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [chatActive, sessionId, open, connectSSE])

  const close = useCallback(() => {
    setOpen(false)
    if (!chatActive) {
      setSendState('idle')
    }
  }, [chatActive])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => messageInputRef.current?.focus(), 200)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const triggerFallback = useCallback(async (sid: string) => {
    try {
      const res = await fetch('/api/chat/trigger-fallback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.triggered) {
          // Fetch updated messages (including the fallback reply) from poll
          const pollRes = await fetch(`/api/chat/poll?sessionId=${sid}`);
          if (pollRes.ok) {
            const pollData = await pollRes.json();
            if (pollData.success && Array.isArray(pollData.messages)) {
              setMessages((prev) => {
                if (pollData.messages.length > prev.length) {
                  localStorage.setItem('andres_chat_messages', JSON.stringify(pollData.messages));
                  return pollData.messages;
                }
                return prev;
              });
            }
          }
        }
      }
    } catch (err) {
      console.warn('[Fallback Trigger] Failed:', err);
    }
  }, []);

  // Set up client-side fallback timeout of 3 minutes
  useEffect(() => {
    if (!chatActive || !sessionId || messages.length === 0) {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      return;
    }

    const lastMsg = messages[messages.length - 1];

    if (lastMsg.sender === 'user') {
      const elapsed = Date.now() - new Date(lastMsg.timestamp).getTime();
      const threeMinutes = 180000;

      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }

      if (elapsed >= threeMinutes) {
        triggerFallback(sessionId);
      } else {
        fallbackTimeoutRef.current = setTimeout(() => {
          triggerFallback(sessionId);
        }, threeMinutes - elapsed);
      }
    } else {
      // Last message is support reply or fallback message, clear the timer
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    }

    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    };
  }, [chatActive, sessionId, messages, triggerFallback]);

  // Submit messages
  async function onSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || sendState === 'sending') return
    
    const nextMsgText = message.trim()
    setMessage('') // Clear input immediately for optimal UX

    const newMsg: ChatMessage = {
      sender: 'user',
      text: nextMsgText,
      timestamp: new Date().toISOString(),
    }

    // Speculatively render user message immediately
    setMessages((prev) => {
      const updated = [...prev, newMsg]
      localStorage.setItem('andres_chat_messages', JSON.stringify(updated))
      return updated
    })

    try {
      let activeSid = sessionId
      if (!activeSid) {
        // First message of the conversation: generate a new session ID!
        activeSid = crypto.randomUUID()
        setSessionId(activeSid)
        localStorage.setItem('andres_chat_sessionId', activeSid)
        setChatActive(true)
      }

      setSendState('sending')
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSid,
          name: 'Huviline',
          contact: 'Live Chat',
          message: nextMsgText,
        }),
      })

      if (!res.ok) throw new Error('Reply delivery failed')
      setSendState('idle')
    } catch {
      setSendState('error')
    }
  }

  const resetChat = () => {
    if (confirm('Kas soovite vestluse lähtestada ja uut alustada?')) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
      localStorage.removeItem('andres_chat_sessionId')
      localStorage.removeItem('andres_chat_messages')
      setSessionId(null)
      setMessages([])
      setChatActive(false)
      setMessage('')
      setSendState('idle')
    }
  }

  const shell = (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex justify-end p-5 md:p-8"
      style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex max-w-full flex-col items-end gap-3">
        <div
          id={`${panelId}-dialog`}
          role="dialog"
          aria-modal={open ? "true" : "false"}
          aria-hidden={!open}
          aria-label={CHAT_TITLE}
          aria-labelledby={open ? `${panelId}-title` : undefined}
          data-open={open}
          className="pointer-events-auto w-[min(24rem,calc(100vw-2.5rem))] transition-all duration-200 ease-out data-[open=false]:pointer-events-none data-[open=false]:translate-y-2 data-[open=false]:scale-[0.98] data-[open=false]:opacity-0 data-[open=true]:translate-y-0 data-[open=true]:scale-100 data-[open=true]:opacity-100"
        >
          {open && (
              <GlassPanel className="chat-panel-container relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.65)]" id="chat-dialog-panel">
                <div className="chat-panel-glow pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/[0.07] blur-3xl dark:bg-blue-400/[0.08]" />
                
                <div className="relative flex flex-col h-[480px] max-h-[calc(100vh-140px)]">
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between gap-3 border-b border-slate-200/50 pb-3 dark:border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <p id={`${panelId}-title`} className="chat-panel-eyebrow text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                          {CHAT_TITLE}
                        </p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-foreground/80 leading-snug">
                        {CHAT_INTRO}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {chatActive && (
                        <button
                          type="button"
                          onClick={resetChat}
                          title="Alusta uut vestlust"
                          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={close}
                        className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Sulge"
                      >
                        <X className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>

                  {/* Body: Direct active chat window */}
                  <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* Active Chat Messages History */}
                    <div className={`flex-1 space-y-2.5 pr-1.5 mb-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 ${messages.length === 0 ? 'overflow-hidden flex flex-col justify-center' : 'overflow-y-auto'}`}>
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center p-6 text-muted-foreground text-xs leading-relaxed gap-3">
                          <div className="chat-welcome-icon-box rounded-full bg-blue-50 dark:bg-blue-950/30 p-3 text-blue-500">
                            <MessageCircle className="h-6 w-6" />
                          </div>
                          <p className="max-w-[15rem] text-foreground/80 leading-relaxed">
                            {CHAT_INTRO}
                          </p>
                        </div>
                      ) : (
                        messages.map((msg, i) => {
                          const isUser = msg.sender === 'user'
                          return (
                            <div
                              key={i}
                              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`chat-message-bubble max-w-[85%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed ${
                                  isUser
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-slate-200/70 text-slate-800 dark:bg-white/10 dark:text-slate-100 rounded-bl-none'
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <span className={`block text-[9px] mt-1 opacity-60 text-right`}>
                                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          )
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Error indicator */}
                    {sendState === 'error' && (
                      <Alert variant="error" className="mb-2 text-xs py-2 px-3">
                        Ühendus ebaõnnestus. Proovi uuesti.
                      </Alert>
                    )}

                    {/* Footer Message Input */}
                    <form onSubmit={onSendMessage} className="flex gap-2 border-t border-slate-200/50 pt-2.5 dark:border-white/10">
                      <input
                        type="text"
                        ref={messageInputRef}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value)
                          if (sendState === 'error') setSendState('idle')
                        }}
                        placeholder={CHAT_INPUT_PLACEHOLDER}
                        className="chat-message-input flex-1 rounded-full border border-slate-200 bg-white/95 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 dark:border-white/10 dark:bg-white/[0.08]"
                        disabled={sendState === 'sending' && messages.length === 0}
                      />
                      <button
                        type="submit"
                        disabled={!message.trim()}
                        className="chat-send-btn flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {sendState === 'sending' && messages.length === 0 ? (
                          <Spinner size="sm" className="text-white" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </GlassPanel>
          )}
        </div>

        {/* Floating Bubble Button */}
        <div className="pointer-events-auto flex flex-row items-center gap-3">
          <ScrollToTopButton />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={open ? `${panelId}-dialog` : undefined}
            aria-haspopup="dialog"
            onClick={() => {
              setOpen((v) => !v)
              if (!chatActive) setSendState('idle')
            }}
            className="chat-bubble-btn relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-blue-600 shadow-[0_8px_30px_-12px_rgba(37,99,235,0.45)] backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_36px_-10px_rgba(37,99,235,0.5)] active:scale-[0.97] dark:border-white/12 dark:bg-white/[0.08] dark:text-blue-300 dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)]"
            aria-label={open ? 'Sulge kontaktaken' : 'Ava kontaktaken — küsi Andresele'}
          >
            <span className="absolute inset-0 rounded-full ring-1 ring-blue-500/10 dark:ring-blue-400/15" />
            {open ? (
              <X className="relative h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <MessageCircle className="relative h-[19px] w-[19px]" strokeWidth={1.65} />
            )}
          </button>
        </div>
      </div>
    </div>
  )

  if (hidden || !mounted || typeof document === 'undefined') {
    return null
  }

  return createPortal(shell, document.body)
}
