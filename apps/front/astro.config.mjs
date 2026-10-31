// @ts-check
import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
// oxlint-disable-next-line import(default): the exports map routes to a runtime module where the default export is dynamic
import sentry from '@sentry/astro'
import tailwindcss from '@tailwindcss/vite'

// The mobile mockup board is a design artifact, not a product page: it is only
// injected as a route during local development, so the production build never
// emits it (no /maquette route, nothing to expose).
/** @type {import('astro').AstroIntegration} */
const devOnlyMockupBoard = {
	name: 'dev-only-mockup-board',
	hooks: {
		'astro:config:setup': ({ command, injectRoute }) => {
			if (command !== 'dev') return
			injectRoute({
				pattern: '/maquette',
				entrypoint: './src/features/maquette/maquette-page.astro',
			})
		},
	},
}

export default defineConfig({
	output: 'server',
	adapter: cloudflare({
		configPath: 'wrangler.dev.jsonc',
	}),
	integrations: [react(), sentry(), devOnlyMockupBoard],
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			optimizeDeps: {
				// The SSR dependency scan only crawls pages and components. What only
				// the middleware reaches (Sentry server config) or what is injected at
				// runtime (Sentry's middleware, Astro's JSON logger) would be found
				// late, re-run the optimizer and leave two copies of React in workerd,
				// which breaks hooks. Not `environments.ssr`: declaring it replaces the
				// adapter's SSR build input and renames dist/server/entry.mjs.
				include: [
					'@sentry/astro',
					'@sentry/astro/middleware',
					'astro/logger/json',
				],
			},
		},
	},
})
