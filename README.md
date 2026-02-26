<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a59a5a5b-a572-4e3a-8672-809355a23dd4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## GitHub Pages Deployment

The app is deployed at `https://natalivm.github.io/IsItaBUY_gemini/`.

`vite.config.ts` sets `base: '/IsItaBUY_gemini/'` for non-Vercel environments, and the deploy workflow passes `--base /IsItaBUY_gemini/` at build time. Asset paths in `index.html` use relative paths (`./index.css`, `./index.tsx`) so they resolve correctly under the subpath on GitHub Pages and in local dev.
