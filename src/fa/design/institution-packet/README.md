# بستهٔ مؤسسه

بستهٔ مؤسسه (`Institution Packet`) ساختار و داده‌های کامل یک مؤسسه را در سامانهٔ DITA تعریف می‌کند. این بسته به‌عنوان پیکربندی ریشه برای زمان‌بندی و مدیریت منابع یک مؤسسه عمل می‌کند و شامل تقویم، امکانات، یادگیرندگان، مدرسان، سرپرستان، منابع، موضوعات، دوره‌ها و واحدهای سازمانی آن است.

## مؤلفه‌ها

بستهٔ مؤسسه از چندین Aggregate تشکیل شده است که هرکدام مسئول یک حوزهٔ مشخص از داده‌های مؤسسه هستند:

* **[Calendar](calendar.md)**: تقویم زمان‌بندی مؤسسه را تعریف می‌کند و شامل بازه‌های زمانی تکرارشونده، وضعیت‌های دسترس‌پذیری و تعطیلات است.
* **[Facilities](facilities.md)**: فضاهای فیزیکی مانند کلاس‌های درس، آزمایشگاه‌ها و سالن‌های کنفرانس.
* **[Learners](learners.md)**: افرادی که در دوره‌ها ثبت‌نام کرده‌اند.
* **[Instructors](instructors.md)**: افرادی که مسئول تدریس دوره‌ها هستند.
* **[Supervisors](supervisors.md)**: افرادی که امکانات یا سایر منابع را مدیریت می‌کنند.
* **[Resources](resources.md)**: منابع آموزشی مانند کتاب‌ها و تجهیزات.
* **[Subjects](subjects.md)**: موضوعات آموزشی استاندارد مانند `"Physics 101"`.
* **[Courses](courses.md)**: ارائه‌های زمان‌بندی‌شدهٔ موضوعات.
* **[Units](units.md)**: واحدهای سازمانی مانند دپارتمان‌ها یا مدارس.

## مثال

در ادامه نمونه‌ای از پیکربندی یک بستهٔ مؤسسه در قالب YAML آمده است.

```yaml
apiVersion: apps/v1
kind: InstitutionPacket

name: Brisbane Central Primary School

address:

calendar:
  availabilities:
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

            # Period 2: 09:20 - 10:10
            - type: Basic
              start: 09:20:00
              end: 10:10:00
              rules: []
              status: Available

            # Break 1 (Morning Tea): 10:10 - 10:40 (Excluded)

            # Period 3: 10:40 - 11:30
            - type: Basic
              start: 10:40:00
              end: 11:30:00
              rules: []
              status: Available

            # Consolidation: 12:20 - 13:00
            - type: Basic
              start: 12:20:00
              end: 13:00:00
              rules: []
              status: Available

            # Break 2 (Lunch): 13:00 - 13:30 (Excluded)

            # Period 5: 13:30 - 14:20
            - type: Basic
              start: 13:30:00
              end: 14:20:00
              rules: []
              status: Available

            # Period 6: 14:20 - 15:10
            - type: Basic
              start: 14:20:00
              end: 15:10:00
              rules: []
              status: Available

        - type: Basic
          start:
            day: Fri
            time: 09:20:00
          end:
            day: Fri
            time: 10:10:00
          rules: []
          status: Undesired

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
    calendar:
      availabilities:
    facilities:
    learners:
    instructors:
    supervisors:
    resources:
    subjects:
    courses:
```

فیلد `calendar` شامل تقویم مؤسسه است. ساختار و معنای `availabilities` موجود در آن، به‌صورت جداگانه در مستندات [Calendar](./availabilities.md) تعریف شده است.

واحدها نیز می‌توانند تقویم مخصوص به خود را تعریف کنند؛ زمانی که لازم باشد اطلاعات زمان‌بندی در سطح واحد سازمانی مشخص شود.
