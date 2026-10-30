import type { UnauthorizedResponse } from './responses'

export type AppErrorStatus = 400 | 401 | 404 | 500

export type AppErrorBody =
	| { code: string; message: string }
	| UnauthorizedResponse

export abstract class AppError extends Error {
	abstract readonly code: string
	readonly status?: AppErrorStatus

	constructor(message: string) {
		super(message)
		this.name = new.target.name
		Object.setPrototypeOf(this, new.target.prototype)
	}

	toJSON(): AppErrorBody {
		return { code: this.code, message: this.message }
	}
}
