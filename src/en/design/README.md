# **Design**

The **Distributed Timetable Assistant (DTA)** design defines how the system components interact to process scheduling requests, evaluate generated timetables, and reward distributed solvers.  
This design focuses on extensibility, fairness, scalability, and reactive evaluation mechanisms that continuously adapt to resource state changes.

---

## Sequence Diagram

Below is the sequence of interactions between the main entities in DTA.

![DTA Sequence Diagram](images/design.png)

---

## Design Flow

1. **Packet Submission**
   - Each educational institution defines its available resources (instructors, learners, facilities, time blocks, etc.) and associated scheduling rules.
   - These definitions are packaged into an **Institution Packet** and submitted to the DTA platform via the API Gateway.

2. **Packet Analysis**
   - The **Packet Analyzer Service** evaluates the received packet.
   - It determines:
     - The **complexity** of the scheduling problem.
     - The **estimated reward** range for solving it.
   - Metadata (difficulty, constraints, reward model) is registered in the marketplace.

3. **Solver Participation**
   - Authorized **Solver Services** (independent distributed microservices) discover open packets through the marketplace API.
   - Interested solvers fetch the packet and attempt to produce feasible timetables by optimizing for:
     - Rule satisfaction
     - Resource utilization
     - Temporal and spatial constraints
   - Each solver submits its proposed timetable solution back to DTA.

4. **Reactive Evaluation & Scoring**
   - The **Evaluation Engine** scores each proposed solution based on:
     - The number and priority of satisfied rules
     - Penalties for conflicts or resource overuse
     - Quality metrics (balance, fairness, efficiency)
   - The **reward** is calculated proportionally to the score.
   - Scores and rewards are **reactively updated** whenever the resource state changes, ensuring fair valuation of solutions in dynamic environments.

5. **Institution Decision & Payment**
   - The institution reviews all proposed schedules (only seeing their **score**, **demo**, and **reward** preview).
   - Once a preferred schedule is selected:
     - The institution confirms and pays the associated cost.
     - The DTA updates the **global resource state** according to the chosen timetable.

6. **Unsolved or Remaining Problems**
   - Parts of the scheduling problem that remain unsolved can stay in the processing queue.
   - Other solver services can continue submitting new proposals if the institution remains open to further solutions.

---

## Extensibility

DTA is designed for continuous evolution:

- **Reward Models:**  
  New reward models can be introduced (e.g., dynamic token systems, credit multipliers, or milestone bonuses).

- **Gamification Layer:**  
  To encourage participation, DTA can support leaderboard rankings, badges for solver achievements, and seasonal challenges.

- **Adaptive Scoring:**  
  Scoring algorithms can be improved to consider multi-objective optimization, including fairness, priority balancing, or energy efficiency of scheduling computations.

- **Marketplace Plug-ins:**  
  Additional modules (e.g., verification services, audit trails, or external validators) can be added to enhance transparency and reliability.

---

## Core Design Principles

| Principle | Description |
|------------|-------------|
| **Decentralization** | Solving and evaluation are distributed among independent microservices. |
| **Transparency** | Every evaluation and reward is traceable and verifiable. |
| **Reactivity** | Solution scores automatically adjust with changing resource states. |
| **Scalability** | New solver instances can join dynamically to increase computational throughput. |
| **Extensibility** | Supports future features such as gamified reward systems or advanced scoring. |

---

## Summary

The DTA design provides a robust foundation for a decentralized, competitive scheduling ecosystem.  
It ensures that institutions receive high-quality timetables while solvers are fairly rewarded for their computational and algorithmic contributions.  
The system’s modular architecture allows the marketplace, evaluation engine, and solver environment to evolve independently while maintaining consistency and integrity.

---

