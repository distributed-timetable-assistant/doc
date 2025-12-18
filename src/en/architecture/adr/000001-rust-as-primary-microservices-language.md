# 003. Select Rust as the Primary Language for Microservices

Date: 2025-12-19

## Status
Accepted

## Context
DiTA is a distributed, solver-centric platform that executes computationally intensive scheduling and optimization workloads.  
The system is composed of multiple independent microservices operating under high concurrency, strict latency constraints, and cost-sensitive infrastructure environments (Kubernetes-based deployments).

The platform’s domain logic is inherently complex, stateful, and highly sensitive to correctness issues such as race conditions, memory corruption, and non-deterministic runtime behavior.  
As the platform is expected to scale horizontally and operate continuously in production, the choice of implementation language has a direct impact on system reliability, operational cost, and long-term maintainability.

## Decision
Rust is selected as the primary implementation language for all core microservices in the DiTA platform.

This decision applies to:
- Solver services
- Scheduling and orchestration services
- Core domain and infrastructure-facing microservices

Rust will be treated as the default and preferred language unless a clear, documented exception is approved via a separate ADR.

## Consequences

### Positive
- Near C/C++ performance with predictable execution characteristics, suitable for solver-heavy workloads.
- Efficient CPU and memory usage, enabling higher service density and lower infrastructure costs.
- Strong compile-time guarantees for memory safety and concurrency, significantly reducing production risk.
- Improved correctness and clarity in modeling complex domain logic.
- Higher overall engineering discipline and long-term codebase quality.

### Negative / Risks
- Steeper learning curve for new contributors.
- Slower initial prototyping compared to higher-level or managed languages.
- Smaller hiring pool compared to more mainstream ecosystems.

### Mitigations
- Clear engineering guidelines and internal documentation.
- Shared libraries, templates, and reference implementations for common service patterns.
- Onboarding materials focused on Rust patterns relevant to DiTA’s architecture.
