<script lang="ts" setup>
import { SignIn } from 'vue-clerk'

definePageMeta({ layout: 'auth' })
</script>

<template>
	<SignIn path="/sign-in" ,forceRedirectUrl="http://localhost:3000/" signUpUrl="/sign-up" />
</template>
