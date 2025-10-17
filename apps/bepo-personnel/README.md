# BePo Personalbeschaffer

Wirbt benötigtes Personal für eine BePo-Wache an.

## Features

- **Auto-loading current building state**: On page load, the script automatically fetches the current building's personnel data and displays the current counts in the footer
- **Lazy loading**: Panel data automatically loads when panel headers come into view (using Intersection Observer)
- **Individual selection buttons per schooling type**: Instead of one select-all button, there's now a separate button for each type of personnel/schooling needed
- **Smart button visibility**: Buttons only appear if personnel with the corresponding schooling is actually available at that building
- **Warning indicators**: Buttons show in warning color (yellow/orange) when there aren't enough available personnel to meet the requirement
- **Visual feedback**: Selected buttons show a checkmark and display count of selected personnel
- **Footer status tracking**: Real-time tracking of current vs. required personnel for each schooling type, updated immediately on page load
- **Reset functionality**: Clear all selections for a building with one click
- **Native fetch API**: Uses modern fetch API instead of jQuery for better performance and fewer dependencies

## Usage

1. Navigate to a BePo station's hire page (`/buildings/*/hire`)
2. The footer automatically loads and displays your current personnel counts for each type
3. Each building panel will show buttons for different personnel types (K9, FüKw, MEK, SEK, etc.) - only for types that are available in that building
4. Click a specific button to auto-select personnel of that type
5. The footer updates in real-time showing your progress for each personnel type (current/required)
6. Use the trash icon to reset all selections for a building

## Personnel Types

- **Ohne**: Personnel without special training (83 required)
- **K9**: Hundeführer (Schutzhund) - 6 required
- **FüKw**: Hundertschaftsführer - 15 required
- **MEK**: Mobile Einsatzkommando - 42 required
- **SEK**: Spezialeinsatzkommando - 42 required
- **Pferd**: Reiterstaffel - 24 required
- **WaWe**: Wasserwerfer operator - 15 required
- **Zug**: Zugführer (leBefKw) - 12 required
- **Lautspr.**: Lautsprecheroperator - 5 required

## Development

```bash
npm run dev   # Start development server
npm run build # Build for production
```
