# 000002. Select Rust as the Primary Language for Microservices

Date: 2025-12-19

## Status

Accepted (with explicit constraints and exit criteria)

## Context

DiTA is a distributed, computation-heavy platform whose core value is derived from solver quality, scalability, and cost-efficient execution of scheduling workloads. The system consists of multiple microservices with different characteristics, including:

- CPU-bound solver services with high parallelism
- Coordination- and orchestration-heavy services
- I/O-bound control-plane services

Choosing a primary implementation language is a **long-term architectural commitment** that directly impacts:
- Infrastructure cost
- Development velocity
- System reliability
- Hiring and onboarding
- Ability to revise architectural decisions over time

This decision must therefore be justified as a **cost–benefit trade-off**, not as a purely technical or ideological preference.

## Decision

Rust is selected as the **primary (default) language** for DiTA microservices **under clearly defined constraints**, with explicit recognition of its costs, risks, and limits.

Rust is mandatory for:
- Compute-bound services (e.g. solvers, evaluators, optimizers)
- Latency-sensitive or high-throughput services
- Services where memory safety, determinism, and predictable performance materially affect infrastructure cost or correctness

Rust is **not mandatory** for:
- Research, experimentation, or rapid prototyping services
- ML-heavy or numerics-heavy components where ecosystem maturity is critical
- Glue or orchestration services where development speed outweighs runtime efficiency

Non-Rust services must be isolated behind well-defined network boundaries (HTTP/gRPC) and treated as replaceable components.

## Rationale

### Why Rust

Rust provides the following **economic and architectural advantages** for DiTA’s core workloads:

- Strong memory safety guarantees without garbage collection, reducing production risk in long-running services
- Predictable performance characteristics suitable for CPU-intensive solvers
- Low runtime overhead, enabling higher density per node and lower infrastructure cost
- Explicit ownership and concurrency models that align well with distributed, parallel computation

These benefits directly support DiTA’s long-term goals of scalability, cost efficiency, and correctness in solver execution.

### Recognized Costs and Risks

This decision explicitly acknowledges the **non-trivial costs** of adopting Rust:

- Higher onboarding and learning curve compared to mainstream backend languages
- Slower iteration speed for early-stage product exploration
- Increased risk of early abstraction lock-in due to strong type constraints
- Smaller ecosystem for advanced numerical computing and ML compared to Python/C++

Rust can **amplify good design but also harden bad design early**. This risk is accepted and mitigated through scope control and architectural discipline rather than ignored.

## Alternatives Considered

### Go
- Pros: Fast onboarding, strong ecosystem for distributed systems, low operational friction
- Cons: Garbage collection overhead, weaker guarantees for memory and concurrency safety
- Rejected as default due to poorer suitability for compute-heavy solver workloads

### Python
- Pros: Excellent ecosystem for ML and optimization, very fast prototyping
- Cons: Poor runtime performance, higher operational cost at scale
- Accepted as a **secondary language** for research and experimentation only

### C++
- Pros: Maximum performance and mature numerical libraries
- Cons: High maintenance cost, memory safety risks, slower team scalability
- Rejected due to long-term reliability and operational risk

## Scope Control and Boundaries

To prevent overreach, the following constraints apply:

- Rust adoption starts with solver and performance-critical services only
- Control-plane and orchestration services may use alternative languages if justified
- All inter-service communication must occur via explicit network protocols
- No cross-language in-process coupling is allowed

## Exit Criteria and Re-evaluation

This decision is **not irreversible**.

The choice of Rust will be re-evaluated if one or more of the following occur:

- Development velocity becomes a bottleneck to product–market fit
- Hiring or onboarding costs exceed acceptable thresholds
- A significant portion of services are I/O-bound with no measurable performance benefit from Rust
- Operational complexity outweighs infrastructure savings

A formal review must be conducted before expanding Rust to additional service categories.

## Consequences

### Positive
- Lower runtime risk and improved reliability for core solver services
- Reduced infrastructure cost for CPU-bound workloads
- Strong alignment between language semantics and parallel computation needs

### Negative
- Higher upfront development and onboarding cost
- Increased architectural rigidity if boundaries are poorly designed
- Need for disciplined scope control to avoid premature over-engineering

---

This ADR represents a **constrained, economically motivated decision**, not a universal endorsement of Rust.
