# Institution Packet

The Institution Packet defines the complete structure and data for an institution within the DITA system. It serves as the root configuration for an institution's scheduling and resource management, including its calendar, facilities, learners, instructors, supervisors, resources, subjects, courses, and organizational units.

## Components

The Institution Packet is composed of several aggregates, each responsible for a specific domain of the institution's data:

* **[Calendar](calendar.md)**: Defines the institution's scheduling calendar, including recurring time periods, availability statuses, and holidays.
* **[Facilities](facilities.md)**: Physical spaces such as classrooms, labs, and conference halls.
* **[Learners](learners.md)**: Individuals enrolled in courses.
* **[Instructors](instructors.md)**: Individuals responsible for teaching courses.
* **[Supervisors](supervisors.md)**: Individuals who manage facilities or other resources.
* **[Resources](resources.md)**: Educational materials such as books and equipment.
* **[Subjects](subjects.md)**: Standard educational topics such as "Physics 101".
* **[Courses](courses.md)**: Scheduled offerings of subjects.
* **[Units](units.md)**: Organizational units such as departments or schools.

## Example

Below is an example of an Institution Packet configuration in YAML format.

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

The `calendar` field contains the institution's calendar. The structure and semantics of its `availabilities` are defined separately in the [Calendar](./availabilities.md) documentation.

Units can also define their own calendar when scheduling information needs to be specified at the unit level.
