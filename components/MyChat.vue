<script lang="ts" setup>
const { user, token } = defineProps<{
	user: any
	token: string
}>()
const { chatClient, disconnectUser } = await useClientChat({
	user,
	tokenOrProvider: token,
})

console.log(chatClient.value)

onUnmounted(disconnectUser)

const test = inject('message')
</script>
<template>
	<div>MyChat - {{ test }}</div>
</template>
