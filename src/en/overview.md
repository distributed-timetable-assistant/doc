# **Overview**

## The Challenge
Educational scheduling is inherently complex. It involves balancing the needs of multiple stakeholders—institutions, instructors, supervisors, and learners—against limited resources like classrooms and labs. Traditional centralized systems often struggle with this complexity, leading to rigid schedules that fail to accommodate individual preferences or adapt to changes.

## The DiTA Solution
The **Distributed Timetable Assistant (DiTA)** addresses these challenges through decentralization. It creates a marketplace where scheduling problems are matched with independent solvers.

### Key Concepts

*   **Institution Packets:** Structured data units where organizations define their participants, courses, constraints, and resources.
*   **Solver Services:** Independent microservices (human or automated) that propose timetable solutions.
*   **Marketplace:** The ecosystem where packets are published and solutions are traded.

### Unique Features

#### 1. Open Ecosystem
DiTA is not just for schools. It is a platform where **anyone** can register and manage resources.
*   **Participants:** Teachers, students, supervisors.
*   **Facilities:** Schools, universities, gyms, laboratories, and more.
*   **Sharing:** Users can share their availability or resources (e.g., a lab renting out empty slots) with the entire network.

#### 2. Hybrid Resource Management
Institutions can define resources in a flexible, hybrid manner:
*   **Dedicated:** Use your own private list of teachers and rooms.
*   **Shared:** Request resources from the public pool.
*   **Conditional:** Define rules like *"If our internal math teachers are fully booked, request a certified math teacher from the platform."*
This applies to all resource types—instructors, classrooms, or even specific equipment.

#### 3. A Hub for Academic Research
Educational timetabling is a vibrant field of research, with dedicated conferences like **PATAT** (Practice and Theory of Automated Timetabling) and international competitions (ITC).
DiTA provides a perfect real-world testbed for researchers:
*   **Real Data:** Researchers can test their algorithms on real-world constraints and data (anonymized if needed).
*   **Benchmarking:** The marketplace acts as a live benchmark where new algorithms can compete against existing ones.
*   **Implementation:** Students and academics can publish their solvers as microservices, moving their work from theoretical papers to practical application.

## How It Works (The User Journey)

1.  **Definition:** An institution defines its requirements (courses, teachers, rooms) and bundles them into an **Institution Packet**.
2.  **Submission:** The packet is submitted to the DiTA network.
3.  **Discovery:** Independent **Solver Services** discover the packet and analyze its complexity.
4.  **Solving:** Solvers generate proposed timetables, optimizing for constraints and preferences.
5.  **Evaluation:** The system scores proposals based on quality, fairness, and rule satisfaction.
6.  **Selection:** The institution selects the best solution, and the winning solver is rewarded.

This process allows for iterative improvement, where schedules can be refined over time to achieve the best possible outcome for everyone involved.

![Overview Flowchart](images/overview-flowchart.png)
