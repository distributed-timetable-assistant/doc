# Institution Packet

The Institution Packet defines the complete structure and data for an institution within the DITA system. It serves as the root configuration that encompasses all aspects of an institution's scheduling and resource management, including availabilities, facilities, learners, instructors, and more.

## Components

The Institution Packet is composed of several aggregates, each responsible for a specific domain of the institution's data:

- **[Availabilities](availabilities.md)**: Defines time ranges and availability status for scheduling (e.g., term dates, daily schedules, holidays).
- **[Facilities](facilities.md)**: Physical spaces such as classrooms, labs, and conference halls.
- **[Learners](learners.md)**: Individuals enrolled in courses.
- **[Instructors](instructors.md)**: Individuals responsible for teaching courses.
- **[Supervisors](supervisors.md)**: Individuals who manage facilities or other resources.
- **[Resources](resources.md)**: Educational materials like books and equipment.
- **[Subjects](subjects.md)**: Standard educational topics (e.g., "Physics 101").
- **[Courses](courses.md)**: Scheduled offerings of subjects.
- **[Units](units.md)**: Organizational units like departments or schools.

## Example

Below is an example of a complete Institution Packet configuration in YAML format.

```yaml
apiVersion: apps/v1
kind: InstitutionPacket
name: University of Queensland
address:
availabilities: # Availability define specific time ranges along with availability status for scheduling purposes.
  - action: Add # Add, Remove
    add-type: WeeklyPeriod # DailyPeriod, WeeklyPeriod, MonthlyPeriod, YearlyPeriod, Blocks, Block
    first-day-of-week: Sunday # Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    time-cells:
      - action: Add # Add, Remove
        add-type: DailyPeriod
        rules: []
        time-cells:
          - action: Add # Add, Remove
            add-type: Block
            start: 08:00
            end: 09:30
            status: Available # Available, Unavailable, Preferred, Undesired
            rules: []
          - action: Add # Add, Remove
            add-type: Block
            start: 09:45
            end: 11:15
            status: Available # Available, Unavailable, Preferred, Undesired
            rules: []
          - action: Add # Add, Remove
            add-type: Block
            start: 11:30
            end: 13:00
            status: Available # Available, Unavailable, Preferred, Undesired
            rules: []
        start: Sunday
        end: Thursday
      - action: Add # Add, Remove
        add-type: Blocks
        rules: []
        time-cells:
          - action: Add # Add, Remove
            add-type: Block
            start: FridayT08:00
            end: FridayT09:30
            status: Available # Available, Unavailable, Preferred, Undesired
            rules: []
          - action: Add # Add, Remove
            add-type: Block
            start: FridayT09:45
            end: FridayT11:15
            status: Available # Available, Unavailable, Preferred, Undesired
            rules: []
          - action: Add # Add, Remove
            add-type: Block
            start: FridayT11:30
            end: FridayT13:00
            status: Undesired # Available, Unavailable, Preferred, Undesired
            rules: []
    start: 2025-07-23T07:43:06+10:00
    end: 2026-07-23T07:43:06+10:00
  - action: Remove # Add, Remove
    remove-type: Holidays
    country: "au-qld"
    start: 2025-07-23T07:43:06+10:00
    end: 2026-07-23T07:43:06+10:00
facilities: # Facilities represent physical spaces such as classrooms, labs, gyms, or conference halls that can be scheduled for use.
learners: # Learners are individuals who enroll in courses to receive training or education.
instructors: # Instructors are individuals responsible for teaching and guiding learners in one or more courses.
supervisors: # Individuals assigned to supervise or manage the facility.
resources: # Resources are educational materials such as books, videos, or documents linked to subjects.
subjects: # Subjects define standard educational topics such as “Physics 2” that can be taught across multiple courses.
courses: # Courses are scheduled offerings of a subject, typically linked to a specific instructor and academy.
units: # Organizational units such as schools, departments, or training centers, each with their own scheduling and resources.
  - name: Faculty of Health and Behavioural Sciences
    address:
    availabilities:
    facilities:
    learners:
    instructors:
    supervisors:
    resources:
    subjects:
    courses:
```
