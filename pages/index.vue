<script lang="ts" setup>
import type { User } from 'stream-chat'

const apiKey = 'ycr36xekvgpx'

type HomeState = {
	apiKey: string
	user: User | null
	token: string
}

const homeState = reactive<HomeState>({
	apiKey: '',
	user: null,
	token: '',
})

const { user: myUser } = useUser()

const registerUser = async () => {
	console.log('[registerUser] myUser:', myUser)

	const userId = myUser.value?.id
	const mail = myUser.value?.primaryEmailAddress?.emailAddress

	if (userId && mail) {
		const streamResponse = await fetch('/api/register-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				email: mail,
			}),
		})
		const responseBody = await streamResponse.json()
		console.log('[registerUser] Stream response:', responseBody)
		return responseBody
	}
}

const getUserToken = async (userId: string, userName: string) => {
	const response = await fetch('/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: userId,
		}),
	})
	const responseBody = await response.json()
	const token = responseBody.token

	if (!token) {
		console.error("Couldn't retrieve token.")
		return
	}

	const user: User = {
		id: userId,
		name: userName,
		image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
	}

	homeState.apiKey = apiKey
	homeState.user = user
	homeState.token = token
}

watch(myUser, async (value) => {
	if (
		myUser.value?.id &&
		myUser.value?.primaryEmailAddress?.emailAddress &&
		!myUser.value?.publicMetadata.streamRegistered
	) {
		console.log('[Page - useEffect] Registering user on Stream backend')

		const result = await registerUser()
		console.log('[Page - useEffect] Result: ', result)

		await getUserToken(
			myUser.value.id,
			myUser.value?.primaryEmailAddress?.emailAddress || 'Unknown'
		)
	} else {
		// take user and get token
		if (myUser.value?.id) {
			console.log(
				'[Page - useEffect] User already registered on Stream backend: ',
				myUser.value?.id
			)
			await getUserToken(
				myUser.value?.id || 'Unknown',
				myUser.value?.primaryEmailAddress?.emailAddress || 'Unknown'
			)
		}
	}
})

watch(homeState, (value) => console.log(value))

definePageMeta({
	middleware: 'auth',
	auth: {
		guestRedirectUrl: '/sign-in',
	},
})

provide('message', 'hello!')
</script>
<template>
	<div v-if="!homeState.user">Loading...</div>
	<div v-else><MyChat :user="homeState.user" :token="homeState.token" /></div>
</template>
