// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	modules: ['@nuxt/image', 'nuxt-typed-router', 'vue-clerk/nuxt', '@nuxt/fonts'],
	runtimeConfig: {
		public: {
			clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		},
		clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
	},

	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	clerk: {
		appearance: { variables: { colorPrimary: '#007ac2' } },
	},
})
