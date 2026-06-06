const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false"
};

function IconFrame({ size, children }) {
  return (
    <svg {...iconProps} width={size} height={size}>
      {children}
    </svg>
  );
}

export function ThemeIcon({ name, size = 16 }) {
  const theme = String(name || "").toLocaleLowerCase("es");

  if (theme.includes("rag")) {
    return (
      <IconFrame size={size}>
        <path d="M5 3.5h9l4 4V13" />
        <path d="M14 3.5V8h4" />
        <path d="M5 3.5v17h7" />
        <circle cx="16" cy="16" r="3.5" />
        <path d="m18.5 18.5 2 2" />
      </IconFrame>
    );
  }

  if (theme.includes("agente")) {
    return (
      <IconFrame size={size}>
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="m10.6 6.5-4.2 9.7M13.4 6.5l4.2 9.7M7 18h10" />
      </IconFrame>
    );
  }

  if (theme.includes("inferencia local")) {
    return (
      <IconFrame size={size}>
        <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />
      </IconFrame>
    );
  }

  if (theme.includes("apple silicon") || theme === "hardware") {
    return (
      <IconFrame size={size}>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
      </IconFrame>
    );
  }

  if (theme.includes("nvidia rtx") || theme === "amd") {
    return (
      <IconFrame size={size}>
        <rect x="3" y="6" width="17" height="12" rx="2" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
        <path d="M20 9h2v6h-2M6 18v2M9 18v2" />
      </IconFrame>
    );
  }

  if (["ollama", "mlx", "llama.cpp", "vllm"].some((runtime) => theme.includes(runtime))) {
    return (
      <IconFrame size={size}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 3 3-3 3M13 15h4" />
      </IconFrame>
    );
  }

  if (theme.includes("modelo")) {
    return (
      <IconFrame size={size}>
        <path d="m12 2.8 8 4.5v9.4l-8 4.5-8-4.5V7.3l8-4.5Z" />
        <path d="m4.4 7.5 7.6 4.3 7.6-4.3M12 11.8v9" />
      </IconFrame>
    );
  }

  if (theme.includes("seguridad")) {
    return (
      <IconFrame size={size}>
        <path d="M12 2.5 19 5v6c0 4.8-2.9 8.3-7 10.5C7.9 19.3 5 15.8 5 11V5l7-2.5Z" />
        <path d="m9 12 2 2 4-4" />
      </IconFrame>
    );
  }

  if (theme.includes("benchmark")) {
    return (
      <IconFrame size={size}>
        <path d="M4 20V10h4v10M10 20V4h4v16M16 20v-7h4v7M2 20h20" />
      </IconFrame>
    );
  }

  if (theme.includes("saas")) {
    return (
      <IconFrame size={size}>
        <path d="m12 3 8 4-8 4-8-4 8-4Z" />
        <path d="m4 7v10l8 4 8-4V7M12 11v10" />
      </IconFrame>
    );
  }

  if (theme.includes("empresa")) {
    return (
      <IconFrame size={size}>
        <path d="M5 21V4h10v17M15 9h4v12M3 21h18" />
        <path d="M8 8h4M8 12h4M8 16h4" />
      </IconFrame>
    );
  }

  if (theme.includes("europa")) {
    return (
      <IconFrame size={size}>
        <circle cx="12" cy="12" r="9" />
        <path d="m12 5 .4.8.9.1-.7.6.2.9-.8-.4-.8.4.2-.9-.7-.6.9-.1.4-.8ZM6.8 8l.4.8.9.1-.7.6.2.9-.8-.4-.8.4.2-.9-.7-.6.9-.1.4-.8ZM17.2 8l.4.8.9.1-.7.6.2.9-.8-.4-.8.4.2-.9-.7-.6.9-.1.4-.8ZM6.8 15l.4.8.9.1-.7.6.2.9-.8-.4-.8.4.2-.9-.7-.6.9-.1.4-.8ZM17.2 15l.4.8.9.1-.7.6.2.9-.8-.4-.8.4.2-.9-.7-.6.9-.1.4-.8Z" />
      </IconFrame>
    );
  }

  if (theme.includes("compra")) {
    return (
      <IconFrame size={size}>
        <path d="M3.5 12.5 12 4h7v7l-8.5 8.5-7-7Z" />
        <circle cx="16" cy="8" r="1" />
      </IconFrame>
    );
  }

  return (
    <IconFrame size={size}>
      <path d="M4 7.5V4h3.5L20 16.5 16.5 20 4 7.5Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </IconFrame>
  );
}
