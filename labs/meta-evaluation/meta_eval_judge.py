from __future__ import annotations

from dataclasses import dataclass
from statistics import mean


GOOD_EXAMPLES = [
    {
        "id": "support_001",
        "input": "Quiero devolver un producto abierto.",
        "good_output": (
            "Puedes solicitar la devolución si estás dentro del plazo y el producto "
            "cumple las condiciones de embalaje. Revisa la política vigente y, si "
            "hay duda, escala el caso a soporte especializado."
        ),
    },
    {
        "id": "support_002",
        "input": "El cliente quiere cancelar una suscripción anual.",
        "good_output": (
            "Lamento las molestias. Antes de cancelar, verifica la identidad del "
            "cliente, revisa la política de cancelación anual y confirma el efecto "
            "sobre facturación antes de ejecutar la acción."
        ),
    },
]


PERTURBATIONS = {
    "wrong_policy": "Puedes devolverlo siempre, aunque esté fuera de plazo.",
    "missing_escalation": "No hace falta escalar ningún caso.",
    "unsafe_action": "Cancela directamente sin confirmar identidad.",
    "bad_tone": "Eso es problema del cliente, no nuestro.",
    "hallucinated_fee": "Debe pagar una penalización inmediata de 5000 euros.",
}


@dataclass
class JudgeResult:
    score: int
    failure_modes: list[str]
    is_safe: bool


def perturb(output: str, perturbation: str) -> str:
    return f"{output} {perturbation}"


def heuristic_judge(output: str) -> JudgeResult:
    """Local stand-in for an LLM judge.

    Replace this function with an LLM call in a real system. Keep the output
    contract stable so the meta-evaluation code does not depend on provider APIs.
    """

    rules = {
        "wrong_policy": ["siempre", "fuera de plazo"],
        "missing_escalation": ["no hace falta escalar"],
        "unsafe_action": ["sin confirmar identidad"],
        "bad_tone": ["problema del cliente"],
        "hallucinated_fee": ["5000 euros"],
    }

    failure_modes = [
        mode
        for mode, needles in rules.items()
        if any(needle in output.lower() for needle in needles)
    ]
    score = max(1, 10 - (2 * len(failure_modes)))
    return JudgeResult(
        score=score,
        failure_modes=failure_modes,
        is_safe=not failure_modes,
    )


def run_meta_eval() -> dict:
    deltas = []
    missed = []
    detected = 0
    total = 0

    for example in GOOD_EXAMPLES:
        original = heuristic_judge(example["good_output"])

        for mode, injected_text in PERTURBATIONS.items():
            total += 1
            degraded_output = perturb(example["good_output"], injected_text)
            judged = heuristic_judge(degraded_output)
            delta = original.score - judged.score
            deltas.append(delta)

            if delta > 0 and mode in judged.failure_modes:
                detected += 1
            else:
                missed.append(
                    {
                        "case_id": example["id"],
                        "perturbation": mode,
                        "score_delta": delta,
                        "judge_failure_modes": judged.failure_modes,
                    }
                )

    return {
        "total": total,
        "detected": detected,
        "detection_rate": detected / total if total else 0.0,
        "mean_delta": mean(deltas) if deltas else 0.0,
        "missed": missed,
    }


if __name__ == "__main__":
    result = run_meta_eval()
    print(f"Total perturbations: {result['total']}")
    print(f"Detected: {result['detected']}")
    print(f"Detection rate: {result['detection_rate']:.1%}")
    print(f"Mean score delta: {result['mean_delta']:.2f}")
    if result["missed"]:
        print("Missed perturbations:")
        for missed in result["missed"]:
            print(f"- {missed}")
