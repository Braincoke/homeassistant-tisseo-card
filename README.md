# Cartes Tisseo pour Home Assistant

Cartes Lovelace personnalisées pour afficher les données de transport [Tisseo](https://www.tisseo.fr/) (Toulouse) dans Home Assistant.

README in English: [README_en.md](README_en.md)

<img width="1162" height="338" alt="Screenshot 2026-02-23 at 23 25 18" src="https://github.com/user-attachments/assets/0385a2c0-c361-4055-b252-262b043820ce" />


## Cartes disponibles

### 1. Carte Départs Temps Réel (`tisseo-departures-card`)

Affiche les départs en temps réel pour un arrêt ou une liste d'arrêts.

Exemple arrêt unique :

```yaml
type: custom:tisseo-departures-card
entity: sensor.tisseo_metro_a_mermoz_balma_gramont_departures
```

Exemple plusieurs arrêts dans la même carte :

```yaml
type: custom:tisseo-departures-card
title: Mes trajets
entities:
  - sensor.tisseo_metro_b_ramonville_borderouge_departures
  - sensor.tisseo_lineo_l1_arenes_colomiers_gare_sncf_departures
```

### 2. Carte Arrêts à Proximité (`tisseo-nearby-stops-card`)

Affiche les arrêts Tisseo proches à partir de la position GPS d'une entité `person` ou `device_tracker`.

```yaml
type: custom:tisseo-nearby-stops-card
title: Arrêts à proximité
location_entity: person.me
max_distance: 500
```

### 3. Carte Départs Planifiés (`tisseo-planned-departures-card`)

Affiche les départs planifiés (fenêtre future) avec **une ligne par départ**, en affichant la **date et l'heure**.

```yaml
type: custom:tisseo-planned-departures-card
entity: sensor.tisseo_metro_b_jean_jaures_ramonville_planned_departures
title: Demain matin
```

## Fonctionnalités

- Couleurs officielles Tisseo (`line_color`, `line_text_color`)
- Style visuel adapté au mode de transport
- Indicateurs temps réel
- Animation départ imminent
- Affichage des alertes de service
- Tailles de carte : `S`, `M`, `L`, `XL`
- Bouton de rafraîchissement manuel (carte départs)
- Horodatage de dernière mise à jour (optionnel)
- Éditeur visuel pour les trois cartes
- Carte dédiée aux départs planifiés (date + heure par ligne)

## Installation

### HACS (recommandé)

1. Ouvrez HACS > **Frontend** > menu trois points > **Custom repositories**.
2. Ajoutez ce dépôt avec la catégorie **Lovelace**.
3. Installez **Tisseo Departures Card**.
4. Redémarrez Home Assistant.

### Manuelle

1. Téléchargez `tisseo-departures-card.js`.
2. Copiez le fichier dans `/config/www/community/tisseo-departures-card/`.
3. Allez dans **Paramètres > Tableaux de bord > Ressources**.
4. Ajoutez `/local/community/tisseo-departures-card/tisseo-departures-card.js` comme **JavaScript Module**.

## Configuration

Les deux cartes disposent d'un éditeur visuel. Options YAML ci-dessous.

### Carte Départs Temps Réel

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `entity` | string | optionnel | Une entité capteur `_departures` |
| `entities` | array | optionnel | Liste d'entités capteurs `_departures` |
| `title` | string | `""` | Titre optionnel |
| `card_size` | string | `S` | `S`, `M`, `L`, `XL` |
| `num_departures` | number | `2` | Nombre d'horaires à afficher (1-5) |
| `time_format` | string | `minutes` | `minutes` ou `time` |
| `show_stop_name` | boolean | `true` | Afficher le nom d'arrêt (mode arrêt unique) |
| `show_realtime` | boolean | `true` | Afficher le point indicateur temps réel |
| `show_alerts` | boolean | `true` | Afficher les alertes de service |
| `show_last_updated` | boolean | `false` | Afficher la date de dernière mise à jour |
| `show_refresh` | boolean | `true` | Afficher le bouton de rafraîchissement |
| `tap_action` | object | `{action: 'more-info'}` | Action au clic |

Notes :
- Renseignez `entity` ou `entities`.
- Si les deux sont présents, `entities` est utilisé.

### Carte Arrêts à Proximité

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `title` | string | `Arrêts à proximité` | Titre de la carte |
| `location_entity` | string | requis | `person.xxx` ou `device_tracker.xxx` avec coordonnées |
| `max_distance` | number | `500` | Distance maximale en mètres |
| `max_results` | number | `5` | Nombre maximal d'arrêts |
| `show_distance` | boolean | `true` | Afficher la distance à pied |
| `auto_refresh` | boolean | `true` | Actualiser automatiquement |
| `refresh_interval` | number | `60` | Intervalle de rafraîchissement en secondes |

### Carte Départs Planifiés

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `entity` | string | requis | Entité capteur `_planned_departures` |
| `title` | string | `""` | Titre optionnel |
| `card_size` | string | `S` | `S`, `M`, `L`, `XL` |
| `max_departures` | number | `8` | Nombre maximal de départs affichés (1-40) |
| `show_stop_name` | boolean | `true` | Afficher le nom de l'arrêt |
| `show_window` | boolean | `true` | Afficher la fenêtre horaire demandée |
| `show_realtime` | boolean | `true` | Afficher l'indicateur temps réel/théorique |
| `tap_action` | object | `{action: 'more-info'}` | Action au clic |

## Prérequis

- Home Assistant 2024.1+
- Intégration Tisseo installée et configurée

## Dépannage

### La carte ne s'affiche pas

1. Faites un rechargement complet du cache navigateur.
2. Vérifiez **Paramètres > Tableaux de bord > Ressources**.
3. Ouvrez la console navigateur pour voir les erreurs JavaScript.

### Entité introuvable

- Vérifiez que l'intégration backend est bien configurée.
- Les entités de départ doivent commencer par `sensor.tisseo_` et finir par `_departures`.

## Licence

MIT
