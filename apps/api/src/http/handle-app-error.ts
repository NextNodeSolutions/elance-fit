import { AppError, HTTP_BAD_REQUEST } from '@elance/contracts'
import { HTTPException } from 'hono/http-exception'

import type { ValidationErrorResponse } from '@elance/contracts'
import type { ErrorHandler } from 'hono'

export const handleAppError: ErrorHandler<{ Bindings: Env }> = (error, res) => {
	if (error instanceof AppError && error.status) {
		return res.json(error.toJSON(), error.status)
	}
	if (error instanceof HTTPException && error.status === HTTP_BAD_REQUEST) {
		const body: ValidationErrorResponse = { errors: [error.message] }
		return res.json(body, HTTP_BAD_REQUEST)
	}
	throw error
}
