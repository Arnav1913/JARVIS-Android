# J.A.R.V.I.S. Gemini AI backend

The frontend calls a Cloudflare Worker. The Gemini API key must only be stored as a Worker secret, never in this public repository or in index.html.

## Deploy the Worker
1. Create/sign in to a Cloudflare account: https://dash.cloudflare.com/sign-up
2. Open Workers & Pages and create a Worker.
3. Name it jarvis-ai and deploy the starter Worker.
4. Open Edit code and replace the starter code with the contents of ../worker.js (the worker/worker.js file in this repository). Save and deploy.
5. In the Worker Settings, open Variables and Secrets. Add a Secret named GEMINI_API_KEY and paste your Google AI Studio API key as its value. Save.
6. Copy the Worker URL, usually https://jarvis-ai.<your-subdomain>.workers.dev

## Create a Gemini API key
1. Open https://aistudio.google.com/app/apikey
2. Create an API key and copy it privately.
3. Do not send it to anyone, including ChatGPT. Paste it only into the Cloudflare Worker secret field above.

## Connect the app
After the Worker is deployed and the secret is saved, replace the AI_ENDPOINT placeholder in index.html with your exact Worker URL, commit the change, then wait for GitHub Pages to publish. The frontend is configured to accept requests only through the Worker.

The Worker allows requests only from https://arnav1913.github.io and uses Gemini's Interactions API.