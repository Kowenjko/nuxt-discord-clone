import { clerkClient } from '#clerk'

export default defineEventHandler(async (event) => {
	const { instanceChat } = useInstanceChat()

	const body = await readBody(event)
	console.log('[/api/register-user] Body:', body)

	const userId = body?.userId
	const mail = body?.email

	if (!userId || !mail) errorHandler(401, 'Unauthorized')

	await instanceChat.upsertUser({
		id: userId,
		role: 'user',
		name: mail,
		imageUrl: `https://getstream.io/random_png/?id=${userId}&name=${mail}`,
	})

	const params = {
		publicMetadata: {
			streamRegistered: true,
		},
	}

	const updatedUser = await clerkClient(event).users.updateUser(userId, params)

	console.log('[/api/register-user] User:', updatedUser)

	return { userId: userId, userName: mail }
})
