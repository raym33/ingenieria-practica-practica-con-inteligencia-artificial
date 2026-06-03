from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ModelPrice:
    name: str
    input_per_million: float
    output_per_million: float


@dataclass(frozen=True)
class Scenario:
    name: str
    monthly_requests: int
    call_depth: float
    input_tokens: int
    output_tokens: int
    retry_rate: float
    cache_hit_rate: float
    expensive_share: float


CHEAP = ModelPrice("small-router-model", 0.15, 0.60)
EXPENSIVE = ModelPrice("frontier-model", 2.50, 10.00)


SCENARIOS = [
    Scenario(
        name="baseline_no_control",
        monthly_requests=120_000,
        call_depth=8,
        input_tokens=8_000,
        output_tokens=700,
        retry_rate=0.25,
        cache_hit_rate=0.05,
        expensive_share=0.90,
    ),
    Scenario(
        name="context_pruned",
        monthly_requests=120_000,
        call_depth=8,
        input_tokens=1_200,
        output_tokens=550,
        retry_rate=0.15,
        cache_hit_rate=0.20,
        expensive_share=0.70,
    ),
    Scenario(
        name="routing_cache_retry_limits",
        monthly_requests=120_000,
        call_depth=3,
        input_tokens=900,
        output_tokens=450,
        retry_rate=0.05,
        cache_hit_rate=0.45,
        expensive_share=0.20,
    ),
]


def blended_cost(input_tokens: float, output_tokens: float, expensive_share: float) -> float:
    cheap_share = 1.0 - expensive_share
    cheap_cost = (
        input_tokens / 1_000_000 * CHEAP.input_per_million
        + output_tokens / 1_000_000 * CHEAP.output_per_million
    )
    expensive_cost = (
        input_tokens / 1_000_000 * EXPENSIVE.input_per_million
        + output_tokens / 1_000_000 * EXPENSIVE.output_per_million
    )
    return cheap_share * cheap_cost + expensive_share * expensive_cost


def scenario_cost(scenario: Scenario) -> float:
    effective_requests = scenario.monthly_requests * (1.0 - scenario.cache_hit_rate)
    calls = effective_requests * scenario.call_depth * (1.0 + scenario.retry_rate)
    return calls * blended_cost(
        scenario.input_tokens,
        scenario.output_tokens,
        scenario.expensive_share,
    )


def main() -> None:
    baseline = scenario_cost(SCENARIOS[0])
    for scenario in SCENARIOS:
        cost = scenario_cost(scenario)
        savings = 0.0 if scenario is SCENARIOS[0] else (1.0 - cost / baseline) * 100
        print(f"{scenario.name}")
        print(f"  monthly_cost_usd: {cost:,.2f}")
        print(f"  savings_vs_baseline: {savings:.1f}%")
        print(f"  call_depth: {scenario.call_depth}")
        print(f"  input_tokens: {scenario.input_tokens}")
        print(f"  retry_rate: {scenario.retry_rate:.0%}")
        print(f"  cache_hit_rate: {scenario.cache_hit_rate:.0%}")
        print(f"  expensive_model_share: {scenario.expensive_share:.0%}")
        print()


if __name__ == "__main__":
    main()

