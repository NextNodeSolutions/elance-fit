import {
	HTTP_NOT_FOUND,
	HTTP_OK,
	SETTINGS_PROFILE_NOT_FOUND_MESSAGE,
	SettingsProfileBodySchema,
} from '@elance/contracts'
import { Hono } from 'hono'
import { validator } from 'hono-openapi'

import { requireUserId } from '../../auth/http/require-user-id'
import { rejectInvalidInput } from '../../http/reject-invalid-input'
import { deleteAccount } from '../application/delete-account'
import { getApiToken } from '../application/get-api-token'
import { getSettingsProfile } from '../application/get-settings-profile'
import { updateSettingsProfile } from '../application/update-settings-profile'

import {
	describeSettingsTokenRoute,
	describeGetProfileRoute,
	describeUpdateProfileRoute,
	describeDeleteAccountRoute,
} from './settings-route-descriptions'

import type { GetUserId } from '../../auth/ports/get-user-id'
import type { AccountRepository } from '../ports/account-repository'
import type { ApiTokenRepository } from '../ports/api-token-repository'
import type { SettingsProfileRepository } from '../ports/settings-profile-repository'

export type SettingsDeps = {
	createRepository: (db: D1Database) => ApiTokenRepository
	createProfileRepository: (db: D1Database) => SettingsProfileRepository
	createAccountRepository: (db: D1Database) => AccountRepository
	getUserId: GetUserId
}

const validateSettingsProfileBody = validator(
	'json',
	SettingsProfileBodySchema,
	rejectInvalidInput,
)

export function createSettingsRoutes(
	deps: SettingsDeps,
): Hono<{ Bindings: Env }> {
	const routes = new Hono<{ Bindings: Env }>()
	registerSettingsTokenRoute(routes, deps)
	registerGetProfileRoute(routes, deps)
	registerUpdateProfileRoute(routes, deps)
	registerDeleteAccountRoute(routes, deps)
	return routes
}

function registerSettingsTokenRoute(
	routes: Hono<{ Bindings: Env }>,
	deps: SettingsDeps,
): void {
	routes.get(
		'/token',
		describeSettingsTokenRoute,
		requireUserId(deps.getUserId),
		async res => {
			const userId = res.get('userId')
			const token = await getApiToken(
				deps.createRepository(res.env.DB),
				userId,
			)
			return res.json({ token }, HTTP_OK)
		},
	)
}

function registerGetProfileRoute(
	routes: Hono<{ Bindings: Env }>,
	deps: SettingsDeps,
): void {
	routes.get(
		'/profile',
		describeGetProfileRoute,
		requireUserId(deps.getUserId),
		async res => {
			const userId = res.get('userId')
			const profile = await getSettingsProfile(
				deps.createProfileRepository(res.env.DB),
				userId,
			)
			if (!profile) {
				return res.json(
					{ error: SETTINGS_PROFILE_NOT_FOUND_MESSAGE },
					HTTP_NOT_FOUND,
				)
			}
			return res.json({ profile }, HTTP_OK)
		},
	)
}

function registerUpdateProfileRoute(
	routes: Hono<{ Bindings: Env }>,
	deps: SettingsDeps,
): void {
	routes.patch(
		'/profile',
		describeUpdateProfileRoute,
		validateSettingsProfileBody,
		requireUserId(deps.getUserId),
		async res => {
			const userId = res.get('userId')
			const patch = res.req.valid('json')
			const profile = await updateSettingsProfile(
				deps.createProfileRepository(res.env.DB),
				userId,
				patch,
			)
			if (!profile) {
				return res.json(
					{ error: SETTINGS_PROFILE_NOT_FOUND_MESSAGE },
					HTTP_NOT_FOUND,
				)
			}
			return res.json({ profile }, HTTP_OK)
		},
	)
}

function registerDeleteAccountRoute(
	routes: Hono<{ Bindings: Env }>,
	deps: SettingsDeps,
): void {
	routes.delete(
		'/account',
		describeDeleteAccountRoute,
		requireUserId(deps.getUserId),
		async res => {
			const userId = res.get('userId')
			await deleteAccount(
				deps.createAccountRepository(res.env.DB),
				userId,
			)
			return res.json({ ok: true }, HTTP_OK)
		},
	)
}
