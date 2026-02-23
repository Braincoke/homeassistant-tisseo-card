# Tisseo Departures Cards for Home Assistant

A set of custom Lovelace cards for Home Assistant that display [Tisseo](https://www.tisseo.fr/) (Toulouse, France) public transit departures in a polished, transit-app-inspired design.

## Cards Included

### 1. Single Stop Card (`tisseo-departures-card`)

Displays departures for a single stop in a compact, single-row layout.

```yaml
type: custom:tisseo-departures-card
entity: sensor.tisseo_metro_a_mermoz_balma_gramont_departures
```

### 2. Multi-Stop Card (`tisseo-departures-multi-card`)

Displays multiple stops in a compact vertical list. Ideal for a "My Commute" dashboard.

```yaml
type: custom:tisseo-departures-multi-card
entities:
  - sensor.tisseo_metro_b_ramonville_borderouge_departures
  - sensor.tisseo_lineo_l1_arenes_colomiers_gare_sncf_departures
```

### 3. Nearby Stops Card (`tisseo-nearby-stops-card`)

Shows nearby Tisseo stops based on GPS location from a person or device_tracker entity.

```yaml
type: custom:tisseo-nearby-stops-card
title: Nearby Stops
location_entity: person.me
max_distance: 500
```

## Features

- **Official Tisseo colors** - Line colors are read directly from the Tisseo API (`line_color` and `line_text_color` attributes). Fallback to hardcoded colors for known lines (Metro A/B, Tram T1/T2, etc.).
- **Transport-specific styling** - Metro lines get circular badges, buses and trams get rounded rectangles.
- **Real-time indicators** - Green dot for real-time data, gray for scheduled times.
- **Imminent departure animation** - Pulsing red text when a departure is less than 2 minutes away.
- **Service alerts** - Alert banners with severity-based styling. Tap to see full alert details in a modal.
- **4 card sizes** - S (compact), M, L, XL. Scale all fonts, icons, badges, and spacing proportionally.
- **Manual refresh button** - Tap the refresh icon in the card footer to trigger an immediate data refresh via the integration's button entity.
- **Last updated timestamp** - Optional footer showing when data was last fetched.
- **Skeleton loading** - Beautiful loading animation while data is being fetched.
- **Dark mode support** - Automatically adapts to HA dark/light theme.
- **Visual editor** - Full GUI configuration for all cards. No YAML required.
- **Tap actions** - Configurable tap behavior (more-info dialog or none).
- **Drag-and-drop reordering** - In the multi-card editor, reorder stops by dragging.

## Installation

### HACS (Recommended)

1. Open HACS > **Frontend** > three-dot menu > **Custom repositories**.
2. Add the repository URL with category **Lovelace**.
3. Search for **Tisseo Departures Card** and install.
4. Restart Home Assistant.

### Manual

1. Download `tisseo-departures-card.js`.
2. Copy to `/config/www/community/tisseo-departures-card/`.
3. In HA, go to **Settings > Dashboards > Resources**.
4. Add `/local/community/tisseo-departures-card/tisseo-departures-card.js` as **JavaScript Module**.

## Configuration

All cards have a visual editor. You can also configure via YAML.

### Single Stop Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID of a `_departures` sensor |
| `card_size` | string | `S` | Card size: `S`, `M`, `L`, or `XL` |
| `num_departures` | number | `2` | Number of departure times to show (1-5) |
| `time_format` | string | `minutes` | `minutes` (4') or `time` (18h40) |
| `show_stop_name` | boolean | `true` | Show the stop name |
| `show_realtime` | boolean | `true` | Show real-time indicator dot |
| `show_alerts` | boolean | `true` | Show service alert banner |
| `show_last_updated` | boolean | `false` | Show last updated timestamp |
| `show_refresh` | boolean | `true` | Show manual refresh button |
| `tap_action` | object | `{action: 'more-info'}` | Tap action: `more-info` or `none` |

### Multi-Stop Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entities` | array | **required** | List of `_departures` sensor entity IDs |
| `title` | string | `""` | Optional card title |
| `card_size` | string | `S` | Card size: `S`, `M`, `L`, or `XL` |
| `num_departures` | number | `2` | Departure times per stop (1-5) |
| `time_format` | string | `minutes` | `minutes` or `time` |
| `show_realtime` | boolean | `true` | Show real-time indicator dots |
| `show_alerts` | boolean | `true` | Show alert banner and per-stop alert icons |
| `show_last_updated` | boolean | `false` | Show last updated timestamp |
| `show_refresh` | boolean | `true` | Show manual refresh button |
| `tap_action` | object | `{action: 'more-info'}` | Tap action per row |

### Nearby Stops Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `Arrêts à proximité` | Card title |
| `location_entity` | string | `""` | Entity with GPS coordinates (person.xxx, device_tracker.xxx) |
| `max_distance` | number | `500` | Maximum distance in meters |
| `max_results` | number | `5` | Maximum stops to show |
| `show_distance` | boolean | `true` | Show walking distance |
| `auto_refresh` | boolean | `true` | Auto-refresh periodically |
| `refresh_interval` | number | `60` | Refresh interval in seconds |

## Card Sizes

The `card_size` option scales all visual elements proportionally:

| Element | S (compact) | M | L | XL |
|---------|-------------|---|---|-----|
| Line badge | 36px | 44px | 52px | 62px |
| Stop name | 15px | 18px | 22px | 26px |
| Next departure time | 22px | 28px | 34px | 40px |
| Transport icon | 24px | 30px | 36px | 42px |

## Examples

### Morning Commute Dashboard

```yaml
type: vertical-stack
cards:
  - type: custom:tisseo-departures-card
    entity: sensor.tisseo_metro_a_mermoz_balma_gramont_departures
    card_size: M
    num_departures: 3
    show_refresh: true

  - type: custom:tisseo-departures-multi-card
    title: Alternatives
    card_size: S
    num_departures: 2
    entities:
      - sensor.tisseo_bus_44_mermoz_jolimont_departures
      - sensor.tisseo_lineo_l1_mermoz_castanet_departures
```

### Wall-Mounted Tablet

```yaml
type: custom:tisseo-departures-multi-card
card_size: XL
num_departures: 3
show_alerts: true
show_refresh: true
entities:
  - sensor.tisseo_metro_a_mermoz_balma_gramont_departures
  - sensor.tisseo_metro_b_ramonville_borderouge_departures
  - sensor.tisseo_tram_t1_arenes_aeroconstellation_departures
```

## How It Works

The cards read data from Tisseo integration sensor entities. Each `_departures` sensor exposes rich attributes:

```json
{
  "departures": [
    {
      "line": "A",
      "line_color": "#e2001a",
      "line_text_color": "#FFFFFF",
      "destination": "Balma-Gramont",
      "departure_time": "2025-02-20T18:42:00+01:00",
      "minutes_until": 4,
      "waiting_time": "4 mn",
      "is_realtime": true,
      "transport_mode": "Métro"
    }
  ],
  "alerts": [...],
  "stop_name": "Mermoz",
  "stop_city": "Toulouse",
  "last_updated": "2025-02-20T18:38:00+01:00"
}
```

The **refresh button** works by calling `button.press` on the companion `button.tisseo_*_refresh` entity, which triggers an immediate API fetch in the backend integration.

**Line colors** are sourced from the API's `bgXmlColor`/`fgXmlColor` fields, with a fallback to hardcoded values for known lines. This means even uncommon bus lines display their correct official colors.

## Requirements

- Home Assistant 2024.1 or newer
- [Tisseo Integration](https://github.com/<your-org>/tisseo-homeassistant) installed and configured

## Troubleshooting

### Card not showing
1. Clear browser cache (Ctrl+Shift+R) or bump the resource version (`?v=8`).
2. Verify the resource is loaded: **Settings > Dashboards > Resources**.
3. Check the browser console (F12) for JavaScript errors.

### Entity not found
- Ensure your Tisseo integration is set up and the sensor entity exists.
- Entity IDs must start with `sensor.tisseo_` and end with `_departures`.
- The card editor only shows entities matching this pattern.

### Refresh button not appearing
- The refresh button requires the `button.tisseo_*_refresh` entity to exist. Make sure your Tisseo integration version includes the button platform (v0.2.0+).
- If you added the stop before the button platform existed, remove and re-add the integration entry.

## License

MIT
