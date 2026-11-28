# Deployment (GitHub Actions → Vercel)

| Trigger | Workflow | Result |
| --- | --- | --- |
| Pull request, push to a feature branch | `ci.yml` | typegen, `tsc`, lint (non-blocking), `next build` |
| Push to `main` | `deploy.yml` | CI, then a Vercel **Preview** build of main (GitHub environment `development`) |
| Push tag `v1.2.3` | `deploy.yml` | checks the commit is on main and deployed to development, waits for approval, then Vercel **Production** |

Vercel's own Git deploys are switched off for `main` and production in `vercel.json`, so the Vercel GitHub app
(if connected) still makes previews for feature branches, but main and production only come from Actions.

## One-time setup

1. **Vercel project.** Run `npx vercel link` in this folder once. `.vercel/project.json` (git-ignored) then holds
   `orgId` and `projectId`. In the project settings, set Node.js to **24.x** to match `.nvmrc`.
2. **Vercel token.** Vercel → Account settings → Tokens → create one scoped to the team that owns the project.
3. **GitHub environments.** Repo → Settings → Environments → create `development` and `production`.
   - `production`: add **Required reviewers**, and under *Deployment branches and tags* allow only tags `v*`.
   - `development`: allow only the branch `main`.
4. **Secrets and variables.** Set them on each environment, or once at repository level if both share them:

   | Name | Kind | Value |
   | --- | --- | --- |
   | `VERCEL_TOKEN` | secret | the token from step 2 |
   | `VERCEL_ORG_ID` | variable | `team_JKG6Yc0A967ggqoS7lWHcvT8` (`orgId` in `.vercel/project.json`) |
   | `VERCEL_PROJECT_ID` | variable | `prj_jNUmLk9XgKeC6ALefjYnF2dcisjf` (`projectId` in `.vercel/project.json`) |
   | `APP_DOMAIN_ALIAS` | variable, `development` only | `oro-skin-dev.vercel.app`: always points at the newest main build |

   Production is served at **https://oro-skin.vercel.app**, the project's production domain in Vercel, which
   `vercel deploy --prod` updates on its own. Don't set `APP_DOMAIN_ALIAS` on `production`.

5. **App variables** (`API_URL`, ...) go in the Vercel project → Settings → Environment Variables, per
   environment (Preview / Production). `vercel pull` loads them into the build. Leave `API_URL` empty to use
   the built-in mock data.

## Releasing

```sh
git checkout main && git pull
git tag v1.0.0 && git push origin v1.0.0
```

Wait for the main deploy of that commit to finish first; the tag run refuses commits with no successful
development deployment. Then approve the run in GitHub Actions.

## Rollback

- Fastest: Vercel dashboard → Deployments → the previous production deployment → **Promote**.
- Or: Actions → Deploy → **Run workflow** → pick an older tag.
