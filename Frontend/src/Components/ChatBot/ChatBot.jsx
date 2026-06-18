import { useEffect, useRef, useState } from 'react';
import useChatSocket from '../../hooks/useChatSocket';
import { SendIcon, XIcon } from './Widgets/icons';
import ChatMessage from './Widgets/ChatMessage';
import TypingIndicator from './Widgets/TypingIndicator';
import BotAvatar from './Widgets/BotAvatar';
import QuickReplies from './Widgets/QuickReplies';

const STATUS_COPY = {
  connecting: { label: 'Connecting', dot: 'bg-amber-400 motion-safe:animate-pulse' },
  online: { label: 'Online', dot: 'bg-emerald-400' },
  offline: { label: 'Offline', dot: 'bg-rose-400' },
};

export default function ChatBot({ onClose }) {
  const { status, message, botTyping, sendMessage } = useChatSocket();
  const scrollRef = useRef(null);
  const [draft, setDraft] = useState('');

 

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [message, botTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'online') return;
    sendMessage(draft);
    setDraft('');
  };

  const statusInfo = STATUS_COPY[status];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      {/* Header */}
      <div className="bg-ink px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BotAvatar />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Flight assistant</p>
              <p className="text-sm font-semibold">SkyBot</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {statusInfo.label}
              </span>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ticket-stub perforation */}
      <div className="border-t border-dashed border-slate-200" />

      {/* message */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
      >
        {message.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {botTyping && <TypingIndicator />}
      </div>

      <QuickReplies onSelect={sendMessage} disabled={status !== 'online'} />

      {/* Composer */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={status === 'online' ? 'Type your message…' : 'Reconnecting to SkyBot…'}
          aria-label="Type your message"
          disabled={status !== 'online'}
          className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status !== 'online' || !draft.trim()}
          aria-label="Send message"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink text-amber-400 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
