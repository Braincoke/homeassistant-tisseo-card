# Tisseo Cards

Custom Lovelace cards for Tisseo transit data in Home Assistant.

## Available cards

- `tisseo-departures-card`: real-time departures for one stop or a list of stops
- `tisseo-nearby-stops-card`: nearby stops from your current location

## Features

- Transport-specific styling (Metro circular badges, Bus/Tram rounded rectangles)
- Official Tisseo line colors
- Real-time indicator dots
- Imminent departure animations
- Visual card editor

## Quick Start

```yaml
type: custom:tisseo-departures-card
entity: sensor.tisseo_metro_a_mermoz_balma_gramont_departures
```

See README for full documentation.
