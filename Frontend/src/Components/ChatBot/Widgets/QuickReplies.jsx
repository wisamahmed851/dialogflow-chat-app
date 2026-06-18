const SUGGESTIONS = [
  { label: 'Book a flight', value: 'I want to book a flight' },
  { label: 'Flight status', value: 'Check my flight status' },
  { label: 'Manage booking', value: 'I need to manage my booking' },
  { label: 'Baggage info', value: 'Tell me about baggage allowance' },
];

export default function QuickReplies({ onSelect, disabled }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {SUGGESTIONS.map((s) => (
        <button
          key={s.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(s.value)}
          className="shrink-0 rounded-full border border-dashed border-slate-300 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-600 transition hover:border-amber-400 hover:text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
