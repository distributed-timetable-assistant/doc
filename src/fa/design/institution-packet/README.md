# بسته مؤسسه

Institution Packet ساختار و داده‌های کامل یک مؤسسه را در سیستم DITA تعریف می‌کند. این بسته به‌عنوان پیکربندی ریشه‌ای برای زمان‌بندی و مدیریت منابع یک مؤسسه عمل می‌کند و شامل تقویم، امکانات، یادگیرندگان، مدرسان، سرپرستان، منابع، موضوعات، دوره‌ها و واحدهای سازمانی آن است.

## اجزا

Institution Packet از چندین aggregate تشکیل شده است که هرکدام مسئول یک حوزه مشخص از داده‌های مؤسسه هستند:

* **[Calendar](cal.md)**: تقویم زمان‌بندی مؤسسه را تعریف می‌کند و شامل بازه‌های زمانی تکرارشونده، وضعیت‌های availability، تعطیلات و تقسیم‌بندی ظرفیت زمان‌بندی است.
* **[Facilities](facilities.md)**: فضاهای فیزیکی مانند کلاس‌های درس، آزمایشگاه‌ها و سالن‌های کنفرانس.
* **[Learners](learners.md)**: افرادی که در دوره‌ها ثبت‌نام کرده‌اند.
* **[Instructors](instructors.md)**: افرادی که مسئول تدریس دوره‌ها هستند.
* **[Supervisors](supervisors.md)**: افرادی که امکانات یا سایر منابع را مدیریت می‌کنند.
* **[Resources](resources.md)**: منابع آموزشی مانند کتاب‌ها و تجهیزات.
* **[Subjects](subjects.md)**: موضوعات آموزشی استاندارد مانند `"Physics 101"`.
* **[Courses](courses.md)**: ارائه‌های زمان‌بندی‌شده از موضوعات.
* **[Units](units.md)**: واحدهای سازمانی مانند دپارتمان‌ها یا مدارس.

## مثال

در ادامه نمونه‌ای از پیکربندی یک Institution Packet در قالب YAML آمده است.

```yaml id="f2b6v1"
apiVersion: apps/v1
kind: InstitutionPacket

name: Brisbane Central Primary School

address:

cal:
  avails:
    - type: Weekly
      start: 2026-01-28T00:00:00+10:00
      end: 2026-12-12T23:59:59+10:00
      time_cells:
        - type: Daily
          start:
            day: Mon
            time: 00:00:00
          end:
            day: Fri
            time: 23:59:59
          time_cells:
            # Period 1: 08:30 - 09:20
            - type: Basic
              start: 08:30:00
              end: 09:20:00
              rules: []
              status: Available
              div_cap: 1

            # Period 2: 09:20 - 10:10
            - type: Basic
              start: 09:20:00
              end: 10:10:00
              rules: []
              status: Available
              div_cap: 1

            # Break 1 (Morning Tea): 10:10 - 10:40 (Excluded)

            # Period 3: 10:40 - 11:30
            - type: Basic
              start: 10:40:00
              end: 11:30:00
              rules: []
              status: Available
              div_cap: 1

            # Consolidation: 12:20 - 13:00
            - type: Basic
              start: 12:20:00
              end: 13:00:00
              rules: []
              status: Available
              div_cap: 1

            # Break 2 (Lunch): 13:00 - 13:30 (Excluded)

            # Period 5: 13:30 - 14:20
            - type: Basic
              start: 13:30:00
              end: 14:20:00
              rules: []
              status: Available
              div_cap: 1

            # Period 6: 14:20 - 15:10
            - type: Basic
              start: 14:20:00
              end: 15:10:00
              rules: []
              status: Available
              div_cap: 1

        - type: Basic
          start:
            day: Fri
            time: 09:20:00
          end:
            day: Fri
            time: 10:10:00
          rules: []
          status: Undesired
          div_cap: 1

    - type: Holiday
      start: 2026-01-28T00:00:00+10:00
      end: 2026-12-12T23:59:59+10:00
      country: "au-qld"
      status: Unavailable

facilities:
learners:
instructors:
supervisors:
resources:
subjects:
courses:

units:
  - name: Primary Years
    address:
    cal:
      avails:
    facilities:
    learners:
    instructors:
    supervisors:
    resources:
    subjects:
    courses:
```

فیلد `calendar` شامل تقویم مؤسسه است. این تقویم دارای مجموعه `avails` است که ورودی‌های آن دوره‌های در دسترس و غیرقابل‌استفاده، ترجیحات زمان‌بندی، تعطیلات و تقسیم‌بندی ظرفیت را تعریف می‌کنند. ساختار و معنای اجزای تقویم به‌صورت جداگانه در مستندات [Calendar](./availabilities.md) تعریف شده است.

یک time cell از نوع `Basic` می‌تواند از `div_cap` برای تعیین نحوه تخصیص بازه زمانی خود در زمان‌بندی استفاده کند. مقدار `1` نشان‌دهنده یک ظرفیت زمان‌بندی واحد برای کل بازه است، در حالی که مقادیر بزرگ‌تر از `1` به بازه اجازه می‌دهند چندین تقسیم ظرفیت فراهم کند. مقدار `0` بازه را انعطاف‌پذیر می‌کند و اجازه می‌دهد یک فعالیت زمان‌بندی‌شده هر بخشی از بازه زمانی تعریف‌شده را استفاده کند.

واحدها نیز می‌توانند در صورتی که اطلاعات زمان‌بندی نیاز باشد در سطح واحد تعریف شود، تقویم مستقل خود را داشته باشند.
