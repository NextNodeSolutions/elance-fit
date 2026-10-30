import {
	HTTP_BAD_REQUEST,
	HTTP_NOT_FOUND,
	HTTP_OK,
	HTTP_UNAUTHORIZED,
	SettingsAccountDeletedResponseSchema,
	SettingsProfileNotFoundResponseSchema,
	SettingsProfileResponseSchema,
	SettingsTokenResponseSchema,
	UnauthorizedResponseSchema,
	ValidationErrorResponseSchema,
} from '@elance/contracts'
import { describeRoute, resolver } from 'hono-openapi'

const unauthorizedResponseSchema = resolver(UnauthorizedResponseSchema)
const notFoundResponseSchema = resolver(SettingsProfileNotFoundResponseSchema)
const validationResponseSchema = resolver(ValidationErrorResponseSchema)

export const describeSettingsTokenRoute = describeRoute({
	summary: 'Get current API token',
	tags: ['Settings'],
	security: [{ cookieAuth: [] }],
	responses: {
		[HTTP_OK]: {
			description: 'API token for the current user',
			content: {
				'application/json': {
					schema: resolver(SettingsTokenResponseSchema),
				},
			},
		},
		[HTTP_UNAUTHORIZED]: {
			description: 'Missing session',
			content: {
				'application/json': { schema: unauthorizedResponseSchema },
			},
		},
	},
})

export const describeGetProfileRoute = describeRoute({
	summary: 'Get the current user profile',
	tags: ['Settings'],
	security: [{ cookieAuth: [] }],
	responses: {
		[HTTP_OK]: {
			description: 'User profile',
			content: {
				'application/json': {
					schema: resolver(SettingsProfileResponseSchema),
				},
			},
		},
		[HTTP_NOT_FOUND]: {
			description: 'No profile for the current user',
			content: { 'application/json': { schema: notFoundResponseSchema } },
		},
		[HTTP_UNAUTHORIZED]: {
			description: 'Missing session',
			content: {
				'application/json': { schema: unauthorizedResponseSchema },
			},
		},
	},
})

export const describeUpdateProfileRoute = describeRoute({
	summary: 'Update the current user profile',
	tags: ['Settings'],
	security: [{ cookieAuth: [] }],
	responses: {
		[HTTP_OK]: {
			description: 'Updated user profile',
			content: {
				'application/json': {
					schema: resolver(SettingsProfileResponseSchema),
				},
			},
		},
		[HTTP_BAD_REQUEST]: {
			description: 'Invalid body',
			content: {
				'application/json': { schema: validationResponseSchema },
			},
		},
		[HTTP_NOT_FOUND]: {
			description: 'No profile for the current user',
			content: { 'application/json': { schema: notFoundResponseSchema } },
		},
		[HTTP_UNAUTHORIZED]: {
			description: 'Missing session',
			content: {
				'application/json': { schema: unauthorizedResponseSchema },
			},
		},
	},
})

export const describeDeleteAccountRoute = describeRoute({
	summary: 'Delete the current user account and all related data',
	tags: ['Settings'],
	security: [{ cookieAuth: [] }],
	responses: {
		[HTTP_OK]: {
			description: 'Account deleted',
			content: {
				'application/json': {
					schema: resolver(SettingsAccountDeletedResponseSchema),
				},
			},
		},
		[HTTP_UNAUTHORIZED]: {
			description: 'Missing session',
			content: {
				'application/json': { schema: unauthorizedResponseSchema },
			},
		},
	},
})
