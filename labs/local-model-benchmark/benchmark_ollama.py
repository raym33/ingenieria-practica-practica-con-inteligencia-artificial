from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.request


DEFAULT_PROMPT = (
    "Eres un asistente tecnico. Explica en cinco puntos como evaluar si un modelo local "
    "sirve para RAG privado en una PYME."
)


def post_json(url: str, payload: dict) -> dict:
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=300) as response:
        return json.loads(response.read().decode("utf-8"))


def approx_tokens(text: str) -> int:
    # Approximation good enough for comparing local runs without tokenizer deps.
    return max(1, int(len(text.split()) * 1.35))


def main() -> None:
    parser = argparse.ArgumentParser(description="Benchmark simple contra Ollama local.")
    parser.add_argument("--model", required=True, help="Nombre del modelo en Ollama.")
    parser.add_argument("--prompt", default=DEFAULT_PROMPT, help="Prompt de prueba.")
    parser.add_argument("--host", default="http://localhost:11434", help="Host de Ollama.")
    args = parser.parse_args()

    url = f"{args.host.rstrip('/')}/api/generate"
    payload = {
        "model": args.model,
        "prompt": args.prompt,
        "stream": False,
        "options": {"temperature": 0.0},
    }

    started = time.perf_counter()
    try:
        result = post_json(url, payload)
    except urllib.error.URLError as error:
        print(f"Could not reach Ollama at {url}: {error}")
        print("Start Ollama and pull a model, for example: ollama pull llama3.2")
        raise SystemExit(1)
    elapsed = time.perf_counter() - started

    response_text = result.get("response", "")
    output_tokens = result.get("eval_count") or approx_tokens(response_text)
    eval_duration_ns = result.get("eval_duration")
    if eval_duration_ns:
        tokens_per_second = output_tokens / (eval_duration_ns / 1_000_000_000)
    else:
        tokens_per_second = output_tokens / elapsed

    report = {
        "model": args.model,
        "elapsed_seconds": round(elapsed, 3),
        "output_tokens": output_tokens,
        "tokens_per_second": round(tokens_per_second, 2),
        "prompt_eval_count": result.get("prompt_eval_count"),
        "eval_count": result.get("eval_count"),
        "total_duration_seconds": round((result.get("total_duration", 0) or 0) / 1_000_000_000, 3),
        "eval_duration_seconds": round((result.get("eval_duration", 0) or 0) / 1_000_000_000, 3),
    }

    print(json.dumps(report, indent=2, ensure_ascii=False))
    print("\nResponse preview:")
    print(response_text[:800].strip())


if __name__ == "__main__":
    main()

