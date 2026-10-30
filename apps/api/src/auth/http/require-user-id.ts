import { UnauthorizedError } from '@elance/contracts'
import { createMiddleware } from 'hono/factory'

import type { MiddlewareHandler } from 'hono'
import type { GetUserId } from '../ports/get-user-id'

export type AuthenticatedEnv = {
	Bindings: Env
	Variables: { userId: string }
}

export function requireUserId(
	getUserId: GetUserId,
): MiddlewareHandler<AuthenticatedEnv> {
	return createMiddleware<AuthenticatedEnv>(async (res, next) => {
		const userId = await getUserId(res.env, res.req.raw.headers)
		if (!userId) {
			const error = new UnauthorizedError()
			return res.json(error.toJSON(), error.status)
		}
		res.set('userId', userId)
		return next()
	})
}
