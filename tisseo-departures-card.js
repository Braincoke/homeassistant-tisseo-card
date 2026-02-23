/**
 * Tisseo Departures Card
 * A custom Lovelace card for displaying Tisseo transit departures
 *
 * @version 1.15.0
 */

const CARD_VERSION = '1.15.0';

// ============================================
// LOCALIZATION
// ============================================
const TRANSLATIONS = {
  fr: {
    just_now: "à l'instant",
    minutes_ago: (n) => `il y a ${n} min`,
    at_time: (h, m) => `à ${h}h${m}`,
    updated: 'Mis à jour',
    last_service: 'Dernier passage',
    retry: 'Réessayer',
    nearby_title: 'Arrêts à proximité',
    no_stops_nearby: 'Aucun arrêt trouvé à proximité',
    loading: 'Chargement...',
    error_location: 'Erreur de géolocalisation',
    error_fetching: 'Erreur lors de la recherche des arrêts',
    error_entity_not_found: (eid) => `Entité non trouvée: ${eid}`,
    error_no_coords: (eid) => `L'entité ${eid} n'a pas de coordonnées GPS`,
    error_no_ha: 'Home Assistant non disponible',
    error_geo_denied: 'Permission refusée. Configurez une entité de localisation',
    error_geo_unavailable: 'Position non disponible. Configurez une entité de localisation',
    error_geo_timeout: "Délai d'attente dépassé",
    error_geo_generic: 'Erreur de géolocalisation. Configurez une entité de localisation',
    refresh: 'Rafraîchir les données',
    update: 'Actualiser',
    tap_for_details: 'Appuyez pour voir les détails',
    tap_for_all_alerts: 'Appuyez pour voir toutes les alertes',
    more_alerts: (n) => `+${n} autre${n > 1 ? 's' : ''} alerte${n > 1 ? 's' : ''}`,
    walk_min: (n) => `~${n} min`,
    no_service: 'Service terminé',
    no_service_detail: 'Plus de passages prévus',
    outage_elevator: 'Ascenseur en panne',
    outage_escalator: 'Escalator en panne',
    outage_count: (n) => `${n} équipement${n > 1 ? 's' : ''} en panne`,
    // Editor labels
    ed_title: 'Titre',
    ed_entity: 'Entité',
    ed_departures: 'Nombre de départs affichés',
    ed_time_format: 'Format horaire',
    ed_card_size: 'Taille de la carte',
    ed_show_stop_name: 'Afficher le nom de l\'arrêt',
    ed_show_realtime: 'Indicateur temps réel',
    ed_show_alerts: 'Afficher les alertes',
    ed_show_last_updated: 'Afficher la dernière mise à jour',
    ed_show_refresh: 'Bouton de rafraîchissement',
    ed_location_entity: 'Entité de localisation',
    ed_location_hint: 'Sélectionnez une entité person.xxx ou device_tracker.xxx',
    ed_browser_geo: 'Géolocalisation du navigateur (HTTPS requis)',
    ed_max_distance: 'Distance maximale (mètres)',
    ed_max_results: "Nombre maximum d'arrêts",
    ed_refresh_interval: 'Intervalle de rafraîchissement (secondes)',
    ed_show_distance: 'Afficher la distance',
    ed_auto_refresh: 'Rafraîchissement automatique',
    ed_current_position: 'Position actuelle',
    ed_minutes: 'Minutes',
    ed_time: 'Heure',
    ed_entities: 'Entités (sensor.tisseo_*_departures)',
    ed_entities_hint: 'Ajoutez les entités de départ à afficher',
    ed_add_entity: 'Ajouter une entité',
    ed_remove: 'Supprimer',
    planned_window: 'Fenêtre',
    planned_no_data: 'Aucune donnée planifiée disponible',
    planned_no_departures: 'Aucun départ dans cette fenêtre',
    ed_planned_entity: 'Entité planifiée',
    ed_max_departures: 'Nombre maximum de départs',
    ed_show_window: 'Afficher la fenêtre horaire',
  },
  en: {
    just_now: 'just now',
    minutes_ago: (n) => `${n} min ago`,
    at_time: (h, m) => `at ${h}:${m}`,
    updated: 'Updated',
    last_service: 'Last service',
    retry: 'Retry',
    nearby_title: 'Nearby stops',
    no_stops_nearby: 'No stops found nearby',
    loading: 'Loading...',
    error_location: 'Location error',
    error_fetching: 'Error fetching stops',
    error_entity_not_found: (eid) => `Entity not found: ${eid}`,
    error_no_coords: (eid) => `Entity ${eid} has no GPS coordinates`,
    error_no_ha: 'Home Assistant not available',
    error_geo_denied: 'Permission denied. Configure a location entity',
    error_geo_unavailable: 'Position unavailable. Configure a location entity',
    error_geo_timeout: 'Request timed out',
    error_geo_generic: 'Geolocation error. Configure a location entity',
    refresh: 'Refresh data',
    update: 'Refresh',
    tap_for_details: 'Tap for details',
    tap_for_all_alerts: 'Tap to see all alerts',
    more_alerts: (n) => `+${n} more alert${n > 1 ? 's' : ''}`,
    walk_min: (n) => `~${n} min`,
    no_service: 'Service ended',
    no_service_detail: 'No more departures scheduled',
    outage_elevator: 'Elevator out of service',
    outage_escalator: 'Escalator out of service',
    outage_count: (n) => `${n} equipment${n > 1 ? 's' : ''} out of service`,
    // Editor labels
    ed_title: 'Title',
    ed_entity: 'Entity',
    ed_departures: 'Number of departures shown',
    ed_time_format: 'Time format',
    ed_card_size: 'Card size',
    ed_show_stop_name: 'Show stop name',
    ed_show_realtime: 'Real-time indicator',
    ed_show_alerts: 'Show alerts',
    ed_show_last_updated: 'Show last updated',
    ed_show_refresh: 'Show refresh button',
    ed_location_entity: 'Location entity',
    ed_location_hint: 'Select a person.xxx or device_tracker.xxx entity',
    ed_browser_geo: 'Browser geolocation (HTTPS required)',
    ed_max_distance: 'Max distance (meters)',
    ed_max_results: 'Max number of stops',
    ed_refresh_interval: 'Refresh interval (seconds)',
    ed_show_distance: 'Show distance',
    ed_auto_refresh: 'Auto refresh',
    ed_current_position: 'Current position',
    ed_minutes: 'Minutes',
    ed_time: 'Time',
    ed_entities: 'Entities (sensor.tisseo_*_departures)',
    ed_entities_hint: 'Add departure entities to display',
    ed_add_entity: 'Add entity',
    ed_remove: 'Remove',
    planned_window: 'Window',
    planned_no_data: 'No planned data available',
    planned_no_departures: 'No departures in this window',
    ed_planned_entity: 'Planned entity',
    ed_max_departures: 'Maximum departures',
    ed_show_window: 'Show time window',
  },
};

/**
 * Get the user's language from Home Assistant.
 * Falls back to 'fr' since this is a Toulouse transit integration.
 */
function getLocale(hass) {
  if (!hass) return 'fr';
  const lang = hass.locale?.language || hass.language || 'fr';
  // Support both 'fr' and 'fr-FR' style locale codes
  const base = lang.split('-')[0].toLowerCase();
  return TRANSLATIONS[base] ? base : 'fr';
}

function t(hass, key, ...args) {
  const lang = getLocale(hass);
  const val = TRANSLATIONS[lang]?.[key] || TRANSLATIONS.fr[key] || key;
  if (typeof val === 'function') return val(...args);
  return val;
}

// Time display modes
const TIME_FORMAT_MINUTES = 'minutes';
const TIME_FORMAT_TIME = 'time';

// Card size configurations
const SIZE_CONFIG = {
  S: {
    // Single card
    rowPadding: '12px 16px',
    iconSize: 24,
    badgeSize: 36,
    badgeFontSize: 18,
    badgePadding: '0 8px',
    stopNameFontSize: 15,
    destinationFontSize: 13,
    timeNextFontSize: 22,
    timeFontSize: 18,
    timeMinWidth: 36,
    infoGap: 2,
    rowGap: 12,
    // Multi card
    multiRowPadding: '10px 16px',
    multiIconSize: 20,
    multiBadgeSize: 32,
    multiBadgeFontSize: 14,
    multiBadgePadding: '0 6px',
    multiStopNameFontSize: 14,
    multiDestinationFontSize: 12,
    multiTimeNextFontSize: 17,
    multiTimeFontSize: 15,
    multiTimeMinWidth: 32,
    multiInfoGap: 0,
    multiRowGap: 12,
    // Alerts
    alertFontSize: 12,
    alertIconSize: 16,
    alertPadding: '8px 12px',
    // Realtime indicator
    realtimeSize: 8,
    multiRealtimeSize: 6,
    // Last updated
    lastUpdatedFontSize: 10,
    lastUpdatedIconSize: 12,
  },
  M: {
    rowPadding: '16px 20px',
    iconSize: 30,
    badgeSize: 44,
    badgeFontSize: 22,
    badgePadding: '0 10px',
    stopNameFontSize: 18,
    destinationFontSize: 15,
    timeNextFontSize: 28,
    timeFontSize: 22,
    timeMinWidth: 44,
    infoGap: 3,
    rowGap: 14,
    multiRowPadding: '14px 20px',
    multiIconSize: 26,
    multiBadgeSize: 40,
    multiBadgeFontSize: 18,
    multiBadgePadding: '0 8px',
    multiStopNameFontSize: 17,
    multiDestinationFontSize: 14,
    multiTimeNextFontSize: 22,
    multiTimeFontSize: 19,
    multiTimeMinWidth: 40,
    multiInfoGap: 2,
    multiRowGap: 14,
    alertFontSize: 13,
    alertIconSize: 18,
    alertPadding: '10px 14px',
    realtimeSize: 10,
    multiRealtimeSize: 8,
    lastUpdatedFontSize: 11,
    lastUpdatedIconSize: 13,
  },
  L: {
    rowPadding: '20px 24px',
    iconSize: 36,
    badgeSize: 52,
    badgeFontSize: 26,
    badgePadding: '0 12px',
    stopNameFontSize: 22,
    destinationFontSize: 17,
    timeNextFontSize: 34,
    timeFontSize: 26,
    timeMinWidth: 52,
    infoGap: 4,
    rowGap: 16,
    multiRowPadding: '18px 24px',
    multiIconSize: 32,
    multiBadgeSize: 48,
    multiBadgeFontSize: 22,
    multiBadgePadding: '0 10px',
    multiStopNameFontSize: 20,
    multiDestinationFontSize: 16,
    multiTimeNextFontSize: 26,
    multiTimeFontSize: 22,
    multiTimeMinWidth: 48,
    multiInfoGap: 3,
    multiRowGap: 16,
    alertFontSize: 14,
    alertIconSize: 20,
    alertPadding: '12px 16px',
    realtimeSize: 12,
    multiRealtimeSize: 10,
    lastUpdatedFontSize: 12,
    lastUpdatedIconSize: 14,
  },
  XL: {
    rowPadding: '24px 28px',
    iconSize: 42,
    badgeSize: 62,
    badgeFontSize: 30,
    badgePadding: '0 14px',
    stopNameFontSize: 26,
    destinationFontSize: 20,
    timeNextFontSize: 40,
    timeFontSize: 30,
    timeMinWidth: 60,
    infoGap: 5,
    rowGap: 18,
    multiRowPadding: '22px 28px',
    multiIconSize: 38,
    multiBadgeSize: 56,
    multiBadgeFontSize: 26,
    multiBadgePadding: '0 12px',
    multiStopNameFontSize: 24,
    multiDestinationFontSize: 18,
    multiTimeNextFontSize: 32,
    multiTimeFontSize: 26,
    multiTimeMinWidth: 56,
    multiInfoGap: 4,
    multiRowGap: 18,
    alertFontSize: 16,
    alertIconSize: 22,
    alertPadding: '14px 18px',
    realtimeSize: 14,
    multiRealtimeSize: 12,
    lastUpdatedFontSize: 13,
    lastUpdatedIconSize: 15,
  },
};

function getSizeConfig(size) {
  return SIZE_CONFIG[size] || SIZE_CONFIG.S;
}

// Transport mode configurations
const TRANSPORT_CONFIG = {
  metro: {
    icon: 'mdi:subway-variant',
    colors: {
      A: '#e2001a',
      B: '#ffcd00',
    },
    defaultColor: '#666666',
  },
  tram: {
    icon: 'mdi:tram',
    colors: {
      T1: '#003d7d',
      T2: '#c800a1',
    },
    defaultColor: '#0074be',
  },
  bus: {
    icon: 'mdi:bus',
    defaultColor: '#00a651',
  },
  lineo: {
    icon: 'mdi:bus-articulated-front',
    defaultColor: '#004a9b',
  },
};

// Detect transport type from entity ID or attributes
function getTransportType(entityId, attributes) {
  // First check attributes for transport_mode
  if (attributes?.departures?.[0]?.transport_mode) {
    const mode = attributes.departures[0].transport_mode.toLowerCase();
    if (mode.includes('métro') || mode.includes('metro')) return 'metro';
    if (mode.includes('tram')) return 'tram';
    if (mode.includes('linéo') || mode.includes('lineo')) return 'lineo';
    return 'bus';
  }

  // Fallback to entity ID parsing
  const id = entityId.toLowerCase();
  if (id.includes('metro')) return 'metro';
  if (id.includes('tram')) return 'tram';
  if (id.includes('lineo')) return 'lineo';
  return 'bus';
}

function getLineFromEntity(entityId) {
  // Extract line from entity ID like sensor.tisseo_metro_a_mermoz_balma_gramont_departures
  // Format: sensor.tisseo_<transport>_<line>_<stop>_<direction>_<type>
  const match = entityId.match(/sensor\.tisseo_\w+_([a-z0-9]+)_/i);
  if (match) {
    return match[1].toUpperCase();
  }
  return '';
}

function getRefreshButtonEntityId(departuresEntityId) {
  // Derive button.tisseo_xxx_refresh from sensor.tisseo_xxx_departures
  return departuresEntityId
    .replace('sensor.', 'button.')
    .replace('_departures', '_refresh');
}

function getLineColor(transportType, line, apiColor) {
  // Prefer API-provided color (from Tisseo line data), fall back to hardcoded config
  if (apiColor && apiColor !== '#808080') {
    // Tisseo API returns colors without '#' prefix — normalize
    return apiColor.startsWith('#') ? apiColor : `#${apiColor}`;
  }
  const config = TRANSPORT_CONFIG[transportType];
  if (config?.colors?.[line]) {
    return config.colors[line];
  }
  return config?.defaultColor || '#666666';
}

function getTransportIcon(transportType) {
  return TRANSPORT_CONFIG[transportType]?.icon || 'mdi:bus';
}

function getContrastColor(color) {
  if (!color) return '#ffffff';
  let r, g, b;
  // Handle rgb(r, g, b) format
  const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbMatch) {
    r = parseInt(rgbMatch[1], 10);
    g = parseInt(rgbMatch[2], 10);
    b = parseInt(rgbMatch[3], 10);
  } else {
    // Handle hex (3-char or 6-char)
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#ffffff';
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function formatMinutes(minutes) {
  if (minutes === undefined || minutes === null) return '--';
  if (minutes < 1) return '<1\'';
  return `${Math.round(minutes)}'`;
}

function formatDepartureTime(departureTimeStr, use24h = true) {
  if (!departureTimeStr) return '--';
  try {
    const date = new Date(departureTimeStr);
    if (isNaN(date.getTime())) return '--';
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    if (use24h) {
      return `${hours}h${minutes}`;
    } else {
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes} ${period}`;
    }
  } catch (e) {
    return '--';
  }
}

function formatTime(departure, timeFormat) {
  if (timeFormat === TIME_FORMAT_TIME) {
    return formatDepartureTime(departure?.departure_time);
  }
  return formatMinutes(departure?.minutes_until);
}

function formatLastUpdated(isoString, hass) {
  if (!isoString) return null;
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return null;
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);

    if (diffSecs < 60) {
      return t(hass, 'just_now');
    } else if (diffMins < 60) {
      return t(hass, 'minutes_ago', diffMins);
    } else {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return t(hass, 'at_time', hours, minutes);
    }
  } catch (e) {
    return null;
  }
}

function formatPlannedDateTimeParts(isoString, hass) {
  if (!isoString) return { date: '--', time: '--' };
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return { date: '--', time: '--' };
    const locale = getLocale(hass) === 'fr' ? 'fr-FR' : 'en-US';
    const dateLabel = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    }).format(date);
    const timeLabel = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
    return { date: dateLabel, time: timeLabel };
  } catch (e) {
    return { date: '--', time: '--' };
  }
}

// Loading skeleton CSS
const SKELETON_CSS = `
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      var(--secondary-background-color, #f0f0f0) 0px,
      var(--primary-background-color, #e0e0e0) 40px,
      var(--secondary-background-color, #f0f0f0) 80px
    );
    background-size: 200px 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
  }

  .skeleton-circle {
    border-radius: 50%;
  }

  .skeleton-row {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
  }

  .skeleton-icon {
    width: 24px;
    height: 24px;
  }

  .skeleton-badge {
    width: 36px;
    height: 36px;
  }

  .skeleton-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skeleton-text {
    height: 14px;
  }

  .skeleton-text.title {
    width: 70%;
    height: 16px;
  }

  .skeleton-text.subtitle {
    width: 50%;
  }

  .skeleton-times {
    display: flex;
    gap: 8px;
  }

  .skeleton-time {
    width: 32px;
    height: 20px;
  }

  .skeleton-time.large {
    width: 40px;
    height: 24px;
  }
`;

// Alert severity configuration with light/dark mode colors
const ALERT_SEVERITY_CONFIG = {
  critical: {
    icon: 'mdi:alert-circle',
    color: '#dc3545',
    bgColorLight: '#fff5f5',
    bgColorDark: 'rgba(220, 53, 69, 0.15)',
    borderColor: '#dc3545',
  },
  warning: {
    icon: 'mdi:alert',
    color: '#ff9800',
    bgColorLight: '#fff8e1',
    bgColorDark: 'rgba(255, 152, 0, 0.15)',
    borderColor: '#ff9800',
  },
  info: {
    icon: 'mdi:information',
    color: '#2196f3',
    bgColorLight: '#e3f2fd',
    bgColorDark: 'rgba(33, 150, 243, 0.15)',
    borderColor: '#2196f3',
  },
};

// Detect if dark mode is active
function isDarkMode() {
  // Check for Home Assistant dark theme
  const root = document.documentElement;
  const bgColor = getComputedStyle(root).getPropertyValue('--primary-background-color').trim();
  if (bgColor) {
    // Parse the color and check if it's dark
    const hex = bgColor.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  }
  // Fallback to media query
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getAlertBgColor(config) {
  return isDarkMode() ? config.bgColorDark : config.bgColorLight;
}

function getAlertConfig(severity) {
  return ALERT_SEVERITY_CONFIG[severity] || ALERT_SEVERITY_CONFIG.info;
}

// Show alerts modal
function showAlertsModal(alerts, title = 'Alertes de service') {
  // Remove existing modal if any
  const existingModal = document.getElementById('tisseo-alerts-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Sort alerts by severity
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityOrder = { critical: 3, warning: 2, info: 1 };
    return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
  });

  const darkMode = isDarkMode();

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'tisseo-alerts-modal';
  modal.innerHTML = `
    <style>
      #tisseo-alerts-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }

      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, ${darkMode ? '0.7' : '0.5'});
      }

      .modal-content {
        position: relative;
        background: var(--card-background-color, ${darkMode ? '#1c1c1c' : '#fff'});
        border-radius: 12px;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 20px rgba(0, 0, 0, ${darkMode ? '0.5' : '0.3'});
        overflow: hidden;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, ${darkMode ? '#333' : '#e0e0e0'});
      }

      .modal-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color, ${darkMode ? '#fff' : '#212121'});
        margin: 0;
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--secondary-text-color, ${darkMode ? '#aaa' : '#757575'});
        padding: 4px 8px;
        line-height: 1;
        border-radius: 4px;
      }

      .modal-close:hover {
        background: var(--secondary-background-color, ${darkMode ? '#333' : '#f5f5f5'});
      }

      .modal-body {
        overflow-y: auto;
        padding: 0;
      }

      .alert-item {
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, ${darkMode ? '#333' : '#e0e0e0'});
      }

      .alert-item:last-child {
        border-bottom: none;
      }

      .alert-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 8px;
      }

      .alert-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .alert-icon svg {
        width: 20px;
        height: 20px;
      }

      .alert-item-title {
        font-weight: 600;
        font-size: 15px;
        color: var(--primary-text-color, ${darkMode ? '#fff' : '#212121'});
        flex: 1;
      }

      .alert-item-content {
        font-size: 14px;
        color: var(--secondary-text-color, ${darkMode ? '#aaa' : '#757575'});
        line-height: 1.5;
        margin-left: 34px;
      }

      .alert-item-meta {
        font-size: 12px;
        color: var(--secondary-text-color, ${darkMode ? '#aaa' : '#757575'});
        opacity: 0.7;
        margin-top: 8px;
        margin-left: 34px;
      }

      .severity-critical { color: #dc3545; }
      .severity-warning { color: #ff9800; }
      .severity-info { color: #2196f3; }

      .no-alerts {
        padding: 32px 20px;
        text-align: center;
        color: var(--secondary-text-color, ${darkMode ? '#aaa' : '#757575'});
      }
    </style>

    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close">×</button>
      </div>
      <div class="modal-body">
        ${sortedAlerts.length > 0 ? sortedAlerts.map(alert => {
          const config = getAlertConfig(alert.severity);
          const startDate = alert.start_time ? new Date(alert.start_time).toLocaleDateString('fr-FR') : '';
          const endDate = alert.end_time ? new Date(alert.end_time).toLocaleDateString('fr-FR') : '';
          const dateStr = startDate && endDate ? `Du ${startDate} au ${endDate}` : (startDate ? `Depuis le ${startDate}` : '');

          return `
            <div class="alert-item">
              <div class="alert-header">
                <div class="alert-icon severity-${alert.severity}">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    ${alert.severity === 'critical' ? '<path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M11,7H13V13H11V7M11,15H13V17H11V15Z"/>' : ''}
                    ${alert.severity === 'warning' ? '<path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>' : ''}
                    ${alert.severity === 'info' ? '<path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>' : ''}
                  </svg>
                </div>
                <div class="alert-item-title">${alert.title}</div>
              </div>
              <div class="alert-item-content">${alert.content}</div>
              ${dateStr ? `<div class="alert-item-meta">${dateStr}</div>` : ''}
            </div>
          `;
        }).join('') : '<div class="no-alerts">Aucune alerte active</div>'}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const closeModal = () => modal.remove();

  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  modal.querySelector('.modal-close').addEventListener('click', closeModal);

  // Close on escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// Handle tap actions
function handleTapAction(node, hass, config, entityId) {
  const action = config?.tap_action || { action: 'more-info' };

  node.addEventListener('click', (e) => {
    e.stopPropagation();

    switch (action.action) {
      case 'more-info':
        const event = new CustomEvent('hass-more-info', {
          bubbles: true,
          composed: true,
          detail: { entityId: entityId }
        });
        node.dispatchEvent(event);
        break;
      case 'navigate':
        if (action.navigation_path) {
          window.history.pushState(null, '', action.navigation_path);
          const navEvent = new CustomEvent('location-changed', {
            bubbles: true,
            composed: true
          });
          window.dispatchEvent(navEvent);
        }
        break;
      case 'url':
        if (action.url_path) {
          window.open(action.url_path, '_blank');
        }
        break;
      case 'call-service':
        if (action.service) {
          const [domain, service] = action.service.split('.');
          hass.callService(domain, service, action.service_data || {});
        }
        break;
      case 'none':
      default:
        break;
    }
  });
}

// ============================================
// TISSEO DEPARTURES CARD
// ============================================
class TisseoDeparturesCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static getConfigElement() {
    return document.createElement('tisseo-departures-card-editor');
  }

  static getStubConfig() {
    return {
      entities: [],
      title: '',
      card_size: 'S',
      show_stop_name: true,
      num_departures: 2,
      time_format: TIME_FORMAT_MINUTES,
      show_realtime: true,
      show_alerts: true,
      show_last_updated: false,
      show_refresh: true,
      tap_action: { action: 'more-info' },
    };
  }

  setConfig(config) {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('Please define at least one entity');
    }

    this._config = {
      title: '',
      card_size: 'S',
      show_stop_name: true,
      num_departures: 2,
      time_format: TIME_FORMAT_MINUTES,
      show_realtime: true,
      show_alerts: true,
      show_last_updated: false,
      show_refresh: true,
      tap_action: { action: 'more-info' },
      ...config,
    };
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    // Skip re-render if none of the tracked entities changed
    if (oldHass && this._config?.entities) {
      const changed = this._config.entities.some(eid =>
        oldHass.states[eid] !== hass.states[eid]
      );
      if (!changed) return;
    }

    this._updateCard();
  }

  _isSingleEntityMode() {
    return this._config?.entities?.length === 1;
  }

  _updateCard() {
    if (!this._hass || !this._config) return;

    const isSingle = this._isSingleEntityMode();

    // Build data for all entities
    let hasLoadingEntities = false;
    const stopsData = this._config.entities.map(entityId => {
      const entity = this._hass.states[entityId];
      if (!entity) return null;

      const attributes = entity.attributes;

      // Check if this entity is still loading
      if (!attributes.departures || entity.state === 'unavailable' || entity.state === 'unknown') {
        hasLoadingEntities = true;
        return { entityId, loading: true };
      }

      const transportType = getTransportType(entityId, attributes);
      const departures = attributes.departures || [];
      const alerts = attributes.alerts || [];
      const outages = attributes.outages || [];
      const line = departures[0]?.line || getLineFromEntity(entityId);
      const apiColor = departures[0]?.line_color || null;
      const apiTextColor = departures[0]?.line_text_color || null;
      const resolvedLineColor = getLineColor(transportType, line, apiColor);

      return {
        entityId,
        loading: false,
        transportType,
        line,
        lineColor: resolvedLineColor,
        lineTextColor: apiTextColor || getContrastColor(resolvedLineColor),
        icon: getTransportIcon(transportType),
        departures: departures.slice(0, this._config.num_departures),
        alerts,
        outages,
        stopName: attributes.stop_name || '',
        destination: departures[0]?.destination || '',
        isRealtime: departures[0]?.is_realtime === true,
        lastUpdated: attributes.last_updated || null,
        isLastService: departures.length === 1,
        isNoService: departures.length === 0,
      };
    }).filter(Boolean);

    // In single-entity mode, if all entities are loading show full skeleton
    if (isSingle && hasLoadingEntities && stopsData.every(s => s.loading)) {
      this._renderLoading();
      return;
    }

    // If no entities found at all, show error
    if (stopsData.length === 0) {
      this._renderError('No entities found');
      return;
    }

    // Get the most recent last_updated from all entities
    const lastUpdatedTimes = stopsData
      .filter(s => !s.loading && s.lastUpdated)
      .map(s => new Date(s.lastUpdated).getTime());
    const mostRecentUpdate = lastUpdatedTimes.length > 0 ?
      new Date(Math.max(...lastUpdatedTimes)).toISOString() : null;

    this._render(stopsData, hasLoadingEntities, mostRecentUpdate);
  }

  _renderLoading() {
    const numTimes = this._config.num_departures || 2;
    const isSingle = this._isSingleEntityMode();
    const sz = getSizeConfig(this._config.card_size);

    if (isSingle) {
      // Full-card single-entity loading skeleton
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          ha-card { padding: 0; overflow: hidden; }
          ${SKELETON_CSS}
        </style>
        <ha-card>
          <div class="skeleton-row">
            <div class="skeleton skeleton-icon skeleton-circle"></div>
            <div class="skeleton skeleton-badge skeleton-circle"></div>
            <div class="skeleton-info">
              <div class="skeleton skeleton-text title"></div>
              <div class="skeleton skeleton-text subtitle"></div>
            </div>
            <div class="skeleton-times">
              <div class="skeleton skeleton-time large"></div>
              ${numTimes > 1 ? '<div class="skeleton skeleton-time"></div>' : ''}
            </div>
          </div>
        </ha-card>
      `;
    } else {
      // Multi-entity skeleton: one row per entity
      const rows = this._config.entities.map(() => `
        <div class="skeleton-row-multi">
          <div class="skeleton skeleton-icon-small skeleton-circle"></div>
          <div class="skeleton skeleton-badge-small"></div>
          <div class="skeleton-info-multi">
            <div class="skeleton skeleton-text-multi title"></div>
            <div class="skeleton skeleton-text-multi subtitle"></div>
          </div>
          <div class="skeleton-times-multi">
            <div class="skeleton skeleton-time-multi large"></div>
            ${numTimes > 1 ? '<div class="skeleton skeleton-time-multi"></div>' : ''}
          </div>
        </div>
      `).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          ha-card { padding: 0; overflow: hidden; }
          ${SKELETON_CSS}
          .skeleton-row-multi {
            display: flex;
            align-items: center;
            padding: ${sz.multiRowPadding};
            gap: ${sz.multiRowGap}px;
            border-bottom: 1px solid var(--divider-color, #e0e0e0);
          }
          .skeleton-row-multi:last-child { border-bottom: none; }
          .skeleton-icon-small { width: ${sz.multiIconSize}px; height: ${sz.multiIconSize}px; }
          .skeleton-badge-small { width: ${sz.multiBadgeSize}px; height: ${sz.multiBadgeSize}px; border-radius: 6px; }
          .skeleton-info-multi { flex: 1; display: flex; flex-direction: column; gap: 4px; }
          .skeleton-text-multi { height: 12px; }
          .skeleton-text-multi.title { width: 60%; height: 14px; }
          .skeleton-text-multi.subtitle { width: 40%; }
          .skeleton-times-multi { display: flex; gap: 6px; }
          .skeleton-time-multi { width: 28px; height: 16px; }
          .skeleton-time-multi.large { width: 32px; height: 18px; }
        </style>
        <ha-card>
          ${this._config.title ? `<div style="padding: 16px 16px 8px; font-size: ${sz.multiStopNameFontSize + 2}px; font-weight: 500; color: var(--primary-text-color);">${this._config.title}</div>` : ''}
          ${rows}
        </ha-card>
      `;
    }
  }

  _render(stopsData, hasLoadingEntities = false, lastUpdated = null) {
    const isSingle = this._isSingleEntityMode();
    const showRealtime = this._config.show_realtime !== false;
    const showAlerts = this._config.show_alerts !== false;
    const showLastUpdated = this._config.show_last_updated === true;
    const showStopName = this._config.show_stop_name !== false;
    const hasTapAction = this._config.tap_action?.action !== 'none';
    const lastUpdatedStr = showLastUpdated ? formatLastUpdated(lastUpdated, this._hass) : null;
    const showRefresh = this._config.show_refresh !== false;
    const refreshEntityIds = showRefresh ? this._config.entities.map(eid => getRefreshButtonEntityId(eid)) : [];
    const hasAnyRefreshButton = refreshEntityIds.some(eid => this._hass.states[eid]);
    const sz = getSizeConfig(this._config.card_size);

    // Size property selector: picks spacious single-card sizes or compact multi-card sizes
    const s = (singleProp, multiProp) => isSingle ? sz[singleProp] : sz[multiProp];

    // Collect all unique alerts across all stops
    const allAlerts = [];
    const seenAlertIds = new Set();
    if (showAlerts) {
      stopsData.forEach(stop => {
        (stop.alerts || []).forEach(alert => {
          if (!seenAlertIds.has(alert.id)) {
            seenAlertIds.add(alert.id);
            allAlerts.push(alert);
          }
        });
      });
    }

    // Sort by severity (critical first, then warning, then info)
    allAlerts.sort((a, b) => {
      const severityOrder = { critical: 3, warning: 2, info: 1 };
      return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
    });

    const displayAlert = allAlerts.length > 0 ? allAlerts[0] : null;
    const alertConfig = displayAlert ? getAlertConfig(displayAlert.severity) : null;

    // For single-entity mode, extract the single stop's data for convenience
    const singleStop = isSingle ? stopsData[0] : null;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        ha-card {
          padding: 0;
          overflow: hidden;
          ${isSingle && hasTapAction ? 'cursor: pointer;' : ''}
        }

        ha-card:active {
          ${isSingle && hasTapAction ? 'opacity: 0.8;' : ''}
        }

        .title {
          padding: 16px 16px 8px;
          font-size: ${s('stopNameFontSize', 'multiStopNameFontSize') + 2}px;
          font-weight: 500;
          color: var(--primary-text-color);
        }

        .alert-banner {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: ${sz.alertPadding};
          font-size: ${sz.alertFontSize}px;
          line-height: 1.4;
          cursor: pointer;
          transition: filter 0.15s ease;
        }

        .alert-banner:hover {
          filter: brightness(0.95);
        }

        .alert-banner:active {
          filter: brightness(0.9);
        }

        .alert-banner ha-icon {
          --mdc-icon-size: ${sz.alertIconSize}px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .alert-content {
          flex: 1;
          min-width: 0;
        }

        .alert-title {
          font-weight: 600;
          margin-bottom: 2px;
        }

        .alert-text {
          opacity: 0.9;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .alert-count {
          font-size: ${Math.round(sz.alertFontSize * 0.9)}px;
          opacity: 0.7;
          margin-top: 2px;
        }

        .alert-tap-hint {
          font-size: ${Math.round(sz.alertFontSize * 0.8)}px;
          opacity: 0.6;
          margin-top: 4px;
        }

        .stops {
          display: flex;
          flex-direction: column;
        }

        .row {
          display: flex;
          align-items: center;
          padding: ${s('rowPadding', 'multiRowPadding')};
          gap: ${s('rowGap', 'multiRowGap')}px;
          ${!isSingle ? 'border-bottom: 1px solid var(--divider-color, #e0e0e0);' : 'background: var(--card-background-color, #fff);'}
          ${!isSingle && hasTapAction ? 'cursor: pointer;' : ''}
        }

        .row:last-child {
          border-bottom: none;
        }

        .row:active {
          ${!isSingle && hasTapAction ? 'opacity: 0.8;' : ''}
        }

        .transport-icon {
          --mdc-icon-size: ${s('iconSize', 'multiIconSize')}px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }

        .line-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: ${s('badgeSize', 'multiBadgeSize')}px;
          height: ${s('badgeSize', 'multiBadgeSize')}px;
          padding: ${s('badgePadding', 'multiBadgePadding')};
          border-radius: 6px;
          font-weight: bold;
          font-size: ${s('badgeFontSize', 'multiBadgeFontSize')}px;
          flex-shrink: 0;
        }

        .line-badge.metro {
          border-radius: 50%;
        }

        .info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: ${s('infoGap', 'multiInfoGap')}px;
        }

        .stop-name {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: ${s('stopNameFontSize', 'multiStopNameFontSize')}px;
          font-weight: 500;
          color: var(--primary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stop-alert-indicator {
          --mdc-icon-size: ${s('stopNameFontSize', 'multiStopNameFontSize')}px;
          flex-shrink: 0;
        }

        .destination {
          font-size: ${s('destinationFontSize', 'multiDestinationFontSize')}px;
          color: var(--secondary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .times-container {
          display: flex;
          align-items: center;
          gap: ${isSingle ? '8' : '6'}px;
          flex-shrink: 0;
        }

        .times {
          display: flex;
          align-items: center;
          gap: ${isSingle ? '8' : '6'}px;
        }

        .time {
          font-size: ${s('timeFontSize', 'multiTimeFontSize')}px;
          font-weight: 600;
          color: var(--primary-text-color);
          min-width: ${s('timeMinWidth', 'multiTimeMinWidth')}px;
          text-align: right;
        }

        .time.next {
          font-size: ${s('timeNextFontSize', 'multiTimeNextFontSize')}px;
        }

        .time.imminent {
          color: #e53935;
          ${isSingle ? 'animation: pulse 1s ease-in-out infinite;' : ''}
        }

        .separator {
          color: var(--secondary-text-color);
          font-size: ${Math.round(s('timeFontSize', 'multiTimeFontSize') * 0.78)}px;
        }

        .realtime-indicator {
          width: ${s('realtimeSize', 'multiRealtimeSize')}px;
          height: ${s('realtimeSize', 'multiRealtimeSize')}px;
          border-radius: 50%;
          background-color: #4caf50;
          flex-shrink: 0;
          ${isSingle ? 'margin-left: 4px;' : ''}
        }

        .realtime-indicator.scheduled {
          background-color: #9e9e9e;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .last-service-warning {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 16px;
          font-size: ${Math.round(s('destinationFontSize', 'multiDestinationFontSize') * 0.85)}px;
          color: #ff9800;
          font-weight: 500;
          background: rgba(255, 152, 0, 0.08);
          border-top: 1px solid rgba(255, 152, 0, 0.2);
        }

        .last-service-warning ha-icon {
          --mdc-icon-size: ${Math.round(s('destinationFontSize', 'multiDestinationFontSize'))}px;
        }

        .no-service-label {
          font-size: ${s('destinationFontSize', 'multiDestinationFontSize')}px;
          color: var(--secondary-text-color);
          opacity: 0.7;
          text-align: right;
          white-space: nowrap;
        }

        .outage-banner {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 16px;
          font-size: ${Math.round(s('destinationFontSize', 'multiDestinationFontSize') * 0.85)}px;
          color: #1565c0;
          font-weight: 500;
          background: rgba(21, 101, 192, 0.08);
          border-top: 1px solid rgba(21, 101, 192, 0.15);
        }

        .outage-banner ha-icon {
          --mdc-icon-size: ${Math.round(s('destinationFontSize', 'multiDestinationFontSize'))}px;
        }

        /* Loading skeleton styles */
        ${SKELETON_CSS}

        .skeleton-row-multi {
          display: flex;
          align-items: center;
          padding: ${sz.multiRowPadding};
          gap: ${sz.multiRowGap}px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
        }

        .skeleton-row-multi:last-child {
          border-bottom: none;
        }

        .skeleton-icon-small {
          width: ${sz.multiIconSize}px;
          height: ${sz.multiIconSize}px;
        }

        .skeleton-badge-small {
          width: ${sz.multiBadgeSize}px;
          height: ${sz.multiBadgeSize}px;
          border-radius: 6px;
        }

        .skeleton-info-multi {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .skeleton-text-multi {
          height: 12px;
        }

        .skeleton-text-multi.title {
          width: 60%;
          height: 14px;
        }

        .skeleton-text-multi.subtitle {
          width: 40%;
        }

        .skeleton-times-multi {
          display: flex;
          gap: 6px;
        }

        .skeleton-time-multi {
          width: 28px;
          height: 16px;
        }

        .skeleton-time-multi.large {
          width: 32px;
          height: 18px;
        }

        .last-updated {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          padding: 4px 16px 8px;
          font-size: ${sz.lastUpdatedFontSize}px;
          color: var(--secondary-text-color);
          opacity: 0.7;
        }

        .last-updated ha-icon {
          --mdc-icon-size: ${sz.lastUpdatedIconSize}px;
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          padding: 4px 16px 8px;
        }

        .footer .last-updated {
          padding: 0;
          flex: 1;
        }

        .refresh-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          color: var(--secondary-text-color);
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.15s ease, background 0.15s ease;
          flex-shrink: 0;
        }

        .refresh-btn:hover {
          opacity: 1;
          background: var(--secondary-background-color, #f5f5f5);
        }

        .refresh-btn:active {
          opacity: 0.5;
        }

        .refresh-btn ha-icon {
          --mdc-icon-size: ${sz.lastUpdatedIconSize + 4}px;
        }

        .refresh-btn.refreshing ha-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>

      <ha-card>
        ${this._config.title ? `<div class="title">${this._config.title}</div>` : ''}

        ${showAlerts && displayAlert ? `
          <div class="alert-banner" style="background: ${getAlertBgColor(alertConfig)}; color: ${alertConfig.color}; border-bottom: 1px solid ${alertConfig.borderColor};">
            <ha-icon icon="${alertConfig.icon}"></ha-icon>
            <div class="alert-content">
              <div class="alert-title">${displayAlert.title}</div>
              <div class="alert-text">${displayAlert.content}</div>
              ${allAlerts.length > 1 ? `<div class="alert-count">${t(this._hass, 'more_alerts', allAlerts.length - 1)}</div>` : ''}
              <div class="alert-tap-hint">${allAlerts.length > 1 ? t(this._hass, 'tap_for_all_alerts') : t(this._hass, 'tap_for_details')}</div>
            </div>
          </div>
        ` : ''}

        <div class="stops">
          ${stopsData.map(stop => {
            // If this stop is still loading, show skeleton row
            if (stop.loading) {
              const numTimes = this._config.num_departures || 2;
              return `
                <div class="skeleton-row-multi">
                  <div class="skeleton skeleton-icon-small skeleton-circle"></div>
                  <div class="skeleton skeleton-badge-small"></div>
                  <div class="skeleton-info-multi">
                    <div class="skeleton skeleton-text-multi title"></div>
                    <div class="skeleton skeleton-text-multi subtitle"></div>
                  </div>
                  <div class="skeleton-times-multi">
                    <div class="skeleton skeleton-time-multi large"></div>
                    ${numTimes > 1 ? '<div class="skeleton skeleton-time-multi"></div>' : ''}
                  </div>
                </div>
              `;
            }

            const textColor = stop.lineTextColor || getContrastColor(stop.lineColor);
            const timeFormat = this._config.time_format || TIME_FORMAT_MINUTES;
            const times = stop.departures.map(dep => formatTime(dep, timeFormat));
            while (times.length < this._config.num_departures) {
              times.push('--');
            }

            // Check if this stop has alerts (for inline indicator in multi mode)
            const hasStopAlerts = showAlerts && stop.alerts && stop.alerts.length > 0;
            const stopAlertConfig = hasStopAlerts ? getAlertConfig(stop.alerts[0].severity) : null;

            return `
              <div class="row" data-entity="${stop.entityId}">
                <ha-icon class="transport-icon" icon="${stop.icon}"></ha-icon>

                <div class="line-badge ${stop.transportType}" style="background-color: ${stop.lineColor}; color: ${textColor}">
                  ${stop.line}
                </div>

                <div class="info">
                  ${showStopName && stop.stopName ? `
                    <div class="stop-name">
                      ${stop.stopName}
                      ${!isSingle && hasStopAlerts ? `<ha-icon class="stop-alert-indicator" icon="${stopAlertConfig.icon}" style="color: ${stopAlertConfig.color};" title="${stop.alerts[0].title}"></ha-icon>` : ''}
                      ${!isSingle && stop.isLastService ? `<ha-icon class="stop-alert-indicator" icon="mdi:clock-alert-outline" style="color: #ff9800;" title="${t(this._hass, 'last_service')}"></ha-icon>` : ''}
                      ${!isSingle && stop.outages && stop.outages.length > 0 ? `<ha-icon class="stop-alert-indicator" icon="mdi:elevator-passenger-off" style="color: #1565c0;" title="${t(this._hass, 'outage_count', stop.outages.length)}"></ha-icon>` : ''}
                    </div>
                  ` : ''}
                  ${stop.destination ? `<div class="destination">→ ${stop.destination}</div>` : ''}
                </div>

                <div class="times-container">
                  ${stop.isNoService ? '<div class="no-service-label">' + t(this._hass, 'no_service') + '</div>' : `
                    <div class="times">
                      ${times.map((timeVal, i) => {
                        const dep = stop.departures[i];
                        const mins = dep?.minutes_until;
                        const isImminent = mins !== undefined && mins < 2;
                        const isNext = i === 0;
                        const classes = ['time'];
                        if (isNext) classes.push('next');
                        if (isImminent) classes.push('imminent');
                        return '<span class="' + classes.join(' ') + '" style="' + (isNext ? 'color: ' + stop.lineColor : '') + '">' + timeVal + '</span>';
                      }).join('<span class="separator">·</span>')}
                    </div>
                    ${showRealtime ? '<div class="realtime-indicator ' + (stop.isRealtime ? '' : 'scheduled') + '" title="' + (stop.isRealtime ? 'Real-time' : 'Scheduled') + '"></div>' : ''}
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        ${isSingle && singleStop && !singleStop.loading && singleStop.isLastService ? `
          <div class="last-service-warning">
            <ha-icon icon="mdi:clock-alert-outline"></ha-icon>
            <span>${t(this._hass, 'last_service')}</span>
          </div>
        ` : ''}

        ${isSingle && singleStop && !singleStop.loading && singleStop.outages && singleStop.outages.length > 0 ? `
          <div class="outage-banner">
            <ha-icon icon="mdi:elevator-passenger-off"></ha-icon>
            <span>${t(this._hass, 'outage_count', singleStop.outages.length)}</span>
          </div>
        ` : ''}

        ${(lastUpdatedStr || hasAnyRefreshButton) ? `
          <div class="footer">
            ${lastUpdatedStr ? `
              <div class="last-updated">
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span>${t(this._hass, 'updated')} ${lastUpdatedStr}</span>
              </div>
            ` : '<div style="flex:1"></div>'}
            ${hasAnyRefreshButton ? `
              <button class="refresh-btn" title="${t(this._hass, 'refresh')}">
                <ha-icon icon="mdi:refresh"></ha-icon>
              </button>
            ` : ''}
          </div>
        ` : ''}
      </ha-card>
    `;

    // Store alerts for modal access
    this._allAlerts = allAlerts;

    // Add click handler for alert banner
    const alertBanner = this.shadowRoot.querySelector('.alert-banner');
    if (alertBanner && allAlerts.length > 0) {
      alertBanner.addEventListener('click', (e) => {
        e.stopPropagation();
        showAlertsModal(this._allAlerts);
      });
    }

    // Add refresh button handler - refreshes all stops
    const refreshBtn = this.shadowRoot.querySelector('.refresh-btn');
    if (refreshBtn && refreshEntityIds.length > 0) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('refreshing');
        refreshEntityIds.forEach(eid => {
          if (this._hass.states[eid]) {
            this._hass.callService('button', 'press', { entity_id: eid });
          }
        });
        setTimeout(() => refreshBtn.classList.remove('refreshing'), 2000);
      });
    }

    // Add tap action handlers
    if (hasTapAction) {
      if (isSingle) {
        // Single mode: entire ha-card is clickable
        const card = this.shadowRoot.querySelector('ha-card');
        handleTapAction(card, this._hass, this._config, this._config.entities[0]);
      } else {
        // Multi mode: each row is clickable
        this.shadowRoot.querySelectorAll('.row[data-entity]').forEach(row => {
          const entityId = row.dataset.entity;
          handleTapAction(row, this._hass, this._config, entityId);
        });
      }
    }
  }

  _renderError(message) {
    this.shadowRoot.innerHTML = `
      <ha-card>
        <div style="padding: 16px; color: var(--error-color, #db4437);">
          <ha-icon icon="mdi:alert-circle"></ha-icon>
          ${message}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    if (this._isSingleEntityMode()) {
      const sizeMap = { S: 1, M: 2, L: 2, XL: 3 };
      return sizeMap[this._config?.card_size] || 1;
    }
    const sizeMultiplier = { S: 1, M: 1.3, L: 1.6, XL: 2 };
    const mult = sizeMultiplier[this._config?.card_size] || 1;
    return Math.ceil(((this._config?.entities?.length || 1) + (this._config?.title ? 1 : 0)) * mult);
  }
}

// ============================================
// CARD EDITOR
// ============================================
class TisseoDeparturesCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass) return;

    // Get all Tisseo departure sensor entities
    const entities = Object.keys(this._hass.states)
      .filter(eid => eid.startsWith('sensor.tisseo_') && eid.endsWith('_departures'))
      .sort();

    const selectedEntities = this._config?.entities || [];
    const isSingle = selectedEntities.length <= 1;

    this.shadowRoot.innerHTML = `
      <style>
        .form-row {
          margin-bottom: 16px;
        }
        label {
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
        }
        select, input[type="text"], input[type="number"] {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 4px;
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          box-sizing: border-box;
        }
        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .checkbox-row input {
          width: auto;
        }
        .entities-section {
          margin-bottom: 16px;
        }
        .entities-section label {
          margin-bottom: 8px;
        }
        .entity-list {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 4px;
          background: var(--card-background-color, #fff);
        }
        .entity-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          gap: 10px;
          border-bottom: 1px solid var(--divider-color, #eee);
          cursor: pointer;
        }
        .entity-item:last-child {
          border-bottom: none;
        }
        .entity-item:hover {
          background: var(--secondary-background-color, #f5f5f5);
        }
        .entity-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        .entity-item .entity-name {
          flex: 1;
          font-size: 13px;
          color: var(--primary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .selected-count {
          font-size: 12px;
          color: var(--secondary-text-color);
          margin-top: 4px;
        }
        .no-entities {
          padding: 16px;
          text-align: center;
          color: var(--secondary-text-color);
          font-style: italic;
        }

        /* Selected entities with drag reorder */
        .selected-section {
          margin-bottom: 16px;
        }
        .selected-list {
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 4px;
          background: var(--card-background-color, #fff);
          min-height: 40px;
        }
        .selected-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          gap: 10px;
          border-bottom: 1px solid var(--divider-color, #eee);
          background: var(--card-background-color, #fff);
          cursor: grab;
        }
        .selected-item:last-child {
          border-bottom: none;
        }
        .selected-item:active {
          cursor: grabbing;
        }
        .selected-item.dragging {
          opacity: 0.5;
          background: var(--secondary-background-color, #f0f0f0);
        }
        .selected-item.drag-over {
          border-top: 2px solid var(--primary-color, #03a9f4);
        }
        .drag-handle {
          color: var(--secondary-text-color);
          cursor: grab;
        }
        .selected-item .entity-name {
          flex: 1;
          font-size: 13px;
          color: var(--primary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .remove-btn {
          background: none;
          border: none;
          color: var(--secondary-text-color);
          cursor: pointer;
          padding: 4px;
          font-size: 18px;
          line-height: 1;
        }
        .remove-btn:hover {
          color: var(--error-color, #db4437);
        }
        .empty-selection {
          padding: 16px;
          text-align: center;
          color: var(--secondary-text-color);
          font-style: italic;
        }
      </style>

      <div class="form-row">
        <label>${t(this._hass, 'ed_title')} (${t(this._hass, 'ed_title').toLowerCase() === 'titre' ? 'optionnel' : 'optional'})</label>
        <input type="text" id="title" value="${this._config?.title || ''}" placeholder="My Departures">
      </div>

      <div class="form-row">
        <label>${t(this._hass, 'ed_card_size')}</label>
        <select id="card_size">
          <option value="S" ${(this._config?.card_size || 'S') === 'S' ? 'selected' : ''}>S - Small (compact)</option>
          <option value="M" ${this._config?.card_size === 'M' ? 'selected' : ''}>M - Medium</option>
          <option value="L" ${this._config?.card_size === 'L' ? 'selected' : ''}>L - Large</option>
          <option value="XL" ${this._config?.card_size === 'XL' ? 'selected' : ''}>XL - Extra large</option>
        </select>
      </div>

      <div class="form-row">
        <label>${t(this._hass, 'ed_departures')}</label>
        <input type="number" id="num_departures" min="1" max="5" value="${this._config?.num_departures || 2}">
      </div>

      <div class="form-row">
        <label>${t(this._hass, 'ed_time_format')}</label>
        <select id="time_format">
          <option value="minutes" ${(this._config?.time_format || 'minutes') === 'minutes' ? 'selected' : ''}>${t(this._hass, 'ed_minutes')} (4')</option>
          <option value="time" ${this._config?.time_format === 'time' ? 'selected' : ''}>${t(this._hass, 'ed_time')} (18h40)</option>
        </select>
      </div>

      <div class="form-row">
        <label>Tap action</label>
        <select id="tap_action">
          <option value="more-info" ${(this._config?.tap_action?.action || 'more-info') === 'more-info' ? 'selected' : ''}>Show more info</option>
          <option value="none" ${this._config?.tap_action?.action === 'none' ? 'selected' : ''}>None</option>
        </select>
      </div>

      ${isSingle ? `
        <div class="form-row">
          <div class="checkbox-row">
            <input type="checkbox" id="show_stop_name" ${this._config?.show_stop_name !== false ? 'checked' : ''}>
            <label for="show_stop_name">${t(this._hass, 'ed_show_stop_name')}</label>
          </div>
        </div>
      ` : ''}

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_realtime" ${this._config?.show_realtime !== false ? 'checked' : ''}>
          <label for="show_realtime">${t(this._hass, 'ed_show_realtime')}</label>
        </div>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_alerts" ${this._config?.show_alerts !== false ? 'checked' : ''}>
          <label for="show_alerts">${t(this._hass, 'ed_show_alerts')}</label>
        </div>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_refresh" ${this._config?.show_refresh !== false ? 'checked' : ''}>
          <label for="show_refresh">${t(this._hass, 'ed_show_refresh')}</label>
        </div>
      </div>

      <div class="selected-section">
        <label>${selectedEntities.length > 1 ? t(this._hass, 'ed_entities') : t(this._hass, 'ed_entity')}</label>
        <div class="selected-list" id="selected-list">
          ${selectedEntities.length > 0 ? selectedEntities.map(entityId => {
            const entity = this._hass.states[entityId];
            const stopName = entity?.attributes?.stop_name || '';
            const displayName = stopName || entityId.replace('sensor.tisseo_', '').replace('_departures', '');

            return `
              <div class="selected-item" draggable="${!isSingle}" data-entity="${entityId}">
                ${!isSingle ? '<span class="drag-handle">☰</span>' : ''}
                <span class="entity-name" title="${entityId}">${displayName}</span>
                <button class="remove-btn" data-entity="${entityId}">×</button>
              </div>
            `;
          }).join('') : '<div class="empty-selection">' + (getLocale(this._hass) === 'fr' ? 'Aucun arrêt sélectionné' : 'No stops selected') + '</div>'}
        </div>
      </div>

      <div class="entities-section">
        <label>${t(this._hass, 'ed_add_entity')}</label>
        <div class="entity-list">
          ${entities.length > 0 ? entities.filter(e => !selectedEntities.includes(e)).map(entityId => {
            const entity = this._hass.states[entityId];
            const stopName = entity?.attributes?.stop_name || '';
            const displayName = stopName ? stopName : entityId.replace('sensor.tisseo_', '').replace('_departures', '');

            return `
              <div class="entity-item" data-entity="${entityId}">
                <span class="entity-name" title="${entityId}">${displayName}</span>
              </div>
            `;
          }).join('') : '<div class="no-entities">' + (getLocale(this._hass) === 'fr' ? 'Aucun arrêt disponible' : 'No stops available') + '</div>'}
          ${entities.filter(e => !selectedEntities.includes(e)).length === 0 && entities.length > 0 ? '<div class="no-entities">' + (getLocale(this._hass) === 'fr' ? 'Tous les arrêts sont sélectionnés' : 'All stops are selected') + '</div>' : ''}
        </div>
      </div>
    `;

    // Add event listeners for form fields
    this.shadowRoot.getElementById('title')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('card_size')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('num_departures')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('time_format')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('tap_action')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('show_stop_name')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('show_realtime')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('show_alerts')?.addEventListener('change', () => this._valueChanged());
    this.shadowRoot.getElementById('show_refresh')?.addEventListener('change', () => this._valueChanged());

    // Add click listener for adding entities
    this.shadowRoot.querySelectorAll('.entity-item').forEach(item => {
      item.addEventListener('click', () => {
        const entityId = item.dataset.entity;
        const newEntities = [...selectedEntities, entityId];
        this._updateEntities(newEntities);
      });
    });

    // Add remove button listeners
    this.shadowRoot.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const entityId = btn.dataset.entity;
        const newEntities = selectedEntities.filter(e => e !== entityId);
        this._updateEntities(newEntities);
      });
    });

    // Add drag and drop for reordering (only when more than 1 entity)
    if (!isSingle) {
      this._setupDragAndDrop();
    }
  }

  _setupDragAndDrop() {
    const items = this.shadowRoot.querySelectorAll('.selected-item');
    let draggedItem = null;

    items.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        draggedItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        this.shadowRoot.querySelectorAll('.selected-item').forEach(i => i.classList.remove('drag-over'));
        draggedItem = null;
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (item !== draggedItem) {
          item.classList.add('drag-over');
        }
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over');
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over');

        if (draggedItem && item !== draggedItem) {
          const selectedEntities = [...(this._config?.entities || [])];
          const draggedEntity = draggedItem.dataset.entity;
          const targetEntity = item.dataset.entity;

          const draggedIndex = selectedEntities.indexOf(draggedEntity);
          const targetIndex = selectedEntities.indexOf(targetEntity);

          // Remove dragged item and insert at new position
          selectedEntities.splice(draggedIndex, 1);
          selectedEntities.splice(targetIndex, 0, draggedEntity);

          this._updateEntities(selectedEntities);
        }
      });
    });
  }

  _updateEntities(newEntities) {
    const config = {
      ...this._config,
      entities: newEntities,
    };
    // When going from multi to single, ensure show_stop_name is set
    if (newEntities.length <= 1 && this._config?.show_stop_name === undefined) {
      config.show_stop_name = true;
    }
    this._config = config;
    this._render();
    this._fireConfigChanged();
  }

  _fireConfigChanged() {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _valueChanged() {
    const selectedEntities = this._config?.entities || [];

    const config = {
      ...this._config,
      title: this.shadowRoot.getElementById('title')?.value || '',
      card_size: this.shadowRoot.getElementById('card_size')?.value || 'S',
      num_departures: parseInt(this.shadowRoot.getElementById('num_departures')?.value) || 2,
      time_format: this.shadowRoot.getElementById('time_format')?.value || 'minutes',
      tap_action: { action: this.shadowRoot.getElementById('tap_action')?.value || 'more-info' },
      show_realtime: this.shadowRoot.getElementById('show_realtime')?.checked,
      show_alerts: this.shadowRoot.getElementById('show_alerts')?.checked,
      show_refresh: this.shadowRoot.getElementById('show_refresh')?.checked,
      entities: selectedEntities,
    };

    // Only include show_stop_name if the checkbox exists (single entity mode)
    const showStopNameEl = this.shadowRoot.getElementById('show_stop_name');
    if (showStopNameEl) {
      config.show_stop_name = showStopNameEl.checked;
    }

    this._config = config;

    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// ============================================
// PLANNED DEPARTURES CARD
// ============================================
class TisseoPlannedDeparturesCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static getConfigElement() {
    return document.createElement('tisseo-planned-departures-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '',
      title: '',
      card_size: 'S',
      max_departures: 8,
      show_stop_name: true,
      show_window: true,
      show_realtime: true,
      tap_action: { action: 'more-info' },
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define entity');
    }

    this._config = {
      title: '',
      card_size: 'S',
      max_departures: 8,
      show_stop_name: true,
      show_window: true,
      show_realtime: true,
      tap_action: { action: 'more-info' },
      ...config,
    };
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    if (oldHass && this._config?.entity) {
      if (oldHass.states[this._config.entity] === hass.states[this._config.entity]) {
        return;
      }
    }

    this._updateCard();
  }

  _updateCard() {
    if (!this._hass || !this._config) return;

    const entityId = this._config.entity;
    const entity = this._hass.states[entityId];
    if (!entity) {
      this._renderError(t(this._hass, 'error_entity_not_found', entityId));
      return;
    }

    if (entity.state === 'unavailable' || entity.state === 'unknown') {
      this._renderLoading();
      return;
    }

    const attrs = entity.attributes || {};
    const departures = Array.isArray(attrs.departures) ? attrs.departures : [];
    const maxRows = Math.max(1, this._config.max_departures || 8);
    const planned = departures.slice(0, maxRows).map((dep) => {
      const transportType = getTransportType(entityId, { departures: [dep] });
      const line = dep.line_short_name || getLineFromEntity(entityId);
      const lineColor = getLineColor(transportType, line, dep.line_color || null);
      const lineTextColor = dep.line_text_color || getContrastColor(lineColor);
      const dt = formatPlannedDateTimeParts(dep.departure_time, this._hass);
      return {
        transportType,
        icon: getTransportIcon(transportType),
        line,
        lineColor,
        lineTextColor,
        destination: dep.destination || '',
        datetimeDate: dt.date,
        datetimeTime: dt.time,
        isRealtime: dep.is_realtime === true,
      };
    });

    const stopName = attrs.stop_name || entity.attributes?.friendly_name || '';
    const windowStart = attrs.window_start || null;
    const windowEnd = attrs.window_end || null;
    this._render({
      entityId,
      stopName,
      windowStart,
      windowEnd,
      departures: planned,
    });
  }

  _renderLoading() {
    const sz = getSizeConfig(this._config.card_size);
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { padding: 0; overflow: hidden; }
        ${SKELETON_CSS}
        .row {
          display: flex;
          align-items: center;
          padding: ${sz.rowPadding};
          gap: ${sz.rowGap}px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
        }
        .row:last-child { border-bottom: none; }
        .skeleton-icon { width: ${sz.iconSize}px; height: ${sz.iconSize}px; }
        .skeleton-badge { width: ${sz.badgeSize}px; height: ${sz.badgeSize}px; border-radius: 6px; }
        .skeleton-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .skeleton-title { width: 50%; height: 14px; }
        .skeleton-sub { width: 35%; height: 12px; }
        .skeleton-time { width: 90px; height: 18px; }
      </style>
      <ha-card>
        ${this._config.title ? `<div style="padding: 16px 16px 8px; font-size: ${sz.stopNameFontSize + 2}px; font-weight: 500;">${this._config.title}</div>` : ''}
        ${Array.from({ length: 3 }).map(() => `
          <div class="row">
            <div class="skeleton skeleton-icon skeleton-circle"></div>
            <div class="skeleton skeleton-badge"></div>
            <div class="skeleton-info">
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-sub"></div>
            </div>
            <div class="skeleton skeleton-time"></div>
          </div>
        `).join('')}
      </ha-card>
    `;
  }

  _render(data) {
    const sz = getSizeConfig(this._config.card_size);
    const showStopName = this._config.show_stop_name !== false;
    const showWindow = this._config.show_window !== false;
    const showRealtime = this._config.show_realtime !== false;
    const hasTapAction = this._config.tap_action?.action !== 'none';

    const windowStartParts = formatPlannedDateTimeParts(data.windowStart, this._hass);
    const windowEndParts = formatPlannedDateTimeParts(data.windowEnd, this._hass);
    const windowLabel = data.windowStart && data.windowEnd
      ? `${windowStartParts.date} ${windowStartParts.time} - ${windowEndParts.time}`
      : null;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { padding: 0; overflow: hidden; ${hasTapAction ? 'cursor: pointer;' : ''} }
        .title {
          padding: 16px 16px 8px;
          font-size: ${sz.stopNameFontSize + 2}px;
          font-weight: 500;
          color: var(--primary-text-color);
        }
        .window {
          padding: 0 16px 10px;
          font-size: ${sz.destinationFontSize}px;
          color: var(--secondary-text-color);
        }
        .window strong { color: var(--primary-text-color); }
        .row {
          display: flex;
          align-items: center;
          padding: ${sz.rowPadding};
          gap: ${sz.rowGap}px;
          border-top: 1px solid var(--divider-color, #e0e0e0);
        }
        .transport-icon {
          --mdc-icon-size: ${sz.iconSize}px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }
        .line-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: ${sz.badgeSize}px;
          height: ${sz.badgeSize}px;
          padding: ${sz.badgePadding};
          border-radius: 6px;
          font-weight: bold;
          font-size: ${sz.badgeFontSize}px;
          flex-shrink: 0;
        }
        .line-badge.metro { border-radius: 50%; }
        .info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: ${sz.infoGap}px;
        }
        .stop-name {
          font-size: ${sz.stopNameFontSize}px;
          font-weight: 500;
          color: var(--primary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .destination {
          font-size: ${sz.destinationFontSize}px;
          color: var(--secondary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .datetime {
          display: flex;
          align-items: baseline;
          gap: 6px;
          color: var(--primary-text-color);
          font-weight: 600;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .datetime-date {
          font-size: ${Math.round(sz.timeFontSize * 0.72)}px;
          color: var(--secondary-text-color);
          text-transform: capitalize;
        }
        .datetime-time {
          font-size: ${Math.round(sz.timeNextFontSize * 0.82)}px;
          color: var(--primary-text-color);
        }
        .realtime-indicator {
          width: ${sz.realtimeSize}px;
          height: ${sz.realtimeSize}px;
          border-radius: 50%;
          background-color: #4caf50;
          flex-shrink: 0;
        }
        .realtime-indicator.scheduled { background-color: #9e9e9e; }
        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
          font-size: ${sz.destinationFontSize}px;
        }
      </style>
      <ha-card>
        ${this._config.title ? `<div class="title">${this._config.title}</div>` : ''}
        ${showStopName && data.stopName ? `<div class="title">${data.stopName}</div>` : ''}
        ${showWindow && windowLabel ? `<div class="window"><strong>${t(this._hass, 'planned_window')}:</strong> ${windowLabel}</div>` : ''}
        ${data.departures.length > 0 ? data.departures.map(dep => `
          <div class="row">
            <ha-icon class="transport-icon" icon="${dep.icon}"></ha-icon>
            <div class="line-badge ${dep.transportType}" style="background-color: ${dep.lineColor}; color: ${dep.lineTextColor}">
              ${dep.line}
            </div>
            <div class="info">
              ${dep.destination ? `<div class="destination">→ ${dep.destination}</div>` : ''}
            </div>
            <div class="datetime">
              <span class="datetime-date">${dep.datetimeDate}</span>
              <span class="datetime-time">${dep.datetimeTime}</span>
            </div>
            ${showRealtime ? `<div class="realtime-indicator ${dep.isRealtime ? '' : 'scheduled'}" title="${dep.isRealtime ? 'Real-time' : 'Scheduled'}"></div>` : ''}
          </div>
        `).join('') : `<div class="empty">${t(this._hass, 'planned_no_departures')}</div>`}
      </ha-card>
    `;

    if (hasTapAction) {
      const card = this.shadowRoot.querySelector('ha-card');
      handleTapAction(card, this._hass, this._config, data.entityId);
    }
  }

  _renderError(message) {
    this.shadowRoot.innerHTML = `
      <ha-card>
        <div style="padding: 16px; color: var(--error-color, #db4437);">
          <ha-icon icon="mdi:alert-circle"></ha-icon>
          ${message}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    const sizeMap = { S: 2, M: 3, L: 4, XL: 5 };
    return sizeMap[this._config?.card_size] || 2;
  }
}

// ============================================
// PLANNED CARD EDITOR
// ============================================
class TisseoPlannedDeparturesCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass) return;

    const entities = Object.keys(this._hass.states)
      .filter((eid) => eid.startsWith('sensor.tisseo_') && eid.endsWith('_planned_departures'))
      .sort();

    this.shadowRoot.innerHTML = `
      <style>
        .form-row { margin-bottom: 16px; }
        label { display: block; margin-bottom: 4px; font-weight: 500; }
        select, input[type="text"], input[type="number"] {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 4px;
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          box-sizing: border-box;
        }
        .checkbox-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .checkbox-row input { width: auto; }
      </style>

      <div class="form-row">
        <label>${t(this._hass, 'ed_title')}</label>
        <input type="text" id="title" value="${this._config?.title || ''}" placeholder="Tomorrow morning departures">
      </div>

      <div class="form-row">
        <label>${t(this._hass, 'ed_planned_entity')}</label>
        <select id="entity">
          <option value="">--</option>
          ${entities.map((eid) => {
            const selected = this._config?.entity === eid ? 'selected' : '';
            const name = this._hass.states[eid]?.attributes?.friendly_name || eid;
            return `<option value="${eid}" ${selected}>${name} (${eid})</option>`;
          }).join('')}
        </select>
      </div>

      <div class="form-row">
        <label>${t(this._hass, 'ed_card_size')}</label>
        <select id="card_size">
          <option value="S" ${(this._config?.card_size || 'S') === 'S' ? 'selected' : ''}>S</option>
          <option value="M" ${this._config?.card_size === 'M' ? 'selected' : ''}>M</option>
          <option value="L" ${this._config?.card_size === 'L' ? 'selected' : ''}>L</option>
          <option value="XL" ${this._config?.card_size === 'XL' ? 'selected' : ''}>XL</option>
        </select>
      </div>

      <div class="form-row">
        <label>${t(this._hass, 'ed_max_departures')}</label>
        <input type="number" id="max_departures" min="1" max="40" value="${this._config?.max_departures || 8}">
      </div>

      <div class="form-row">
        <label>Tap action</label>
        <select id="tap_action">
          <option value="more-info" ${(this._config?.tap_action?.action || 'more-info') === 'more-info' ? 'selected' : ''}>Show more info</option>
          <option value="none" ${this._config?.tap_action?.action === 'none' ? 'selected' : ''}>None</option>
        </select>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_stop_name" ${this._config?.show_stop_name !== false ? 'checked' : ''}>
          <label for="show_stop_name">${t(this._hass, 'ed_show_stop_name')}</label>
        </div>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_window" ${this._config?.show_window !== false ? 'checked' : ''}>
          <label for="show_window">${t(this._hass, 'ed_show_window')}</label>
        </div>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_realtime" ${this._config?.show_realtime !== false ? 'checked' : ''}>
          <label for="show_realtime">${t(this._hass, 'ed_show_realtime')}</label>
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll('input, select').forEach((el) => {
      el.addEventListener('change', () => this._valueChanged());
    });
  }

  _valueChanged() {
    const config = {
      ...this._config,
      title: this.shadowRoot.getElementById('title')?.value || '',
      entity: this.shadowRoot.getElementById('entity')?.value || '',
      card_size: this.shadowRoot.getElementById('card_size')?.value || 'S',
      max_departures: parseInt(this.shadowRoot.getElementById('max_departures')?.value) || 8,
      tap_action: { action: this.shadowRoot.getElementById('tap_action')?.value || 'more-info' },
      show_stop_name: this.shadowRoot.getElementById('show_stop_name')?.checked,
      show_window: this.shadowRoot.getElementById('show_window')?.checked,
      show_realtime: this.shadowRoot.getElementById('show_realtime')?.checked,
    };

    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}

// ============================================
// NEARBY STOPS CARD
// ============================================
class TisseoNearbyStopsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._nearbyStops = [];
    this._locationError = null;
    this._isLoading = false;
    this._lastLocation = null;
  }

  static getConfigElement() {
    return document.createElement('tisseo-nearby-stops-card-editor');
  }

  static getStubConfig() {
    return {
      title: 'Arrêts à proximité',
      location_entity: '',  // e.g., 'person.me' or 'device_tracker.phone'
      max_distance: 500,
      max_results: 5,
      show_distance: true,
      auto_refresh: true,
      refresh_interval: 60,
    };
  }

  setConfig(config) {
    this._config = {
      title: 'Arrêts à proximité',
      location_entity: '',
      max_distance: 500,
      max_results: 5,
      show_distance: true,
      auto_refresh: true,
      refresh_interval: 60,
      ...config,
    };
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    // Check if location entity state has changed (for reactive updates)
    if (this._config.location_entity && oldHass) {
      const oldState = oldHass.states[this._config.location_entity];
      const newState = hass.states[this._config.location_entity];
      if (oldState?.attributes?.latitude !== newState?.attributes?.latitude ||
          oldState?.attributes?.longitude !== newState?.attributes?.longitude) {
        // Location changed, fetch new nearby stops
        this._requestLocation();
      }
    }

    // Initial render
    if (!this._initialized) {
      this._initialized = true;
      this._render();
      this._requestLocation();

      // Set up auto-refresh if enabled
      if (this._config.auto_refresh) {
        this._refreshInterval = setInterval(() => {
          this._requestLocation();
        }, this._config.refresh_interval * 1000);
      }
    }
  }

  disconnectedCallback() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
  }

  _requestLocation() {
    // If a location entity is configured, use it instead of browser geolocation
    if (this._config.location_entity) {
      this._requestLocationFromEntity();
      return;
    }

    // Fallback to browser geolocation (requires HTTPS)
    this._requestBrowserLocation();
  }

  _requestLocationFromEntity() {
    if (!this._hass) {
      this._locationError = t(this._hass, 'error_no_ha');
      this._render();
      return;
    }

    const entity = this._hass.states[this._config.location_entity];
    if (!entity) {
      this._locationError = t(this._hass, 'error_entity_not_found', this._config.location_entity);
      this._render();
      return;
    }

    const latitude = entity.attributes?.latitude;
    const longitude = entity.attributes?.longitude;

    if (latitude === undefined || longitude === undefined) {
      this._locationError = t(this._hass, 'error_no_coords', this._config.location_entity);
      this._render();
      return;
    }

    this._isLoading = true;
    this._render();

    this._lastLocation = {
      latitude: latitude,
      longitude: longitude,
    };

    // Small delay to show loading state
    setTimeout(() => {
      this._fetchNearbyStops(latitude, longitude);
    }, 100);
  }

  _requestBrowserLocation() {
    if (!navigator.geolocation) {
      this._locationError = t(this._hass, 'error_geo_generic');
      this._render();
      return;
    }

    this._isLoading = true;
    this._render();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._lastLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this._fetchNearbyStops(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this._isLoading = false;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this._locationError = t(this._hass, 'error_geo_denied');
            break;
          case error.POSITION_UNAVAILABLE:
            this._locationError = t(this._hass, 'error_geo_unavailable');
            break;
          case error.TIMEOUT:
            this._locationError = t(this._hass, 'error_geo_timeout');
            break;
          default:
            this._locationError = t(this._hass, 'error_geo_generic');
        }
        this._render();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  }

  async _fetchNearbyStops(latitude, longitude) {
    try {
      if (!this._hass) {
        throw new Error('Home Assistant not available');
      }

      // Call the tisseo.get_nearby_stops service (returns response data)
      const response = await this._hass.callService('tisseo', 'get_nearby_stops', {
        latitude: latitude,
        longitude: longitude,
        max_distance: this._config.max_distance || 500,
        max_results: this._config.max_results || 10,
      }, undefined, true, true);  // returnResponse=true

      if (response?.response?.error) {
        throw new Error(response.response.error);
      }

      const stops = response?.response?.stops || [];
      this._nearbyStops = stops;
      this._locationError = null;
      this._isLoading = false;
      this._render();
    } catch (error) {
      console.error('Tisseo nearby stops error:', error);
      this._locationError = `Erreur: ${error.message || 'impossible de récupérer les arrêts'}`;
      this._isLoading = false;
      this._render();
    }
  }

  _render() {
    const darkMode = isDarkMode();

    // Get location source info for display
    let locationSource = '';
    if (this._config.location_entity && this._hass) {
      const entity = this._hass.states[this._config.location_entity];
      if (entity) {
        const friendlyName = entity.attributes?.friendly_name || this._config.location_entity;
        locationSource = friendlyName;
      }
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        ha-card {
          padding: 0;
          overflow: hidden;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
        }

        .title-section {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          color: var(--primary-text-color);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title ha-icon {
          --mdc-icon-size: 20px;
          color: var(--primary-color);
        }

        .location-source {
          font-size: 11px;
          color: var(--secondary-text-color);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 28px;
        }

        .location-source ha-icon {
          --mdc-icon-size: 12px;
        }

        .refresh-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          color: var(--secondary-text-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .refresh-btn:hover {
          background: var(--secondary-background-color, #f5f5f5);
        }

        .refresh-btn ha-icon {
          --mdc-icon-size: 20px;
        }

        .refresh-btn.loading ha-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .content {
          padding: 0;
        }

        .loading, .error, .empty {
          padding: 32px 16px;
          text-align: center;
          color: var(--secondary-text-color);
        }

        .error {
          color: var(--error-color, #db4437);
        }

        .error ha-icon {
          --mdc-icon-size: 48px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .error-text {
          font-size: 14px;
          margin-bottom: 16px;
        }

        .retry-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .retry-btn:hover {
          opacity: 0.9;
        }

        .stop-item {
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
        }

        .stop-item:last-child {
          border-bottom: none;
        }

        .stop-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .stop-name {
          font-size: 15px;
          font-weight: 500;
          color: var(--primary-text-color);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stop-name ha-icon {
          --mdc-icon-size: 18px;
          color: var(--secondary-text-color);
        }

        .stop-distance {
          font-size: 12px;
          color: var(--secondary-text-color);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stop-distance ha-icon {
          --mdc-icon-size: 14px;
        }

        .lines {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .line-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .line-badge.metro {
          border-radius: 12px;
        }

        .line-direction {
          font-weight: 400;
          opacity: 0.9;
          font-size: 11px;
        }

        ${SKELETON_CSS}

        .skeleton-stop {
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
        }

        .skeleton-stop-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .skeleton-stop-name {
          width: 40%;
          height: 16px;
        }

        .skeleton-stop-distance {
          width: 60px;
          height: 14px;
        }

        .skeleton-lines {
          display: flex;
          gap: 6px;
        }

        .skeleton-line {
          width: 80px;
          height: 24px;
          border-radius: 4px;
        }
      </style>

      <ha-card>
        <div class="header">
          <div class="title-section">
            <div class="title">
              <ha-icon icon="mdi:map-marker-radius"></ha-icon>
              ${this._config.title}
            </div>
            ${locationSource ? `
              <div class="location-source">
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                ${locationSource}
              </div>
            ` : ''}
          </div>
          <button class="refresh-btn ${this._isLoading ? 'loading' : ''}" title="${t(this._hass, 'update')}">
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>

        <div class="content">
          ${this._renderContent()}
        </div>
      </ha-card>
    `;

    // Add refresh button handler
    const refreshBtn = this.shadowRoot.querySelector('.refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        if (!this._isLoading) {
          this._requestLocation();
        }
      });
    }

    // Add retry button handler
    const retryBtn = this.shadowRoot.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this._locationError = null;
        this._requestLocation();
      });
    }
  }

  _renderContent() {
    if (this._isLoading && this._nearbyStops.length === 0) {
      return this._renderLoading();
    }

    if (this._locationError) {
      return this._renderError();
    }

    if (this._nearbyStops.length === 0) {
      return this._renderEmpty();
    }

    return this._renderStops();
  }

  _renderLoading() {
    return `
      ${[1, 2, 3].map(() => `
        <div class="skeleton-stop">
          <div class="skeleton-stop-header">
            <div class="skeleton skeleton-stop-name"></div>
            <div class="skeleton skeleton-stop-distance"></div>
          </div>
          <div class="skeleton-lines">
            <div class="skeleton skeleton-line"></div>
            <div class="skeleton skeleton-line"></div>
          </div>
        </div>
      `).join('')}
    `;
  }

  _renderError() {
    return `
      <div class="error">
        <ha-icon icon="mdi:map-marker-off"></ha-icon>
        <div class="error-text">${this._locationError}</div>
        <button class="retry-btn">${t(this._hass, 'retry')}</button>
      </div>
    `;
  }

  _renderEmpty() {
    return `
      <div class="empty">
        <ha-icon icon="mdi:map-marker-question"></ha-icon>
        <p>${t(this._hass, 'no_stops_nearby')}</p>
      </div>
    `;
  }

  _renderStops() {
    return this._nearbyStops.map(stop => {
      // Group lines by line_short_name to show directions together
      const linesByName = {};
      stop.lines.forEach(line => {
        if (!linesByName[line.line_short_name]) {
          linesByName[line.line_short_name] = {
            ...line,
            directions: [line.direction],
          };
        } else {
          linesByName[line.line_short_name].directions.push(line.direction);
        }
      });

      const uniqueLines = Object.values(linesByName);

      return `
        <div class="stop-item">
          <div class="stop-header">
            <div class="stop-name">
              <ha-icon icon="mdi:bus-stop"></ha-icon>
              ${stop.name}
            </div>
            ${this._config.show_distance ? `
              <div class="stop-distance">
                <ha-icon icon="mdi:walk"></ha-icon>
                ${stop.distance}m${stop.distance >= 80 ? ` · ~${Math.ceil(stop.distance / 80)} min` : ''}
              </div>
            ` : ''}
          </div>
          <div class="lines">
            ${uniqueLines.map(line => {
              const bgColor = line.line_color || '#808080';
              const textColor = line.line_text_color && line.line_text_color !== '#FFFFFF' ? line.line_text_color : getContrastColor(bgColor);
              const isMetro = (line.transport_mode || '').toLowerCase().includes('métro') || (line.transport_mode || '').toLowerCase().includes('metro');
              return `
                <div class="line-badge ${isMetro ? 'metro' : ''}" style="background-color: ${bgColor}; color: ${textColor};">
                  ${line.line_short_name}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  getCardSize() {
    return Math.max(2, this._nearbyStops.length + 1);
  }
}

// ============================================
// NEARBY STOPS CARD EDITOR
// ============================================
class TisseoNearbyStopsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass) return;

    // Get all person and device_tracker entities that have GPS coordinates
    const locationEntities = Object.keys(this._hass.states)
      .filter(eid => {
        const entity = this._hass.states[eid];
        // Include person entities and device_tracker entities with latitude/longitude
        if (eid.startsWith('person.') || eid.startsWith('device_tracker.')) {
          return entity.attributes?.latitude !== undefined && entity.attributes?.longitude !== undefined;
        }
        // Also include zone.home for fixed location
        if (eid === 'zone.home') {
          return true;
        }
        return false;
      })
      .sort((a, b) => {
        // Sort: person first, then device_tracker, then zone
        const order = { 'person': 0, 'device_tracker': 1, 'zone': 2 };
        const aType = a.split('.')[0];
        const bType = b.split('.')[0];
        return (order[aType] || 3) - (order[bType] || 3);
      });

    this.shadowRoot.innerHTML = `
      <style>
        .form-row {
          margin-bottom: 16px;
        }
        label {
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
        }
        select, input[type="text"], input[type="number"] {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 4px;
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          box-sizing: border-box;
        }
        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .checkbox-row input {
          width: auto;
        }
        .hint {
          font-size: 11px;
          color: var(--secondary-text-color);
          margin-top: 4px;
        }
        .entity-preview {
          font-size: 12px;
          color: var(--secondary-text-color);
          margin-top: 4px;
          padding: 8px;
          background: var(--secondary-background-color, #f5f5f5);
          border-radius: 4px;
        }
        .entity-preview strong {
          color: var(--primary-text-color);
        }
      </style>

      <div class="form-row">
        <label>Titre</label>
        <input type="text" id="title" value="${this._config?.title || 'Arrêts à proximité'}" placeholder="Arrêts à proximité">
      </div>

      <div class="form-row">
        <label>Entité de localisation</label>
        <select id="location_entity">
          <option value="">Géolocalisation du navigateur (HTTPS requis)</option>
          ${locationEntities.map(eid => {
            const entity = this._hass.states[eid];
            const friendlyName = entity.attributes?.friendly_name || eid;
            const selected = this._config?.location_entity === eid ? 'selected' : '';
            return `<option value="${eid}" ${selected}>${friendlyName} (${eid})</option>`;
          }).join('')}
        </select>
        <div class="hint">Sélectionnez une entité person.xxx ou device_tracker.xxx pour utiliser sa position GPS</div>
        ${this._config?.location_entity && this._hass.states[this._config.location_entity] ? `
          <div class="entity-preview">
            Position actuelle: <strong>${this._hass.states[this._config.location_entity].attributes?.latitude?.toFixed(5)}, ${this._hass.states[this._config.location_entity].attributes?.longitude?.toFixed(5)}</strong>
          </div>
        ` : ''}
      </div>

      <div class="form-row">
        <label>Distance maximale (mètres)</label>
        <input type="number" id="max_distance" min="100" max="2000" value="${this._config?.max_distance || 500}">
      </div>

      <div class="form-row">
        <label>Nombre maximum d'arrêts</label>
        <input type="number" id="max_results" min="1" max="20" value="${this._config?.max_results || 5}">
      </div>

      <div class="form-row">
        <label>Intervalle de rafraîchissement (secondes)</label>
        <input type="number" id="refresh_interval" min="10" max="600" value="${this._config?.refresh_interval || 60}">
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="show_distance" ${this._config?.show_distance !== false ? 'checked' : ''}>
          <label for="show_distance">Afficher la distance</label>
        </div>
      </div>

      <div class="form-row">
        <div class="checkbox-row">
          <input type="checkbox" id="auto_refresh" ${this._config?.auto_refresh !== false ? 'checked' : ''}>
          <label for="auto_refresh">Rafraîchissement automatique</label>
        </div>
      </div>
    `;

    // Add event listeners
    this.shadowRoot.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('change', () => this._valueChanged());
    });
  }

  _valueChanged() {
    const config = {
      ...this._config,
      title: this.shadowRoot.getElementById('title').value || 'Arrêts à proximité',
      location_entity: this.shadowRoot.getElementById('location_entity').value || '',
      max_distance: parseInt(this.shadowRoot.getElementById('max_distance').value) || 500,
      max_results: parseInt(this.shadowRoot.getElementById('max_results').value) || 5,
      refresh_interval: parseInt(this.shadowRoot.getElementById('refresh_interval').value) || 60,
      show_distance: this.shadowRoot.getElementById('show_distance').checked,
      auto_refresh: this.shadowRoot.getElementById('auto_refresh').checked,
    };

    this._config = config;

    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// Register the cards
customElements.define('tisseo-departures-card', TisseoDeparturesCard);
customElements.define('tisseo-departures-card-editor', TisseoDeparturesCardEditor);
customElements.define('tisseo-planned-departures-card', TisseoPlannedDeparturesCard);
customElements.define('tisseo-planned-departures-card-editor', TisseoPlannedDeparturesCardEditor);
customElements.define('tisseo-nearby-stops-card', TisseoNearbyStopsCard);
customElements.define('tisseo-nearby-stops-card-editor', TisseoNearbyStopsCardEditor);

// Register with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'tisseo-departures-card',
  name: 'Tisseo Departures Card',
  description: 'Display Tisseo transit departures for one or more stops',
  preview: true,
  documentationURL: 'https://github.com/your-org/homeassistant-tisseo-cards',
});

window.customCards.push({
  type: 'tisseo-nearby-stops-card',
  name: 'Tisseo Nearby Stops Card',
  description: 'Show nearby Tisseo stops based on your location',
  preview: true,
});

window.customCards.push({
  type: 'tisseo-planned-departures-card',
  name: 'Tisseo Planned Departures Card',
  description: 'Display planned departures with date and time (one row per departure)',
  preview: true,
});

console.info(
  `%c TISSEO-DEPARTURES-CARD %c v${CARD_VERSION} `,
  'color: white; background: #e2001a; font-weight: bold;',
  'color: #e2001a; background: white; font-weight: bold;'
);
