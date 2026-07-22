# Slink Collector - Chrome Extension for slink service

## Usage

- Register and create API token from https://slink.fly.dev
- Configure api-entry from Options Page
  - API URL: https://slink.fly.dev/api/user_links/collect
  - Bear Token: xxx-your-api-token
  - Note: happy slink

## Develop

run `bun vite build` to generate the `dist` directory.

Load the extension in Chrome:

- Open `chrome://extensions/`, enabling Developer mode.
- Load the unpacked extension, and select the `dist` folder.
- Set keyboard shortcuts:
  collect command: `⌘+E`
- Test the webpage collection and options configuration page.

Note: After building, the extension must be reloaded.

- https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

## Stack upgrade

Vite + Bun + Preact (或者 SolidJS)
