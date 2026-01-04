# Bucks2Bar - Income & Expense Tracker

## Project Overview

A client-side vanilla JavaScript app for tracking monthly income and expenses with interactive Chart.js visualizations. Includes username validation and chart download functionality.

## Architecture

- **Single-page application** with Bootstrap tabs (`index.html`)
- **Username validation tab**: Form with validation rules (5+ chars, 1 uppercase, 1 number, 1 special char)
- **Data entry tab**: 12 months of hardcoded input fields (Jan-Dec) with default values
- **Chart tab**: Bar chart comparing income vs expenses using Chart.js with download feature
- **Client-side only**: All data lives in DOM, no persistence between page refreshes
- **Testing**: Jest with jsdom environment for unit testing

## Key Patterns

### UI Elements

All buttons must use the pink color scheme:

```css
style="background-color: #ec4899; border-color: #ec4899"
```

### Username Validation

The `validateUsername()` function enforces these rules:

- Minimum 5 characters
- At least 1 uppercase letter (regex: `/[A-Z]/`)
- At least 1 number (regex: `/[0-9]/`)
- At least 1 special character (regex: `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/`)

Returns object with `isValid` boolean and `errors` array.

### DOM ID Convention

All input fields follow the pattern `income-{month}` and `expense-{month}` where month is a 3-letter lowercase abbreviation:

```javascript
// script.js lines 2-14
const months = ["jan", "feb", "mar", ...];
document.getElementById(`income-${month}`)
```

Input fields have CSS classes `.income-input` and `.expense-input` for event listener targeting.

### Chart Lifecycle

The chart instance is stored globally and **must be destroyed** before recreating:

```javascript
if (myChart) {
  myChart.destroy();
}
myChart = new Chart(ctx, {...});
```

This prevents memory leaks and canvas rendering issues.

### Chart Colors

- **Income**: Teal/Cyan (`rgba(75, 192, 192, 0.6)` background, `rgba(75, 192, 192, 1)` border)
- **Expense**: Pink/Red (`rgba(255, 99, 132, 0.6)` background, `rgba(255, 99, 132, 1)` border)

### Auto-Update Triggers

Chart updates on:

1. "Update Chart" button click (switches to chart tab automatically)
2. Enter key in any input field
3. Switching to the chart tab

### Chart Download

The `downloadChartAsImage()` function:

- Converts canvas to PNG using `canvas.toDataURL("image/png")`
- Creates temporary `<a>` element with download attribute
- Triggers download and removes element
- Default filename: `income-expense-chart.png`

## Dependencies (CDN-based)

- **Bootstrap 5.3.0**: UI framework and tab navigation
- **Chart.js 4.4.0**: Bar chart rendering (UMD build)
- Must load Bootstrap JS before custom script for `bootstrap.Tab` API

## Testing

- **Test Runner**: Jest 29.7.0
- **Test Environment**: jsdom (jest-environment-jsdom)
- **Test File**: `script.test.js`
- **Configuration**: `jest.config.js`
- **Package Manager**: Bun (lockfile: `bun.lock`)
- **Scripts**:
  - `bun test` - Run tests once
  - `bun test:watch` - Run tests in watch mode
  - `bun test:coverage` - Generate coverage report

The test environment uses jsdom to simulate browser DOM APIs for testing vanilla JavaScript functions.

## Development Workflow

1. Open `index.html` directly in browser - no build step required
2. Edit `script.js` and refresh to see changes
3. Run tests with `bun test` to validate changes
4. For deployment: Just push HTML/JS files to static hosting (GitHub Pages, Netlify, etc.)

## Chart Configuration Notes

- Y-axis formatted with dollar signs via `ticks.callback`
- Tooltips also use dollar formatting
- Chart maintains aspect ratio but is responsive
- Download feature exports canvas as `income-expense-chart.png`

## File Structure

```
bucks-to-bar/
├── index.html           # Main HTML file with Bootstrap UI
├── script.js            # All JavaScript logic (validation, chart, events)
├── script.test.js       # Jest unit tests
├── jest.config.js       # Jest configuration
├── package.json         # Dependencies and scripts
├── bun.lock            # Bun package manager lockfile
└── .github/
    └── copilot-instructions.md  # This file
```

## Adding New Features

- **New month**: Add input group in HTML + update `months`/`monthLabels` arrays in JS
- **New chart type**: Change `type: "bar"` in Chart.js config (e.g., "line", "radar")
- **Data persistence**: Add localStorage calls in `updateChart()` and `window.onload`

## Maintenance Checklist

Update this file when you:

- ✅ Add/remove dependencies (CDN links in HTML or devDependencies in package.json)
- ✅ Change validation rules or business logic
- ✅ Modify UI patterns (colors, button styles, form layouts)
- ✅ Add new features or functionality
- ✅ Change architecture or file structure
- ✅ Update testing setup or configuration
- ✅ Modify chart behavior or configuration

**Last Updated**: January 4, 2026
