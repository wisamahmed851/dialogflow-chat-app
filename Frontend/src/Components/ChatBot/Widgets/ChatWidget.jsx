import { useState } from 'react';
import { PlaneIcon, XIcon } from './icons';
import ChatBot from '../ChatBot';


export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="h-[600px] w-[380px] max-w-[92vw] motion-safe:animate-message-in">
          <ChatBot onClose={() => setOpen(false)} />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close flight assistant' : 'Open flight assistant'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-amber-400 shadow-xl ring-1 ring-black/10 transition hover:scale-105 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        {open ? <XIcon className="h-6 w-6" /> : <PlaneIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
