# @elance/front

Front de elance.fit : Astro 7 + React (îlots), déployé en Worker Cloudflare via
`@astrojs/cloudflare` sur `elance.fit`.

## Conventions

- **Service binding** : l'accès à l'API se fait via `env.API` (Fetcher) depuis
  `src/lib/api.ts` — jamais d'URL peer.
- **Santé** : `GET /healthz` (endpoint SSR, contrat du smoke check infra).
- **Build** : `astro build` produit `dist/server/entry.mjs` + `dist/client`
  (contrat d'entrée de l'infra).

## Commandes

```sh
pnpm --filter @elance/front dev         # astro dev
pnpm --filter @elance/front build       # build de production
pnpm --filter @elance/front type-check  # astro check
pnpm --filter @elance/front test:unit   # vitest
```

Les types Worker (`worker-configuration.d.ts`) sont générés depuis la racine :
`pnpm types:gen` (source de vérité : `nextnode.toml`).
