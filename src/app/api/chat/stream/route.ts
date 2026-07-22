import { NextRequest } from 'next/server';

// Ensure the streams registry is shared globally across hot reloads and routes
const globalAny = global as any;
if (!globalAny.chatStreams) {
  globalAny.chatStreams = new Map();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'sessionId parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create a new readable stream for SSE
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Save stream controller in the globally accessible registry
      globalAny.chatStreams.set(sessionId, controller);

      // Send initial connection OK event
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected', sessionId })}\n\n`));

      // Periodically send keep-alive comments to prevent network/proxy timeouts
      const keepAliveInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': keep-alive\n\n'));
        } catch {
          // If connection is closed, clear the interval
          clearInterval(keepAliveInterval);
          globalAny.chatStreams.delete(sessionId);
        }
      }, 15000);

      // Clean up when client disconnects
      req.signal.addEventListener('abort', () => {
        clearInterval(keepAliveInterval);
        globalAny.chatStreams.delete(sessionId);
      });
    },
    cancel() {
      globalAny.chatStreams.delete(sessionId);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
