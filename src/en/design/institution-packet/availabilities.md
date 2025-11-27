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

### Iranian School Schedule

This example demonstrates a school schedule for an Iranian institution.
- **Days**: Saturday to Wednesday.
- **Hours**: 08:00 to 13:00.
- **Structure**: Three 1.5-hour blocks per day.
- **Term**: Start of Mehr (approx. Sept 23) to End of Khordad (approx. June 21).
- **Holidays**: Iranian public holidays are excluded.

```yaml
availabilities:
  # Define the main school term schedule
  - action: Add
    add-type: WeeklyPeriod
    first-day-of-week: Saturday
    start: 2025-09-23T00:00:00+03:30 # Start of Mehr
    end: 2026-06-21T23:59:59+03:30   # End of Khordad
    time-cells:
      - action: Add
        add-type: DailyPeriod
        start: Saturday
        end: Wednesday
        time-cells:
          # First Block: 08:00 - 09:30
          - action: Add
            add-type: Block
            start: 08:00
            end: 09:30
            status: Available
            rules: []
          
          # Second Block: 09:45 - 11:15 (15 min break)
          - action: Add
            add-type: Block
            start: 09:45
            end: 11:15
            status: Available
            rules: []
            
          # Third Block: 11:30 - 13:00 (15 min break)
          - action: Add
            add-type: Block
            start: 11:30
            end: 13:00
            status: Available
            rules: []

  # Remove Iranian Public Holidays
  - action: Remove
    remove-type: Holidays
    country: "ir"
    start: 2025-09-23T00:00:00+03:30
    end: 2026-06-21T23:59:59+03:30
```
