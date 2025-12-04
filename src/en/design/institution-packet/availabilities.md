# Availabilities

Availabilities define specific time ranges along with availability status for scheduling purposes. This system allows for complex scheduling rules including recurring patterns, specific date ranges, and exception handling (like holidays).

## Structure

An availability entry consists of a hierarchical structure of time definitions.

### Top-Level Fields

- **action**: The operation to perform.
    - `Add`: Adds availability for the specified period.
    - `Remove`: Removes availability (e.g., for holidays or exceptions).
- **add-type** (for `Add` action): Defines the scope of the addition.
    - `WeeklyPeriod`: A recurring weekly pattern.
    - `DailyPeriod`: A recurring daily pattern.
    - `MonthlyPeriod`: A recurring monthly pattern.
    - `YearlyPeriod`: A recurring yearly pattern.
    - `Blocks`: A collection of specific time blocks.
    - `Block`: A single specific time block.
- **remove-type** (for `Remove` action): Defines the scope of removal.
    - `Holidays`: Removes time based on public holidays for a specific region.
- **start**: The start date/time of the availability period (ISO 8601 format).
- **end**: The end date/time of the availability period (ISO 8601 format).
- **country** (for `Holidays`): The country code (e.g., "ir", "au-qld") to fetch public holidays for.

### Time Cells

Time cells are nested units that define the granularity of the schedule.

- **action**: `Add` or `Remove`.
- **add-type**: The type of time cell (e.g., `DailyPeriod`, `Block`).
- **start**: Start constraint for the cell (e.g., `08:00`, `Monday`).
- **end**: End constraint for the cell.
- **status**: The availability status for this slot.
    - `Available`: The time is free to be booked.
    - `Unavailable`: The time cannot be booked.
    - `Preferred`: The time is preferred for booking.
    - `Undesired`: The time is not preferred but can be used if necessary.
- **rules**: A list of specific constraints or behaviors (optional).

## Examples

### Brisbane Middle School Schedule

This example demonstrates a school schedule for a middle school in Brisbane, Australia.
- **Days**: Monday to Friday.
- **Hours**: 08:30 to 15:10.
- **Structure**: 6 periods with 2 breaks (Morning Tea and Lunch).
- **Term**: Term 1 (Jan 28) to Term 4 (Dec 12) for 2025.
- **Holidays**: Queensland public holidays are excluded.

```yaml
availabilities:
  # Define the main school term schedule for 2025
  - action: Add
    add-type: WeeklyPeriod
    first-day-of-week: Monday
    start: 2025-01-28T00:00:00+10:00 # Start of Term 1
    end: 2025-12-12T23:59:59+10:00   # End of Term 4
    time-cells:
      - action: Add
        add-type: DailyPeriod
        start: Monday
        end: Friday
        time-cells:
          # Period 1: 08:30 - 09:20
          - action: Add
            add-type: Block
            start: 08:30
            end: 09:20
            status: Available
            rules: []

          # Period 2: 09:20 - 10:10
          - action: Add
            add-type: Block
            start: 09:20
            end: 10:10
            status: Available
            rules: []

          # Break 1 (Morning Tea): 10:10 - 10:40 (Excluded)

          # Period 3: 10:40 - 11:30
          - action: Add
            add-type: Block
            start: 10:40
            end: 11:30
            status: Available
            rules: []

          # Period 4: 11:30 - 12:20
          - action: Add
            add-type: Block
            start: 11:30
            end: 12:20
            status: Available
            rules: []

          # Consolidation: 12:20 - 13:00
          - action: Add
            add-type: Block
            start: 12:20
            end: 13:00
            status: Available
            rules: []

          # Break 2 (Lunch): 13:00 - 13:30 (Excluded)

          # Period 5: 13:30 - 14:20
          - action: Add
            add-type: Block
            start: 13:30
            end: 14:20
            status: Available
            rules: []

          # Period 6: 14:20 - 15:10
          - action: Add
            add-type: Block
            start: 14:20
            end: 15:10
            status: Available
            rules: []

  # Remove Queensland Public Holidays
  - action: Remove
    remove-type: Holidays
    country: "au-qld"
    start: 2025-01-28T00:00:00+10:00
    end: 2025-12-12T23:59:59+10:00
```
