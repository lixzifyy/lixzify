/**
 * The signature hero asset: a custom crystalline sword rendered entirely in
 * SVG so it stays crisp at every size and ships without an image payload.
 * White / pale-pink facets, animated lightning arcs and a slow rune ring.
 */
export default function CrystalSword({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 560"
      role="img"
      aria-label="Crystalline sword with white and pale-pink lightning effects"
      className={className}
    >
      <defs>
        <linearGradient id="blade-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#ffeaf3" />
          <stop offset="100%" stopColor="#ffc7de" />
        </linearGradient>
        <linearGradient id="blade-shade" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6d2e6" />
          <stop offset="100%" stopColor="#847ba6" />
        </linearGradient>
        <linearGradient id="guard" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9b7f5" />
          <stop offset="50%" stopColor="#f6ecff" />
          <stop offset="100%" stopColor="#ffb9d8" />
        </linearGradient>
        <linearGradient id="grip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e0e14" />
          <stop offset="45%" stopColor="#22222e" />
          <stop offset="100%" stopColor="#0b0b10" />
        </linearGradient>
        <radialGradient id="aura" cx="50%" cy="48%" r="52%">
          <stop offset="0%" stopColor="#ff9ec9" stopOpacity="0.30" />
          <stop offset="55%" stopColor="#9b6bff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#9b6bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gem" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#ffa9d0" />
          <stop offset="100%" stopColor="#ff5fa5" />
        </radialGradient>
        <filter id="soft-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bolt-glow" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ambient aura */}
      <ellipse cx="230" cy="290" rx="215" ry="245" fill="url(#aura)" />

      {/* slow-turning rune ring */}
      <g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        className="animate-spin-slow"
      >
        <circle
          cx="230"
          cy="290"
          r="186"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="2 14"
        />
        <circle
          cx="230"
          cy="290"
          r="205"
          fill="none"
          stroke="rgba(255,158,201,0.20)"
          strokeWidth="1"
          strokeDasharray="34 260"
        />
      </g>

      {/* lightning arcs */}
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#bolt-glow)"
        className="animate-flicker"
      >
        <path d="M136 168 L174 214 L146 224 L188 274 L162 282 L200 328" opacity="0.9" />
        <path d="M330 196 L296 240 L322 252 L288 296 L312 306 L276 350" opacity="0.75" />
      </g>
      <g
        fill="none"
        stroke="#ff9ec9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#bolt-glow)"
        className="animate-flicker"
        style={{ animationDelay: "1.6s" }}
      >
        <path d="M126 262 L162 296 L136 306 L172 344" opacity="0.7" />
        <path d="M336 288 L304 322 L328 332 L296 372" opacity="0.6" />
      </g>

      {/* sword */}
      <g
        className="animate-float"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        transform="rotate(-16 230 300)"
      >
        {/* blade — shaded (left) half */}
        <path d="M230 46 L230 320 L196 320 L196 150 Z" fill="url(#blade-shade)" />
        {/* blade — lit (right) half */}
        <path d="M230 46 L264 150 L264 320 L230 320 Z" fill="url(#blade-light)" />
        {/* crystal facets */}
        <path
          d="M230 74 L252 168 L230 210 L208 168 Z"
          fill="#ffffff"
          opacity="0.5"
        />
        <path d="M230 226 L254 276 L230 306 L206 276 Z" fill="#ffffff" opacity="0.28" />
        {/* outer edges */}
        <path
          d="M230 46 L264 150 L264 320 L196 320 L196 150 Z"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <path
          d="M230 46 L230 320"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
        />
        {/* light sweep across the blade */}
        <g clipPath="url(#blade-clip)">
          <rect
            x="180"
            y="40"
            width="46"
            height="300"
            fill="#ffffff"
            opacity="0.55"
            className="animate-sweep"
          />
        </g>
        <clipPath id="blade-clip">
          <path d="M230 46 L264 150 L264 320 L196 320 L196 150 Z" />
        </clipPath>

        {/* crossguard */}
        <path d="M148 322 L312 322 L292 354 L168 354 Z" fill="url(#guard)" />
        <path d="M148 322 L312 322 L304 334 L156 334 Z" fill="#ffffff" opacity="0.55" />
        <path
          d="M148 322 L312 322 L292 354 L168 354 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.25"
        />
        <path d="M144 324 L166 310 L174 336 L152 346 Z" fill="#c9b7f5" opacity="0.9" />
        <path d="M316 324 L294 310 L286 336 L308 346 Z" fill="#ffb9d8" opacity="0.9" />

        {/* grip */}
        <rect x="212" y="354" width="36" height="104" rx="4" fill="url(#grip)" />
        <g stroke="#4a4463" strokeWidth="2" opacity="0.85">
          <path d="M212 372 L248 380" />
          <path d="M212 396 L248 404" />
          <path d="M212 420 L248 428" />
          <path d="M212 444 L248 452" />
        </g>
        <path d="M230 360 L230 452" stroke="rgba(255,158,201,0.45)" strokeWidth="1.5" />

        {/* pommel gem */}
        <path d="M230 456 L258 484 L230 514 L202 484 Z" fill="url(#gem)" filter="url(#soft-glow)" />
        <path
          d="M230 456 L258 484 L230 514 L202 484 Z"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.25"
        />
        <path d="M230 468 L246 484 L230 500 L214 484 Z" fill="#ffffff" opacity="0.6" />
      </g>

      {/* drifting sparks */}
      <g className="animate-float-slow">
        <circle cx="118" cy="150" r="3" fill="#ff9ec9" opacity="0.8" />
        <circle cx="352" cy="176" r="2.5" fill="#ffffff" opacity="0.7" />
        <circle cx="336" cy="424" r="3.5" fill="#9b6bff" opacity="0.7" />
        <circle cx="104" cy="392" r="2" fill="#ffb9d8" opacity="0.8" />
        <circle cx="386" cy="308" r="2" fill="#ffffff" opacity="0.55" />
        <circle cx="82" cy="256" r="2.5" fill="#c9b7f5" opacity="0.7" />
      </g>
    </svg>
  );
}
