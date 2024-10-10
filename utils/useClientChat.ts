import { StreamChat } from 'stream-chat'
import type { TokenOrProvider, User } from 'stream-chat'

export type UseClientOptions = {
	user: User | null
	tokenOrProvider: TokenOrProvider
}

export const useClientChat = async ({ user, tokenOrProvider }: UseClientOptions) => {
	const { streamApiKey } = useRuntimeConfig().public

	const chatClient = ref<StreamChat>()
	const didUserConnectInterrupt = ref(false)

	const client = new StreamChat(streamApiKey)

	const connectUser = async () => {
		if (user) {
			await client.connectUser(user, tokenOrProvider)
			if (!didUserConnectInterrupt.value) chatClient.value = client
		}
	}

	const disconnectUser = async () => {
		didUserConnectInterrupt.value = true
		chatClient.value = undefined

		await client.disconnectUser()
		console.log('connection closed')
	}

	await connectUser()

	return { chatClient, disconnectUser, connectUser }
}
