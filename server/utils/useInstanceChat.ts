import { StreamChat } from 'stream-chat'

export const useInstanceChat = () => {
	const config = useRuntimeConfig()

	const instanceChat = StreamChat.getInstance(config.public.streamApiKey, config.streamSecret)
	return { instanceChat }
}
