# Availabilities

Availability define specific time ranges along with availability status for scheduling purposes.

## Time Units

- **time_cell**
    - A basic unit of time allocation.
    - Can contain a list of `rules` to define constraints or specific behaviors.

- **day_cell**
    - start: 00:00
    - end: 23:59

- **week_cell**
    - day_cell
    - day_of_week: FRIDAY

- **month_cell**
    - day_cell
    - day_of_month: 31

- **year_cell**
    - month_cell
    - month_of_year: 12

