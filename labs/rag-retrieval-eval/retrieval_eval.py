from __future__ import annotations

import math
import re
from dataclasses import dataclass


@dataclass(frozen=True)
class Document:
    doc_id: str
    tenant: str
    text: str


@dataclass(frozen=True)
class QueryCase:
    query: str
    tenant: str
    expected_doc_ids: set[str]


DOCUMENTS = [
    Document(
        "acme_returns_2026",
        "acme",
        "ACME permite devoluciones durante 30 dias con factura y producto sin modificar.",
    ),
    Document(
        "acme_enterprise_sla",
        "acme",
        "El plan enterprise de ACME tiene soporte prioritario y SLA de 4 horas laborables.",
    ),
    Document(
        "bravo_returns_2026",
        "bravo",
        "BRAVO permite devoluciones durante 14 dias salvo productos abiertos.",
    ),
    Document(
        "acme_security",
        "acme",
        "Los usuarios administradores deben activar MFA y revisar accesos trimestralmente.",
    ),
    Document(
        "bravo_security",
        "bravo",
        "BRAVO exige SSO para cuentas corporativas y bloqueo tras cinco intentos.",
    ),
]


CASES = [
    QueryCase("plazo de devolucion con factura", "acme", {"acme_returns_2026"}),
    QueryCase("soporte prioritario enterprise", "acme", {"acme_enterprise_sla"}),
    QueryCase("politica MFA administradores", "acme", {"acme_security"}),
    QueryCase("devoluciones producto abierto", "bravo", {"bravo_returns_2026"}),
]


def tokenize(text: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def score(query: str, document: Document) -> float:
    query_terms = tokenize(query)
    doc_terms = tokenize(document.text)
    if not query_terms:
        return 0.0
    overlap = len(query_terms & doc_terms)
    return overlap / math.sqrt(len(doc_terms))


def retrieve(query: str, tenant: str, top_k: int = 3, *, enforce_tenant: bool = True) -> list[Document]:
    candidates = DOCUMENTS
    if enforce_tenant:
        candidates = [doc for doc in DOCUMENTS if doc.tenant == tenant]
    ranked = sorted(candidates, key=lambda doc: score(query, doc), reverse=True)
    return ranked[:top_k]


def reciprocal_rank(results: list[Document], expected_ids: set[str]) -> float:
    for index, doc in enumerate(results, start=1):
        if doc.doc_id in expected_ids:
            return 1.0 / index
    return 0.0


def evaluate(top_k: int = 3, *, enforce_tenant: bool = True) -> dict[str, float]:
    hits = 0
    reciprocal_ranks = []
    permission_leaks = 0

    for case in CASES:
        results = retrieve(case.query, case.tenant, top_k=top_k, enforce_tenant=enforce_tenant)
        result_ids = {doc.doc_id for doc in results}
        if result_ids & case.expected_doc_ids:
            hits += 1
        reciprocal_ranks.append(reciprocal_rank(results, case.expected_doc_ids))
        permission_leaks += sum(1 for doc in results if doc.tenant != case.tenant)

    return {
        f"recall@{top_k}": hits / len(CASES),
        "mrr": sum(reciprocal_ranks) / len(reciprocal_ranks),
        "permission_leaks": permission_leaks,
    }


def main() -> None:
    safe = evaluate(enforce_tenant=True)
    unsafe = evaluate(enforce_tenant=False)

    print("With metadata filtering")
    for key, value in safe.items():
        print(f"{key}: {value:.2f}")

    print("\nWithout metadata filtering")
    for key, value in unsafe.items():
        print(f"{key}: {value:.2f}")


if __name__ == "__main__":
    main()

