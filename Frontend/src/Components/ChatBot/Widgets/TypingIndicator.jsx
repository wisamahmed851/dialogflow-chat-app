import { useEffect, useState } from 'react';
import BotAvatar from './BotAvatar';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FLAP_COUNT = 3;
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];


export default function TypingIndicator() {
  const [flaps, setFlaps] = useState(() => Array.from({ length: FLAP_COUNT }, randomChar));

  useEffect(() => {
    const id = setInterval(() => {
      setFlaps(Array.from({ length: FLAP_COUNT }, randomChar));
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-2">
      <BotAvatar size="small" />
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-ink px-3 py-2.5 shadow-sm">
        <div className="flex gap-1">
          {flaps.map((char, i) => (
            <span
              key={`${i}-${char}`}
              className="flex h-6 w-5 items-center justify-center rounded-[3px] bg-slate-800 font-mono text-xs font-bold text-amber-400 motion-safe:animate-flap"
            >
              {char}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
          finding your route
        </span>
      </div>
    </div>
  );
}
