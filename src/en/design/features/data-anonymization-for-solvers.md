# Data Anonymization for Solvers

## Status

Proposed

## Motivation

Some institutions (e.g. universities, academies) are unwilling or unable to expose real operational data
(instructors, learners, facilities, locations, internal constraints) to external solver services.

However, DiTA fundamentally relies on third-party or distributed solvers to process scheduling problems.
This creates a direct tension between:
- data privacy and confidentiality, and
- solver effectiveness and correctness.

This feature introduces a **Data Anonymization System** that enables solver participation
without exposing real or sensitive institutional data, while preserving correctness guarantees
or explicitly declaring deviations.

---

## Problem Statement

We need a mechanism that:
- prevents solvers from accessing real institutional data,
- allows solvers to operate on anonymized or transformed packets,
- guarantees that the produced solution is either:
    - equivalent to the solution generated on real data, or
    - explicitly marked as potentially divergent with clear reasons.

This mechanism must be flexible, pluggable, and institution-controlled.

---

## Core Requirements

### R1. Packet Transformation

The system MUST be able to:
- modify packet data,
- and, when required, modify the **structure of the packet** itself,
  to ensure that real data cannot be inferred or reconstructed.

This includes:
- replacing identifiers,
- abstracting entities,
- removing or generalizing sensitive attributes,
- restructuring references to external resources.

---

### R2. Result Equivalence Guarantee

For any anonymized packet:
- The solution produced by processing anonymized data MUST be:
    - equivalent to the solution that would have been produced using real data, **or**
    - accompanied by an explicit declaration of discrepancies and their causes.

The anonymization layer MUST therefore:
- understand the semantic impact of transformations, or
- expose uncertainty clearly and transparently.

---

### R3. Resource Access Interception

The anonymization system MAY alter resource references inside the packet.

#### Problem Example

A packet may contain a statement such as:
> “Use instructors of my university”

If passed directly:
- the solver may request the real university resource,
- leading to leakage of sensitive data.

#### Required Behavior

The anonymization system MUST handle this by one of the following strategies:

1. **Pre-fetch and Embed**
    - Fetch real data from the institution resource.
    - Anonymize it.
    - Embed the anonymized dataset directly inside the packet.

2. **Proxy Resource Redirection**
    - Replace the original resource address in the packet.
    - Redirect it to an anonymization-compliant worker or proxy.
    - This worker:
        - fetches real data,
        - anonymizes it according to defined rules,
        - serves anonymized responses to the solver.

In both cases:
- the solver MUST never access real institutional endpoints directly.

---

### R4. Pluggable Anonymization Systems

DiTA MUST support multiple anonymization systems.

Each anonymization system:
- may define its own rules,
- may implement different transformation strategies,
- may offer different trade-offs between privacy and solver effectiveness.

The **choice of anonymization system** is the responsibility of the institution (customer),
not the platform.

---

### R5. Hard-to-Anonymize Data Handling

Some data types may be:
- extremely difficult to anonymize,
- or fundamentally non-anonymizable without breaking correctness.

A primary example is **location data**.

#### Required Capability

The anonymization system MAY provide alternative computational strategies, such as:
- embedding a distance-calculation worker inside the packet,
- exposing derived metrics (e.g. travel time, distance matrix) instead of raw coordinates,
- or introducing innovative abstractions that preserve solver utility.

If no safe strategy exists:
- the anonymization system MUST declare limitations explicitly.

---

## Non-Goals

- This document does NOT define a specific anonymization algorithm.
- This document does NOT mandate cryptographic techniques.
- This document does NOT define implementation details or deployment topology.

These concerns belong to architecture-level decisions (ADR).

---

## Open Questions

- Where should anonymization be applied: pre-packet, gateway-level, or per-resource?
- How should equivalence or divergence be formally defined and verified?
- What guarantees can realistically be enforced across heterogeneous solvers?
- How should anonymization metadata be exposed to solvers, if at all?

---

## Next Steps

- Evaluate architectural approaches for anonymization placement.
- Define trust boundaries between platform, anonymizer, and solver.
- Create ADR(s) to formalize architectural decisions derived from this design.

