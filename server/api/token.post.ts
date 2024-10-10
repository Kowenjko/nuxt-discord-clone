export default defineEventHandler(async (event) => {
	const { instanceChat } = useInstanceChat()

	const body = await readBody(event)
	console.log('[/api/token] Body:', body)

	const userId = body?.userId
	if (!userId) errorHandler(401, 'Unauthorized')

	const token = instanceChat.createToken(userId)

	return { userId: userId, token: token }
})
