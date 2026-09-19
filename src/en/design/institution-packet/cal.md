# Calendar

A calendar defines the time availability of an institution or other scheduling entity. It contains a collection of availability entries that describe when a period is active, unavailable, preferred, or undesired.

## Structure

A calendar contains an `avails` collection.

### Calendar

| Field    | Description                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------- |
| `avails` | A list of availability entries. Each entry describes a time range and its scheduling behavior. |

Example:

```yaml
avails:
  - type: Weekly
    start: 2026-01-28T00:00:00+10:00
    end: 2026-12-12T23:59:59+10:00
    ...
```

## Availability Types

Each availability entry has a `type` that determines how its time definition is interpreted.

The following types are supported:

| Type      | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| `Yearly`  | Defines a recurring time pattern based on a month and day of the year.             |
| `Monthly` | Defines a recurring time pattern based on a day of the month.                      |
| `Weekly`  | Defines a recurring time pattern based on days of the week.                        |
| `Daily`   | Defines a recurring time pattern based on a time of day.                           |
| `Basic`   | Defines a direct time range without a recurring calendar pattern.                  |
| `Holiday` | Defines a period associated with public holidays for a specific country or region. |

The `Yearly`, `Monthly`, `Weekly`, and `Daily` types can contain nested time cells, allowing a calendar definition to progressively narrow a time range.

## Common Time Range

Recurring availability types contain a `start` and `end` that define the overall period during which the availability applies.

For example:

```yaml
- type: Weekly
  start: 2026-01-28T00:00:00+10:00
  end: 2026-12-12T23:59:59+10:00
```

The `start` and `end` values use ISO 8601 date-time notation.

Within this range, nested time cells define the recurring portions of the schedule.

## Time Cells

Time cells are nested elements used to progressively describe a recurring schedule.

A time cell has a `type` and may contain:

* `start`
* `end`
* `time_cells`

The available nested types depend on the parent time scope.

### Weekly

A `Weekly` availability describes a recurring schedule within a date-time range.

Its nested time cells can be:

* `Daily`
* `Basic`

Example:

```yaml
- type: Weekly
  start: 2026-01-28T00:00:00+10:00
  end: 2026-12-12T23:59:59+10:00
  time_cells:
    - type: Daily
      ...
    - type: Basic
      ...
```

### Daily

A `Daily` time cell describes a range of days and contains time-based entries.

Its `start` and `end` identify the boundaries of the day range. Each boundary contains:

* `day`: The day of the week.
* `time`: The time within that day.

For example:

```yaml
- type: Daily
  start:
    day: Mon
    time: 00:00:00
  end:
    day: Fri
    time: 23:59:59
  time_cells:
    ...
```

The supported day values are:

| Value | Day       |
| ----- | --------- |
| `Mon` | Monday    |
| `Tue` | Tuesday   |
| `Wed` | Wednesday |
| `Thu` | Thursday  |
| `Fri` | Friday    |
| `Sat` | Saturday  |
| `Sun` | Sunday    |

A `Daily` time cell can contain `Basic` time cells.

### Basic

A `Basic` time cell represents a concrete time interval.

It contains:

| Field     | Description                                                                                                                                                                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`   | Start of the time interval.                                                                                                                                                                                                                                                                                                     |
| `end`     | End of the time interval.                                                                                                                                                                                                                                                                                                       |
| `rules`   | A list of rules associated with the time interval.                                                                                                                                                                                                                                                                              |
| `status`  | The availability status of the time interval.                                                                                                                                                                                                                                                                                   |
| `div_cap` | Defines how the time interval can be divided for scheduling. `0` means the interval is flexible and a scheduled activity may occupy any portion of the interval. `1` means the entire interval can accommodate only one activity. Values greater than `1` allow the interval to be divided for multiple scheduling allocations. |

The `div_cap` field controls the capacity division of the time interval. It does not determine the duration of the individual scheduled activities.

For example, a flexible interval can be defined as:

```yaml
- type: Basic
  start: 07:30:00
  end: 13:00:00
  rules: []
  status: Available
  div_cap: 0
```

With `div_cap: 0`, an activity can be scheduled at any time within the `07:30`–`13:00` interval, subject to the other scheduling constraints. The interval is not required to be treated as a single fixed scheduling slot.

A fixed single-capacity interval can be defined as:

```yaml
- type: Basic
  start: 08:30:00
  end: 09:20:00
  rules: []
  status: Available
  div_cap: 1
```

With `div_cap: 1`, the entire interval represents one scheduling capacity and cannot be used for multiple simultaneous activities.

A divisible interval can be defined with a value greater than `1`:

```yaml
- type: Basic
  start: 08:30:00
  end: 10:10:00
  rules: []
  status: Available
  div_cap: 2
```

With `div_cap: 2`, the interval provides two units of scheduling capacity. Depending on the scheduling requirements, these capacities can be used to accommodate multiple activities within the interval, such as dividing the interval into separate portions or using it for activities that occur on alternating weeks.

A `Basic` time cell does not contain further nested time cells.

## Availability Status

A basic time cell has a `status` describing how the time should be treated by the scheduler.

| Status        | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| `Available`   | The time can be used for scheduling.                                 |
| `Unavailable` | The time cannot be used for scheduling.                              |
| `Preferred`   | The time is preferred for scheduling.                                |
| `Undesired`   | The time should generally be avoided but may be used when necessary. |

For example:

```yaml
- type: Basic
  start: 09:20:00
  end: 10:10:00
  rules: []
  status: Available
  div_cap: 1
```

A different status can be used to express a preference or restriction without removing the time range from the calendar:

```yaml
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
```

## Holidays

A `Holiday` availability represents a holiday-related period.

Unlike the recurring time-cell types, a holiday entry directly defines a date-time range and identifies the country or region whose holiday calendar it represents.

It contains:

| Field     | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `start`   | Start of the holiday-related period.                            |
| `end`     | End of the holiday-related period.                              |
| `country` | Country or regional identifier used for the holiday definition. |
| `status`  | Availability status applied to the holiday period.              |

Example:

```yaml
- type: Holiday
  start: 2026-01-28T00:00:00+10:00
  end: 2026-12-12T23:59:59+10:00
  country: "au-qld"
  status: Unavailable
```

For example, setting the status to `Unavailable` can prevent scheduling during the public holidays represented by the specified region.

## Nesting Rules

The hierarchy of time definitions allows a broad period to be progressively refined.

A typical structure is:

```text
Calendar
└── Availability
    └── Weekly
        ├── Daily
        │   └── Basic
        └── Basic
```

For example, the following structure:

```yaml
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
        - type: Basic
          start: 08:30:00
          end: 09:20:00
          rules: []
          status: Available
          div_cap: 1
```

can be understood as:

1. The availability applies during the specified date-time range.
2. Within that range, it applies from Monday through Friday.
3. Within those days, the specific time interval from `08:30` to `09:20` is available.
4. The interval provides one scheduling capacity because `div_cap` is `1`.

This hierarchical structure allows calendars to represent both broad recurring periods and specific scheduling intervals.

## Complete Example

The following example defines a school calendar for 2026. It contains a weekly schedule for Monday through Friday, individual class periods, excluded breaks, a separate undesired period, and a holiday period for Queensland.

```yaml
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
```
