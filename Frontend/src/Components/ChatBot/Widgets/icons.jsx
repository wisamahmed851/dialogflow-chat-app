export function PlaneIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.7 12.6 13 9.8V4.2a1.7 1.7 0 0 0-3.4 0v5.6L1.9 12.6a.9.9 0 0 0-.6.85v1.2a.6.6 0 0 0 .78.57L9.6 13.3v4.6l-2.4 1.7a.6.6 0 0 0-.25.49v1a.5.5 0 0 0 .66.47l3.9-1.3.04.01 3.9 1.3a.5.5 0 0 0 .66-.47v-1a.6.6 0 0 0-.25-.49l-2.4-1.7v-4.6l7.52 1.92a.6.6 0 0 0 .78-.57v-1.2a.9.9 0 0 0-.6-.85Z" />
    </svg>
  );
}

export function SendIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.4 20.6 21 12 3.4 3.4 3 9.8 15 12 3 14.2Z" />
    </svg>
  );
}

export function XIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
