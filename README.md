# Volume Booster Extension

A Firefox extension that allows users to boost and control the volume of the active tab, remembering the volume settings for each tab between sessions.

## Features

- **Volume Control**: Adjust the volume of audio and video elements in the current tab.
- **Persistent Volume**: Remembers the volume level for each tab, even after closing and reopening the browser.
- **Boost Volume**: Increase tab volume up to 600%.

## Installation

1. Download or clone this repository.
2. Open Firefox and go to `about:debugging` in the address bar.
3. Click on **This Firefox** in the left menu.
4. Click on **Load Temporary Add-on**.
5. Navigate to the folder where the extension files are stored, and select any file in that folder (such as `manifest.json`).

Now the extension should be loaded in Firefox.

## Usage

1. After installation, the extension icon will appear in the toolbar.
2. Click on the icon to open the popup, where you can control the volume.
3. Adjust the volume using the slider. The label next to the slider will show the percentage of the volume.
4. The extension will automatically save the volume for each tab and restore it the next time the tab is opened.

## How It Works

- The extension uses an `AudioContext` and a `GainNode` to control the volume of media elements in the active tab.
- The volume level is stored in the browser's `storage.local` for each tab, so the settings persist across sessions.
- The background script ensures the extension runs automatically on Firefox startup.

## Files

- `manifest.json`: Defines the extension's metadata and permissions.
- `background.js`: Manages messages between the popup and content scripts, and applies the volume control logic.
- `contentScript.js`: Injects the audio control functionality into the web pages.
- `popup.html`: The interface for controlling the volume.
- `popup.js`: Handles the volume slider logic and communicates with the background and content scripts.

## Permissions

The extension requires the following permissions:

- `activeTab`: To access the currently active tab and apply volume controls.
- `tabs`: To query and manage tabs.
- `storage`: To store and retrieve the volume settings for each tab.
