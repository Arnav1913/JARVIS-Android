# J.A.R.V.I.S. — Android Web Edition

An Iron Man-inspired, installable web-app prototype for Android.

## Features
- Futuristic blue interface
- Voice input in browsers that support the Web Speech API
- Spoken responses using browser speech synthesis
- Local commands for time/date
- Shortcuts for YouTube, Google, Maps, Gmail and GitHub
- Google web search
- Basic offline app shell through a service worker

## Publish with GitHub Pages
1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then Save.
4. Wait for the Pages deployment to finish. The site URL will be shown in the Pages section.

## Install on Android
1. Open the published HTTPS URL in Chrome.
2. Allow microphone access when prompted (voice input only).
3. Open Chrome's menu and choose **Add to Home screen** or **Install app**.

## Important limitations
This is a first-version browser prototype, not a full AI backend. It does not have an always-on wake word, run continuously in the background, control arbitrary phone settings/apps, or connect to a language-model API. Voice recognition depends on browser/device support and internet connectivity. Do not put API keys, passwords, or private information in this public repository.
