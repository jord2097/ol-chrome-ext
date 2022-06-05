# Omniplex Chrome Extension

## Features
- Login form with validation via extension popout script
- On login displays a "Hi {user}" welcome message and a logout button
- When logged in, an idle timer starts. When 5s is reached a popup saying "Are you lost {name}?" is injected to the page using a content script.
- The popup has a 'Yes' button to open the help centre in a new tab, and a 'No' button to close it
- The popup is been placed within a shadow DOM root to prevent CSS conflicts
- The elements are styled with TailwindCSS
- All scripts are compiled from TypeScript

## Development Requirements
Tailwind build on change:
npx tailwindcss -i styles.css -o output.css --watch

Use CRX-hot-reload for automatic reload on save:
"background": { "scripts": ["hot-reload.js"] }, (in manifest.json)

