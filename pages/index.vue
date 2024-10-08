<script lang="ts" setup>
definePageMeta({
	middleware: 'auth',
	auth: {
		guestRedirectUrl: '/sign-in',
	},
})
</script>
<template>
	<div>Index</div>
</template>
