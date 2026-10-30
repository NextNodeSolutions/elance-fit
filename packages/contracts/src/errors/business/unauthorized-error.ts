import { AppError } from '../app-error'
import { UNAUTHORIZED_MESSAGE } from '../constants'

import type { UnauthorizedResponse } from '../responses'

export class UnauthorizedError extends AppError {
	readonly code = 'UNAUTHORIZED'
	override readonly status = 401

	constructor() {
		super(UNAUTHORIZED_MESSAGE)
	}

	override toJSON(): UnauthorizedResponse {
		return { error: UNAUTHORIZED_MESSAGE }
	}
}
