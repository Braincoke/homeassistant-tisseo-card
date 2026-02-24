# Tisseo Cards for Home Assistant

Custom Lovelace cards for [Tisseo](https://www.tisseo.fr/) (Toulouse, France) transit data in Home Assistant.

## Legal Disclaimer

- This is an **unofficial** community Home Assistant frontend plugin.
- I have **zero affiliation** with Tisseo.
- The "Tisseo" name is used in this repository for discoverability only.
- If Tisseo decides this repository cannot use that name, they can contact me at: `braincoke+contact@protonmail.com`.

## Data License

Transit data displayed by these cards comes from Tisseo/Toulouse Metropole Open Data and is subject to **ODbL 1.0**.

- ODbL full text: https://opendatacommons.org/licenses/odbl/1-0/
- Toulouse Metropole license page: https://data.toulouse-metropole.fr/page/licence

## Available Cards

### 1. Real-Time Departures Card (`tisseo-departures-card`)

Shows departures in real time for one stop or a list of stops.

Single stop example:

```yaml
type: custom:tisseo-departures-card
entity: sensor.tisseo_metro_a_mermoz_balma_gramont_departures
```

Multiple stops in one card:

```yaml
type: custom:tisseo-departures-card
title: My commute
entities:
  - sensor.tisseo_metro_b_ramonville_borderouge_departures
  - sensor.tisseo_lineo_l1_arenes_colomiers_gare_sncf_departures
```

### 2. Nearby Stops Card (`tisseo-nearby-stops-card`)

Shows nearby Tisseo stops based on GPS coordinates from a `person` or `device_tracker` entity.

```yaml
type: custom:tisseo-nearby-stops-card
title: Nearby stops
location_entity: person.me
max_distance: 500
```

### 3. Planned Departures Card (`tisseo-planned-departures-card`)

Displays planned departures (future window) with **one row per departure**, showing **date and time**.

```yaml
type: custom:tisseo-planned-departures-card
entity: sensor.tisseo_metro_b_jean_jaures_ramonville_planned_departures
title: Tomorrow morning
```

Multiple entities:

```yaml
type: custom:tisseo-planned-departures-card
title: Tomorrow morning
entities:
  - sensor.tisseo_bus_21_a_planned_departures
  - sensor.tisseo_tram_t1_b_planned_departures
```

## Features

- Official Tisseo line colors (`line_color`, `line_text_color`)
- Transport-specific styling
- Real-time indicators
- Imminent departure animation
- Service alerts display
- Card sizes: `S`, `M`, `L`, `XL`
- Manual refresh button (departures card)
- Last-updated footer (optional)
- Visual editor for all cards
- Dedicated planned-departures layout (date + time per row)

## Installation

### HACS (recommended)

1. Open HACS > **Frontend** > three-dot menu > **Custom repositories**.
2. Add this repository with category **Lovelace**.
3. Install **Tisseo Departures Card**.
4. Restart Home Assistant.

### Manual

1. Download `tisseo-departures-card.js`.
2. Copy it to `/config/www/community/tisseo-departures-card/`.
3. Go to **Settings > Dashboards > Resources**.
4. Add `/local/community/tisseo-departures-card/tisseo-departures-card.js` as **JavaScript Module**.

## Configuration

Both cards support a visual editor. YAML options are below.

### Real-Time Departures Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | optional | One `_departures` sensor entity |
| `entities` | array | optional | List of `_departures` sensors |
| `title` | string | `""` | Optional card title |
| `card_size` | string | `S` | `S`, `M`, `L`, `XL` |
| `num_departures` | number | `2` | Number of departure times to show (1-5) |
| `time_format` | string | `minutes` | `minutes` or `time` |
| `show_stop_name` | boolean | `true` | Show stop name (single stop mode) |
| `show_realtime` | boolean | `true` | Show real-time indicator dot |
| `show_alerts` | boolean | `true` | Show service alerts |
| `show_last_updated` | boolean | `false` | Show last-updated timestamp |
| `show_refresh` | boolean | `true` | Show refresh button |
| `tap_action` | object | `{action: 'more-info'}` | Tap action |

Notes:
- Provide either `entity` or `entities`.
- If both are provided, `entities` is used.

### Nearby Stops Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `Nearby stops` | Card title |
| `location_entity` | string | required | `person.xxx` or `device_tracker.xxx` with coordinates |
| `max_distance` | number | `500` | Maximum distance in meters |
| `max_results` | number | `5` | Maximum number of stops |
| `show_distance` | boolean | `true` | Show walking distance |
| `auto_refresh` | boolean | `true` | Auto-refresh nearby results |
| `refresh_interval` | number | `60` | Refresh interval in seconds |

### Planned Departures Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | optional | One `_planned_departures` sensor entity |
| `entities` | array | optional | List of `_planned_departures` sensors |
| `title` | string | `""` | Optional card title |
| `card_size` | string | `S` | `S`, `M`, `L`, `XL` |
| `max_departures` | number | `8` | Max departures shown (1-40) |
| `show_stop_name` | boolean | `true` | Show stop name |
| `show_window` | boolean | `true` | Show queried time window |
| `show_realtime` | boolean | `true` | Show real-time/scheduled indicator |
| `tap_action` | object | `{action: 'more-info'}` | Tap action |

Notes:
- Provide either `entity` or `entities`.
- Departures are merged and sorted in chronological order across all selected entities.
- The displayed window is computed as min(`window_start`) to max(`window_end`) across selected entities.

## Requirements

- Home Assistant 2024.1+
- Tisseo integration installed and configured

## Troubleshooting

### Card does not load

1. Hard refresh browser cache.
2. Check **Settings > Dashboards > Resources**.
3. Open browser console for JavaScript errors.

### Entity not found

- Make sure the backend integration is configured.
- Departure entities must start with `sensor.tisseo_` and end with `_departures`.

## License

- Source code: [MIT](LICENSE)
- Open Data: [ODbL 1.0](LICENSE-ODbL-1.0.md)
