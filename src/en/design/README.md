# **Design**

The **Distributed Timetable Assistant (DiTA)** design focuses on extensibility, fairness, and reactive evaluation. It provides the abstract mechanisms that enable the marketplace described in the [Overview](../overview.md).

![Distributed Timetable Assistant Design](../images/design.png)

---

## Core Mechanisms

### 1. The Marketplace
The marketplace is the decoupling layer between Institutions (demand) and Solvers (supply). It ensures that:
*   **Discovery:** Solvers can find problems that match their capabilities.
*   **Transparency:** All transactions and evaluations are verifiable.
*   **Competition:** Multiple solvers can attempt the same problem, driving up solution quality.

### 2. Reactive Evaluation & Scoring
DiTA employs a **reactive** scoring model. Solution scores are not static; they adjust based on the changing state of resources.
*   **Dynamic Scoring:** If a resource (e.g., a specific lab) becomes overbooked globally, solutions relying on it may see their scores drop in real-time.
*   **Fairness:** The system penalizes conflicts and rewards efficient resource usage proportionally.

### 3. Extensibility
The platform is designed to evolve without breaking existing contracts:
*   **Reward Models:** New ways to incentivize solvers (e.g., tokens, reputation) can be plugged in.
*   **Gamification:** Leaderboards and challenges can be added to the solver layer.
*   **Pluggable Validators:** Institutions can add custom validation logic for their specific constraints.

### 4. Flexible Processing & Privacy
The system supports various processing models to suit different privacy and security needs:
*   **Self-Hosted Processing:** Institutions can run their own solver services to keep data entirely within their infrastructure.
*   **Conditional Processing:** Requests can be routed to specific solvers that meet certain criteria (e.g., "only trusted partners").
*   **Anonymized Processing:** Data can be passed through an anonymization layer before reaching public solvers. The results are transparently de-anonymized upon return, allowing the community to solve the problem without seeing sensitive identity data.

---

## Design Principles

| Principle | Description |
|------------|-------------|
| **Decentralization** | Logic is distributed; no single central scheduler controls the outcome. |
| **Transparency** | Evaluation rules and rewards are clear to all participants. |
| **Reactivity** | The system adapts to state changes in real-time. |
| **Scalability** | Adding more solvers linearly increases the system's problem-solving capacity. |
