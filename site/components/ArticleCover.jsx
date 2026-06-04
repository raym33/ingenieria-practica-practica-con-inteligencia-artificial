const ACCENTS = ["#c9362c", "#0b6f78", "#d9a441"];

const MOTIF_RULES = [
  { id: "security", terms: ["seguridad"] },
  { id: "benchmark", terms: ["benchmark", "benchmarks"] },
  { id: "memory", terms: ["apple silicon", "mlx"] },
  { id: "terminal", terms: ["vllm", "llama.cpp", "ollama", "lm studio"] },
  { id: "rag", terms: ["rag"] },
  { id: "agents", terms: ["agentes"] },
  { id: "models", terms: ["modelos locales", "modelos"] },
  { id: "chip", terms: ["inferencia local", "hardware", "nvidia rtx", "amd"] }
];

const FALLBACK_MOTIFS = ["security", "benchmark", "models", "chip"];

function hashSlug(slug = "") {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

function normalize(value = "") {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function motifFor({ section, tags, hash }) {
  const haystack = [section, ...tags].map(normalize);
  const rule = MOTIF_RULES.find(({ terms }) => terms.some((term) => haystack.some((value) => value.includes(term))));
  return rule ? rule.id : FALLBACK_MOTIFS[hash % FALLBACK_MOTIFS.length];
}

function SecurityMotif({ accent, ghost = false }) {
  const stroke = ghost ? accent : "#f3f5f7";
  const opacity = ghost ? 1 : 0.9;
  return (
    <g fill="none" stroke={stroke} strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" opacity={opacity}>
      <path d="M180 50 L300 92 V190 C300 270 245 325 180 350 C115 325 60 270 60 190 V92 Z" fill={ghost ? accent : "none"} stroke={accent} />
      <rect x="125" y="175" width="110" height="94" rx="12" />
      <path d="M145 175 V142 C145 112 166 92 180 92 C214 92 235 112 235 142 V175" />
      <path d="M92 292 L268 86" stroke={accent} strokeWidth="16" />
      <path d="M64 248 L122 230 M238 136 L296 118" stroke={accent} strokeWidth="10" />
    </g>
  );
}

function BenchmarkMotif({ accent, ghost = false }) {
  const fill = ghost ? accent : "none";
  return (
    <g fill={fill} stroke={accent} strokeWidth="10" strokeLinejoin="round" opacity={ghost ? 1 : 0.95}>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <rect key={item} x={50 + item * 54} y={270 - item * 34} width="34" height={72 + item * 34} />
      ))}
      <path d="M38 336 H382" fill="none" />
      <path d="M62 244 L132 214 L206 168 L280 126 L356 76" fill="none" stroke="#f3f5f7" strokeLinecap="round" />
    </g>
  );
}

function ModelsMotif({ accent, ghost = false }) {
  const stroke = ghost ? accent : "#f3f5f7";
  const nodes = [[80, 90], [210, 60], [330, 124], [145, 210], [280, 260], [70, 315], [360, 330]];
  const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [3, 5], [4, 6], [1, 4]];
  return (
    <g fill={ghost ? accent : "#12161d"} stroke={stroke} strokeWidth="10" opacity={ghost ? 1 : 0.95}>
      {edges.map(([a, b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
      {nodes.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index % 2 ? 28 : 34} stroke={accent} />)}
    </g>
  );
}

function ChipMotif({ accent, ghost = false }) {
  return (
    <g fill={ghost ? accent : "none"} stroke={accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={ghost ? 1 : 0.95}>
      <rect x="95" y="78" width="220" height="220" rx="18" />
      {[0, 1, 2, 3, 4].map((item) => (
        <g key={item}>
          <line x1={55 + item * 45} y1="48" x2={55 + item * 45} y2="78" />
          <line x1={55 + item * 45} y1="298" x2={55 + item * 45} y2="328" />
          <line x1="65" y1={102 + item * 38} x2="95" y2={102 + item * 38} />
          <line x1="315" y1={102 + item * 38} x2="345" y2={102 + item * 38} />
        </g>
      ))}
      <path d="M140 130 H270 M140 178 H270 M140 226 H270 M160 110 V266 M205 110 V266 M250 110 V266" stroke={ghost ? accent : "#f3f5f7"} strokeWidth="6" />
    </g>
  );
}

function MemoryMotif({ accent, ghost = false }) {
  const cells = [0, 1, 2, 3];
  return (
    <g fill={ghost ? accent : "none"} stroke={accent} strokeWidth="9" strokeLinejoin="round" opacity={ghost ? 1 : 0.95}>
      <rect x="62" y="62" width="286" height="286" rx="14" />
      <rect x="112" y="112" width="186" height="186" rx="10" stroke={ghost ? accent : "#f3f5f7"} />
      {cells.map((row) => cells.map((col) => (
        <rect key={`${row}-${col}`} x={132 + col * 39} y={132 + row * 39} width="25" height="25" rx="3" />
      )))}
      <path d="M205 62 V20 M205 348 V390 M62 205 H20 M348 205 H390" strokeLinecap="round" />
    </g>
  );
}

function AgentsMotif({ accent, ghost = false }) {
  const nodes = [[62, 190], [178, 96], [292, 190], [178, 294]];
  return (
    <g fill={ghost ? accent : "#12161d"} stroke={accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={ghost ? 1 : 0.95}>
      <path d="M92 176 C122 132 139 112 150 104 M208 104 C238 122 260 146 274 174 M276 206 C246 250 225 276 206 290 M150 290 C118 268 96 244 78 210" fill="none" />
      <path d="M146 104 H190 L176 132 M276 174 V216 L248 202 M206 290 H162 L176 262 M78 210 V168 L106 182" fill="none" />
      {nodes.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="34" stroke={ghost ? accent : "#f3f5f7"} />)}
    </g>
  );
}

function RagMotif({ accent, ghost = false }) {
  return (
    <g fill={ghost ? accent : "none"} stroke={accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity={ghost ? 1 : 0.95}>
      <path d="M78 54 H238 L312 128 V330 H78 Z" />
      <path d="M238 54 V128 H312" />
      <path d="M122 154 H248 M122 198 H264 M122 242 H216" stroke={ghost ? accent : "#f3f5f7"} strokeWidth="8" />
      <circle cx="290" cy="260" r="58" />
      <path d="M332 302 L382 352" stroke={ghost ? accent : "#f3f5f7"} strokeWidth="14" />
      <path d="M170 316 C204 350 242 350 276 316" fill="none" />
    </g>
  );
}

function TerminalMotif({ accent, ghost = false }) {
  return (
    <g fill={ghost ? accent : "none"} stroke={accent} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" opacity={ghost ? 1 : 0.95}>
      <rect x="42" y="72" width="330" height="230" rx="16" />
      <path d="M42 124 H372" />
      <circle cx="82" cy="98" r="8" fill={accent} />
      <circle cx="112" cy="98" r="8" fill={accent} />
      <circle cx="142" cy="98" r="8" fill={accent} />
      <path d="M92 176 L132 206 L92 236" stroke={ghost ? accent : "#f3f5f7"} />
      <path d="M164 236 H286 M164 182 H326" stroke={ghost ? accent : "#f3f5f7"} />
    </g>
  );
}

function Motif({ id, accent, ghost = false }) {
  const motifs = {
    security: SecurityMotif,
    benchmark: BenchmarkMotif,
    models: ModelsMotif,
    chip: ChipMotif,
    memory: MemoryMotif,
    agents: AgentsMotif,
    rag: RagMotif,
    terminal: TerminalMotif
  };
  const Component = motifs[id] || motifs.chip;
  return <Component accent={accent} ghost={ghost} />;
}

export function ArticleCover({ slug, section, tags = [], variant = "hero" }) {
  const hash = hashSlug(slug);
  const accent = ACCENTS[hash % ACCENTS.length];
  const motifId = motifFor({ section, tags, hash });
  const shiftX = (hash % 48) - 24;
  const shiftY = ((hash >>> 5) % 34) - 17;
  const ghostOpacity = 0.16 + ((hash >>> 9) % 7) / 100;
  const label = section || "Articulo";

  return (
    <div className={`article-cover article-cover--${variant}`}>
      <svg viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
        <rect width="1200" height="480" fill="#12161d" />
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
          {Array.from({ length: 31 }, (_, index) => <line key={`v-${index}`} x1={index * 40} y1="0" x2={index * 40} y2="480" />)}
          {Array.from({ length: 13 }, (_, index) => <line key={`h-${index}`} x1="0" y1={index * 40} x2="1200" y2={index * 40} />)}
        </g>
        <rect width="1200" height="6" fill={accent} />
        <g opacity={ghostOpacity} transform={`translate(${720 + shiftX} ${38 + shiftY}) scale(1.12)`}>
          <Motif id={motifId} accent={accent} ghost />
        </g>
        <g transform={`translate(${730 - shiftX / 2} ${82 - shiftY / 2}) scale(0.82)`}>
          <Motif id={motifId} accent={accent} />
        </g>
        <text x="58" y="88" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={accent} fontSize="22" letterSpacing="4">
          {label.toUpperCase()}
        </text>
        {variant !== "card" ? (
          <text x="58" y="426" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#6b7480" fontSize="16" letterSpacing="3">
            DE PREGUNTAR A CONSTRUIR
          </text>
        ) : null}
      </svg>
    </div>
  );
}
