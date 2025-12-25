# 000002. DiTA as a Public Platform

Date: 2025-12-25

## Status

Proposed

## Context

DiTA addresses complex educational and institutional scheduling problems that cannot be efficiently
solved by a single centralized service. The problem space inherently involves:

- heterogeneous institutions with distinct constraints,
- multiple categories of users (institutions, instructors, learners, supervisors),
- third-party computational solvers with diverse optimization strategies,
- optional auxiliary services such as data anonymization, validation, and enrichment.

A product-oriented or monolithic service model would:
- limit extensibility,
- constrain innovation to the core team,
- centralize trust and computational responsibility,
- and reduce scalability across domains and geographies.

To support an open ecosystem of participants, solvers, and services, DiTA must decide whether it
operates as:
- a closed scheduling product,
- a managed scheduling service,
- or a public platform with an extensible service and solver ecosystem.

This ADR captures the decision to position DiTA explicitly as a **public platform**.

## Decision

DiTA SHALL be designed, developed, and operated as a **public platform**, not merely as a scheduling service or product.

The platform characteristics are defined as follows:

- DiTA is a **public platform** accessible to all users.
- Membership and basic usage of the platform are **free of charge**.
- Advanced capabilities are provided via **paid plans and services**.
- Institutions and individuals interact with DiTA as platform participants, not passive consumers.
- Solvers and anonymization systems are **first-class platform participants**, not internal-only components.

### Platform Participants

The platform serves the following participant categories:

- Institutions: schools, universities, academies, laboratories, sports facilities.
- Individuals: students, learners, instructors, teachers, supervisors.
- Service Providers:
    - Solver services (internal and external).
    - Data anonymization services (internal and external).
    - Other future auxiliary services compliant with platform standards.

### Revenue Model (Platform-Level)

DiTA revenue is derived from platform participation and service facilitation, including:

- Subscription-based plans for advanced features.
- Dedicated (private) deployments of the full DiTA platform for a single organization.
- Commissions on:
    - rewards paid to solvers for packet resolution,
    - anonymization services applied to packets,
    - any external service executed through the platform.
- Direct revenue from:
    - packet resolution performed by DiTA-operated solvers,
    - packet anonymization performed by DiTA-operated anonymization services.
- Verification and trust services, including:
    - identity verification,
    - reputation and tiering systems,
    - “verified” (blue-check) status for institutions, individuals, solvers, and external services.

At early stages of the platform lifecycle, DiTA SHALL prioritize adoption and ecosystem growth,
and may operate largely free of charge until a sustainable service threshold is reached.

## Consequences

### Positive Consequences

- Enables a scalable ecosystem of independent solvers and services.
- Decouples core platform evolution from optimization and anonymization innovation.
- Supports diverse institutional privacy, trust, and deployment requirements.
- Creates multiple sustainable revenue streams without locking users into a single service model.
- Positions DiTA as infrastructure rather than a single-purpose application.

### Negative Consequences and Risks

- Increased architectural and operational complexity.
- Larger attack surface and stricter security requirements.
- Governance challenges around third-party services and trust boundaries.
- Necessitates formal contracts, APIs, standards, and compliance mechanisms.
- Requires careful balance between openness and platform abuse prevention.

These risks must be mitigated through:
- strong architectural boundaries,
- explicit service contracts,
- clear governance and verification mechanisms,
- and future ADRs defining trust, security, and platform policies.
