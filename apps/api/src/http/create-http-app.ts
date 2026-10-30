import { sentry } from '@sentry/hono/cloudflare'
import { Hono } from 'hono'

import { handleAppError } from './handle-app-error'

// Sentry must run first to capture unhandled errors from the onError chain.
export function createHttpApp(): Hono<{ Bindings: Env }> {
	const app = new Hono<{ Bindings: Env }>()
	app.use(
		sentry(app, env => ({
			dsn: env.SENTRY_DSN,
			tracesSampleRate: 1.0,
		})),
	)
	app.onError(handleAppError)
	return app
}
