# مدیریت State

این سند اصول پیاده‌سازی **Stateهای Global** در ماژول‌های Front-end مبتنی بر **Leptos** را تعریف می‌کند. هدف، ایجاد یک الگوی یکپارچه، قابل‌نگهداری و قابل‌گسترش برای نگهداری و اشتراک‌گذاری State در سطح اپلیکیشن است.

---

## ۱. ساختار فایل Hook برای هر ماژول

هر ماژولی که تصمیم دارد State در سطح Global داشته باشد، باید یک فایل در دایرکتوری `hooks` با نام همان ماژول ایجاد کند. محتوای این فایل باید مطابق الگوی زیر باشد.

### ۱.۱. Struct خصوصی Context

- یک `struct` **خصوصی** با پسوند `Context` (مثال: `SidenavContext`) تعریف شود.
- این struct فیلدهای State مورد نیاز را نگه می‌دارد.
- باید `Store` (با استفاده از `reactive_stores::Store`) را derive / پیاده‌سازی کند تا بتوان آن را به‌عنوان Context در Leptos معرفی کرد.
- باید `Serialize` و `Deserialize` را پیاده‌سازی کند تا امکان ذخیره‌سازی در LocalStorage فراهم شود.

### ۱.۲. کلید ذخیره‌سازی

یک ثابت برای کلید ذخیره‌سازی State تعریف شود:

```rust
const LOCALSTORAGE_KEY: &str = "sidenav";
```

### ۱.۳. Struct عمومی Mode

یک `struct` **عمومی** با پسوند `Mode` تعریف شود. این struct رابطی است که در اختیار خود ماژول و سایر ماژول‌هایی که قصد کار با این State را دارند قرار می‌گیرد.

ماژول‌ها و مصرف‌کنندگان باید با فراخوانی `SidenavMode::new()` با آن کار کنند:

```rust
let sidenav_ctx = SidenavMode::new();
```

این struct باید تریت `StateProvider` را نیز پیاده‌سازی کند.

### ۱.۴. نمونه کامل

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

## ۲. ثبت در اپلیکیشن مصرف‌کننده

هر اپلیکیشنی که از ماژول استفاده می‌کند، باید struct مدیریت State ماژول را با فراخوانی متد جنریک `with` به state builder بدهد تا هنگام ساخت State کلی، provider مربوطه برای مقداردهی فراخوانی شود.

مسیر پیشنهادی: `apps/<app-name>/src/state.rs`

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

## ۳. فراخوانی Init در کامپوننت Root

متد `state::init()` **باید** در کامپوننت Root اپلیکیشن فراخوانی شود تا همه Stateهای Global فراهم شده و در کل درخت کامپوننت‌ها در دسترس قرار گیرند:

```rust
// در کامپوننت Root
state::init();
```

---

## خلاصه جریان کار

| مرحله | مکان | اقدام |
|-------|------|-------|
| ۱ | `hooks/{module}.rs` | تعریف `*Context` خصوصی، `*Mode` عمومی، کلید ذخیره‌سازی و پیاده‌سازی `StateProvider` |
| ۲ | `apps/{app}/src/state.rs` | ثبت Mode از طریق `AppState::builder().with::<ModuleMode>()` |
| ۳ | کامپوننت Root | فراخوانی `state::init()` |

با رعایت این الگو، Stateهای Global به‌صورت یکپارچه و قابل‌گسترش و هم‌راستا با معماری Leptos و لایه persistence کتابخانه `dita_state` مدیریت می‌شوند.

