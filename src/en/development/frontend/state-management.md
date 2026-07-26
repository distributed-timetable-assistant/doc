# State Management

This document defines the principles for implementing **Global State** in Front-end modules based on **Leptos**. The goal is to establish a consistent, maintainable, and extensible pattern for storing and sharing state at the application level.

---

## 1. Hook File Structure for Each Module

Any module that needs to maintain Global State must create a file in the `hooks` directory named after the module. The content of this file must follow the pattern below exactly.

### 1.1. Private Context Struct

- Define a private `struct` with the `Context` suffix (e.g., `SidenavContext`).
- This struct holds the required state fields.
- It must derive/implement `Store` (using `reactive_stores::Store`) so it can be provided as a context in Leptos.
- It must implement `Serialize` and `Deserialize` to enable storage in LocalStorage.

### 1.2. Storage Key

Define a constant for the storage key:

```rust
const LOCALSTORAGE_KEY: &str = "sidenav";
```

### 1.3. Public Mode Struct

Define a public `struct` with the `Mode` suffix that provides the interface for working with the Context to other modules.

Modules and consumers must interact with this state by calling `SidenavMode::new()`:

```rust
let sidenav_ctx = SidenavMode::new();
```

This struct must also implement the `StateProvider` trait.

### 1.4. Full Example

```rust
use dita_state::app_state::StateProvider;
use dita_state::persist_state::{init_ctx, use_ctx, provide};

const LOCALSTORAGE_KEY: &str = "sidenav";

#[derive(Debug, Clone, Copy, Default, Store, Serialize, Deserialize, PartialEq)]
struct SidenavContext {
    pub open: bool,
}

#[derive(Clone, Copy)]
pub struct SidenavMode {
    ctx: Store<SidenavContext>,
}

impl SidenavMode {
    pub fn new() -> Self {
        Self {
            ctx: use_ctx()
                .unwrap_or_else(|| {
                    logging::warn!(
                        "Use Context: FAILED. SidenavContext not initialized at root component, build app state with sidenav state"
                    );
                    init_ctx(LOCALSTORAGE_KEY)
                }),
        }
    }

    pub fn toggle(self) {
        self.ctx.open().update(|v| *v = !*v);
    }

    pub fn is_open(&self) -> Signal<bool> {
        self.ctx.open().into()
    }
}

impl StateProvider for SidenavMode {
    fn provide() {
        provide::<SidenavContext>(LOCALSTORAGE_KEY);
    }
}
```

---

## 2. Integration with `dita-state` and `AppStateBuilder`

Every application that uses the module must register the module's state management struct by passing it to the generic `with` method of the state builder. This ensures that the corresponding provider is executed when the global state is constructed.

Recommended path: `apps/<app-name>/src/state.rs`

```rust
use dita_design_system::hooks::sidenav::SidenavMode;
use dita_state::app_state::AppState;

pub fn init() {
    AppState::builder()
        .with::<SidenavMode>()
        .build();
}
```

---

## 3. Calling Init in the Root Component

The `state::init()` method **must** be called in the application's Root component so that all Global States are provided and become available throughout the component tree:

```rust
// In the Root component
state::init();
```

---

## Workflow Summary

| Step | Location | Action |
|------|----------|--------|
| 1 | `hooks/{module}.rs` | Define private `*Context`, public `*Mode`, storage key, and implement `StateProvider` |
| 2 | `apps/{app}/src/state.rs` | Register the Mode struct using `AppState::builder().with::<ModuleMode>()` |
| 3 | Root component | Call `state::init()` |

By following this pattern, Global States are managed in a consistent, extensible way that aligns with the Leptos architecture and the persistence layer of the `dita_state` library.