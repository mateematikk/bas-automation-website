const nodes = [
  { label: "CRM", x: 16, y: 20 },
  { label: "Нова пошта", x: 84, y: 18 },
  { label: "M.E.Doc", x: 14, y: 50 },
  { label: "ШІ-агенти", x: 86, y: 48 },
  { label: "Маркетплейси", x: 24, y: 78 },
  { label: "Сайт", x: 78, y: 76 },
] as const;

export function HeroDiagram() {
  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[1.75rem] border border-border bg-white p-3 shadow-xl shadow-slate-900/5 sm:aspect-square sm:p-6"
      aria-label="BAS Expert об’єднує BAS, ШІ-агентів, CRM, сайт, Нову пошту, M.E.Doc і маркетплейси"
      role="img"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="absolute top-[44%] left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl sm:h-40 sm:w-40"
        aria-hidden
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        {nodes.map((node) => (
          <line
            key={node.label}
            x1="50"
            y1="44"
            x2={node.x}
            y2={node.y}
            stroke="#94a3b8"
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
            opacity="0.7"
          />
        ))}
        <circle
          cx="50"
          cy="44"
          r="13"
          fill="#e0f2fe"
          stroke="#0284c7"
          strokeWidth="0.6"
        />
      </svg>

      <div className="absolute top-[44%] left-1/2 z-10 flex h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-navy text-center shadow-lg shadow-slate-900/20 sm:h-24 sm:w-24">
        <span className="text-[9px] font-medium tracking-wider text-sky-200 uppercase sm:text-[10px]">
          BAS Expert
        </span>
        <span className="font-display text-lg font-semibold text-white sm:text-2xl">
          BAS
        </span>
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute z-10 max-w-[7.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-white px-2 py-1.5 text-center text-[10px] font-semibold text-graphite shadow-sm sm:max-w-none sm:px-2.5 sm:text-xs"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}

      <div className="absolute right-3 bottom-3 left-3 rounded-xl border border-border/80 bg-white/95 px-3 py-2 text-center text-[11px] text-muted backdrop-blur-sm sm:text-xs">
        BAS + ШІ + інтеграції в єдиному процесі
      </div>
    </div>
  );
}
