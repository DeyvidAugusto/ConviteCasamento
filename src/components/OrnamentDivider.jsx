export function OrnamentDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gold/50 sm:w-20" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none">
        <path
          d="M12 2c1.6 3.2 3.2 4.8 6.4 5.6-3.2.8-4.8 2.4-6.4 5.6-1.6-3.2-3.2-4.8-6.4-5.6C8.8 6.8 10.4 5.2 12 2Z"
          fill="currentColor"
          opacity="0.85"
        />
        <circle cx="12" cy="18" r="1.4" fill="currentColor" />
      </svg>
      <span className="h-px w-12 bg-gold/50 sm:w-20" />
    </div>
  );
}
