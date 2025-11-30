Deployment steps — push to GitHub and deploy to Firebase Hosting

Overview

I can't push to GitHub or deploy to Firebase for you because those operations require your credentials and access to your GitHub/Firebase account. Below are exact, copy-paste commands and a ready-to-go Firebase config in this repo that will let you:

- push the repo to your GitHub remote
- create (or reuse) a Firebase project named `priyankaPortfolio` so your site will be available at `https://priyankaPortfolio.web.app` (if the project id is available)
- build the Angular app and deploy to Firebase Hosting

Files already in this repo

- `firebase.json` — configured to serve the Angular build from `dist/myPortfolio` and to rewrite SPA routes to `index.html`. It also runs `npm --prefix . run build` before deploy.
- `.firebaserc` — currently points to an existing project in the repo. If you want the site at `priyankaPortfolio.web.app`, you need a Firebase project with id `priyankaPortfolio` (see steps below).

Step 1 — push the code to GitHub

Replace the remote URL below with `https://github.com/<your-github-username>/priyankaPortfolio.git` if it's different.

```bash
# from repository root
git remote add origin https://github.com/pranavdate8788/priyankaPortfolio.git
git branch -M main
git add --all
git commit -m "Initial commit: Priyanka portfolio updates"
git push -u origin main
```

If push fails due to authentication, either:
- set up SSH keys and use the `git@github.com:...` URL, or
- use a personal access token with HTTPS push as prompted by Git.

Step 2 — install Firebase CLI (if not installed)

```bash
npm install -g firebase-tools
# verify
firebase --version
```

Step 3 — create or reuse a Firebase project

You have two options.

Option A — Create project via Firebase Console (recommended if you prefer GUI):
1. Open https://console.firebase.google.com/ and click "Add project".
2. Choose the project ID `priyankaPortfolio` (if available). If the ID is taken you'll have to choose another, and your site will then be at `https://<project-id>.web.app`.
3. Skip adding Google Analytics if you don't need it or enable it.

Option B — Create project via CLI (may require extra APIs/permissions):

```bash
# create a new Firebase project (may ask to enable Cloud APIs)
firebase projects:create priyankaPortfolio --display-name "Priyanka Portfolio"
```

If CLI creation fails, use the Console (Option A).

Step 4 — initialize Firebase Hosting in the repo (one-time)

```bash
# login with your account
firebase login

# link this local repo to your Firebase project
firebase use --add
# choose or enter the project id: priyankaPortfolio

# initialize hosting only (if you haven't already):
firebase init hosting
# When prompted:
# - Choose the existing project (priyankaPortfolio)
# - Set public directory: dist/myPortfolio
# - Configure as a single-page app? Yes
# - Set up automatic builds and deploys with GitHub? (optional)
```

Note: this will create/update `.firebaserc` and `firebase.json` in the repo. The `firebase.json` in this repo already configures SPA rewrites and a `predeploy` build.

Step 5 — build and deploy

```bash
# run the build (firebase deploy will also run the predeploy build)
npm run build

# deploy hosting only
firebase deploy --only hosting
```

After a successful deploy you will see a URL like:

https://priyankaPortfolio.web.app

(if you created the project with id `priyankaPortfolio` and it's available)

Optional: automatic deploy on push (GitHub Actions)

Firebase can create a GitHub Action to build & deploy automatically. During `firebase init hosting`, you can choose to set up GitHub workflow automatically.

Troubleshooting tips

- If `dist/myPortfolio` doesn't exist after `npm run build`, check `angular.json` outputPath (this repo uses `dist/myPortfolio`).
- If `firebase deploy` fails due to permissions, ensure the Firebase CLI is logged in with the correct Google account and that the project exists and your account has Owner/Editor access.
- If the project id `priyankaPortfolio` is already taken, choose an available ID; the site domain will be `<project-id>.web.app`.

If you'd like I can:
- update `.firebaserc` to point to `priyankaPortfolio` now (this doesn't create the project for you). Say "please update .firebaserc" and I'll change it.
- attempt to run `git push` and `firebase deploy` from this environment if you provide Remote access or API tokens (I cannot accept credentials here — it's safer you run those commands locally).

Tell me what you'd like next:
- I can update `.firebaserc` now to `priyankaPortfolio` (no network actions), or
- I can walk you through any step interactively while you run commands locally and paste output here for troubleshooting.

GitHub Actions (automatic deploy on push)

I added a GitHub Actions workflow at `.github/workflows/firebase-deploy.yml` that will build and deploy the site on every push to `main`.

What you must do to enable CI deploy:

1. Create a Firebase CI token locally and add it to the GitHub repository secrets:

```bash
# create a CI token (run locally and copy the output token)
firebase login:ci
```

2. In your GitHub repo > Settings > Secrets & variables > Actions add a secret named `FIREBASE_TOKEN` with the token from step 1.

3. Push this repository to GitHub (see steps above). The workflow will run on push to `main` and deploy to the Firebase project configured in `.firebaserc`.

Notes about the Firebase project id and domain:

- I set `.firebaserc` default to `priyankaPortfolio`. You must create that Firebase project (via console or `firebase projects:create priyankaPortfolio`) and ensure your account has access. If the id is taken, choose an available id; the final web domain will be `https://<project-id>.web.app`.
- The workflow deploys to whatever project id is in `.firebaserc` (or the project that matches the provided `FIREBASE_TOKEN`).

If you want I can also prepare a GitHub repository (create and push) but I cannot perform the push without your credentials. If you want, follow the commands in the "Step 1 — push the code to GitHub" section in this document locally and then the workflow will run automatically.
