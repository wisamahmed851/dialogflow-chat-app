import BotAvatar from './BotAvatar';

function formatTime(isoString) {
  try {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function ChatMessage({ message }) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-end gap-2 motion-safe:animate-message-in ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && <BotAvatar size="small" />}
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isBot
            ? 'rounded-bl-sm bg-white text-slate-700 ring-1 ring-slate-200'
            : 'rounded-br-sm bg-teal-600 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span
          className={`mt-1 block font-mono text-[10px] tracking-wide ${
            isBot ? 'text-slate-400' : 'text-teal-100/80'
          }`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
