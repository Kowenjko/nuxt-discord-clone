<script setup lang="ts">
import { SignUp } from 'vue-clerk'

useHead({
	title: 'sign-up',
	meta: [{ name: 'description', content: 'Test dashboard' }],
})

definePageMeta({
	layout: 'auth',
})
</script>

<template>
	<SignUp path="/sign-up" forceRedirectUrl="/" sign-in-url="/sign-in" />
</template>
