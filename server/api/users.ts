import { UserObject } from '@/types'

export default defineEventHandler(async (event) => {
	const { instanceChat } = useInstanceChat()

	const { users } = await instanceChat.queryUsers({})

	if (!users) errorHandler(404, 'Not user')

	const data: UserObject[] = users
		.filter((user) => user.role !== 'admin')
		.map((user) => {
			return {
				id: user.id,
				name: user.name ?? user.id,
				image: user.image as string,
				online: user.online,
				lastOnline: user.last_active,
			}
		})

	return data
})
