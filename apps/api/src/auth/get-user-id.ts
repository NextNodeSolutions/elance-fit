import { getAuthSession } from './get-auth-session'

import type { GetUserId } from './ports/get-user-id'

export const getUserId: GetUserId = async (env, headers) => {
	const authSession = await getAuthSession(env, headers)
	return authSession?.user.id ?? null
}
