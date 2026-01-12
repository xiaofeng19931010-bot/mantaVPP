# Manta Web Deployment Guide

This project is a static web application that requires no build step.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Open your terminal in this directory.
2. Run the following command:
   ```bash
   npx vercel
   ```
3. Follow the interactive prompts:
   - Log in to Vercel (if not already logged in).
   - Confirm the project settings (defaults are usually correct).
   - Wait for deployment to complete.

### Option 2: Netlify

1. Drag and drop the `manta_web` folder into the [Netlify Drop](https://app.netlify.com/drop) zone.

### Option 3: GitHub Pages

1. Push this repository to GitHub.
2. Go to Repository Settings > Pages.
3. Select the `main` branch and `/` (root) folder.
4. Save.

## Local Development

To run the project locally:

```bash
python3 -m http.server 8083
```
Then visit `http://localhost:8083`.
