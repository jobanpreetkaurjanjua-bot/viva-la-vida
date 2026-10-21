# Deploying "Viva La Vida" to Netlify 🚀

Your Viva La Vida website is pre-configured and 100% ready for Netlify deployment!

---

### Configuration Files Added:
1. **`netlify.toml`**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **SPA Redirect**: `/*` to `/index.html` (status 200) to ensure refresh and direct URLs work seamlessly.
   - **Security Headers**: Added X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and immutable asset caching.
2. **`public/_redirects`**:
   - Contains fallback rewrite rules (`/*  /index.html  200`) so Netlify Drop / manual uploads also maintain routing.

---

### Method 1: Deploy with Git (Recommended)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [app.netlify.com](https://app.netlify.com) and log in.
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select your Git provider and choose the repository.
5. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy Viva La Vida"**.

---

### Method 2: Deploy with Netlify CLI
Run from your terminal:
```bash
# 1. Build the production bundle
npm run build

# 2. Deploy directly to Netlify
npx netlify deploy --prod --dir=dist
```

---

### Method 3: Drag & Drop (Netlify Drop)
1. Run `npm run build` locally.
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder into the browser window.
