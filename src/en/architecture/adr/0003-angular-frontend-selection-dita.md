# 0003. Selecting Angular for the DiTA Frontend

Date: 2026-06-19

## Status

Accepted

## Context

DiTA is a web-based, multi-role, enterprise-grade platform consisting of multiple portals and concurrent workflows, including users, institutions, services, administrative dashboards, complex forms, data tables, reports, and visualizations.

In such a product, the challenge is not merely rendering a user interface. The platform must ensure that:

* The project structure remains predictable over time.
* Separation of concerns is enforced at the file and module levels.
* Onboarding new team members does not introduce significant overhead.
* Large-scale UI development does not lead to architectural degradation.
* A mature ecosystem of enterprise-grade libraries is available for tables, forms, charts, validation, and layout management.
* The system maintains acceptable performance across a wide range of hardware, including older laptops and resource-constrained educational environments.

Therefore, the frontend framework must be selected based on long-term maintainability, structural consistency, ecosystem maturity, and predictable performance rather than solely on initial development speed.

## Decision

Angular is selected as the primary frontend framework for DiTA.

React, Yew, and Flutter are not selected for the primary frontend implementation of the platform.

### Why React Is Not Selected

React follows a less opinionated approach than Angular and delegates many architectural decisions to the development team. While this flexibility can be advantageous in some projects, DiTA benefits from a framework that provides stronger structural conventions and more explicit guidance for long-term development.

For DiTA, we require a framework that:

* Clearly defines modular boundaries.
* Enforces conventions from the beginning.
* Prevents the gradual evolution of the UI into a collection of inconsistent and loosely structured components.

React does not provide this level of opinionation by default. For this project, the risk of architectural drift outweighs the benefits of additional flexibility.

### Why Yew Is Not Selected

Yew uses Rust and the `html!` macro to define views, resulting in a JSX-like development model. While technically interesting, it does not provide the primary advantage sought for DiTA: a mature enterprise-grade UI ecosystem.

DiTA requires mature solutions for:

* Large-scale data grids.
* Charts and dashboards.
* Complex forms.
* Enterprise UI components.
* Calendars and scheduling interfaces.
* Advanced layout and design tooling.

Although Yew offers compelling technical characteristics, it has not yet reached Angular's level of maturity in terms of UI libraries, development experience, talent availability, and enterprise-oriented tooling. As a result, selecting Yew would increase both implementation and maintenance risks.

Additionally, Yew's UI definition model is based on the `html!` macro and does not provide the traditional separation of templates, styles, and logic available in Angular. This does not align with DiTA's architectural goals for frontend code organization and maintainability.

### Why Flutter Is Not Selected

Flutter follows a widget-centric architecture in which the UI is defined as a tree of widgets. This approach is highly effective for cross-platform applications. However, DiTA is fundamentally a web-first product whose requirements revolve around browser-native behavior, DOM integration, web ecosystem compatibility, forms, accessibility, and established enterprise web patterns.

For DiTA, Flutter introduces several trade-offs:

1. Reduced alignment with the broader web ecosystem and its mature libraries.
2. Additional abstraction layers where precise control over structure, semantics, and integration is required.
3. Dependence on the Flutter rendering engine rather than direct interaction with the browser DOM.
4. Increased risk of performance issues in chart-heavy, dashboard-oriented, and highly interactive data-driven scenarios.

In Flutter Web, the rendering path typically follows:

```text
Dart
 ↓
Flutter Engine
 ↓
CanvasKit / HTML Renderer
 ↓
Browser
```

In Angular, rendering is much closer to the browser's native rendering model:

```text
Angular
 ↓
DOM
 ↓
Browser
```

This architectural difference does not imply that Flutter Web is inherently slow. However, it introduces an additional rendering layer between the application and the browser, which can incur performance overhead in certain scenarios.

During an initial evaluation of a Flutter Web prototype, noticeable UI stalls were observed while interacting with charts and hover-driven visualizations on mid-range and older hardware. Although this observation alone is insufficient for a definitive judgment of Flutter, it indicates a higher performance risk for a platform such as DiTA, which relies heavily on dashboards, charts, and data-intensive interactions.

Furthermore, Flutter's primary advantage lies in unified Mobile, Desktop, and Web development. DiTA is currently a web-first platform whose core requirements are better served by technologies that are deeply integrated with the web ecosystem.

For these reasons, Flutter is not considered the most appropriate primary frontend technology for this project.

### Why Angular Is Selected

Angular is a better fit for DiTA because it:

* Is template-first and opinionated, enforcing structure from the outset.
* Provides clearer conventions for long-lived enterprise applications.
* Offers natural separation between templates, styles, and business logic.
* Simplifies code reviews and long-term maintenance in multi-developer teams.
* Has a mature enterprise ecosystem for tables, forms, layouts, charts, and data visualization.
* Works directly with the DOM and standard browser capabilities.
* Delivers more predictable behavior across a wider range of hardware configurations.
* Aligns well with DiTA's requirements for multiple portals, dashboards, and data-driven interfaces.

In summary, Angular reduces architectural disorder, lowers performance risk, and improves the platform's ability to scale and evolve over time.

## Consequences

### Positive Consequences

* Frontend architecture becomes predictable and enforceable.
* Large-scale UI code remains easier to maintain.
* Onboarding new developers becomes simpler.
* Integration of mature web libraries for charts, tables, and dashboards becomes easier.

### Costs and Risks

* Initial boilerplate is greater than in React.
* Angular has a steeper learning curve for developers unfamiliar with the framework.
* Poor team discipline can still lead to complexity and code quality issues.
* Achieving a high-quality architecture requires clear conventions and code review policies.

### Risk Mitigation

* Define a clear modular architecture from the beginning.
* Adopt consistent conventions for feature modules, components, services, and models.
* Limit component size and decompose complex UIs into smaller units.
* Establish an internal design system and shared UI layer.
* Enforce code reviews to prevent architectural drift.
* Define performance budgets and continuously monitor them throughout development.

## Conclusion

Angular is the preferred frontend framework for DiTA because it simultaneously addresses four critical requirements: **structure, maintainability, web ecosystem maturity, and predictable performance**.

While React, Yew, and Flutter each offer advantages in specific contexts, their benefits do not outweigh their associated costs and risks for DiTA's current requirements and long-term growth strategy.
