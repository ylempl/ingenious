<template>
	<main :class="{ dark: darkMode }">
		<h2 class="title">Stops Board</h2>
		<nav class="round">
			<router-link
				class="link"
				:class="{ 'active-link': $route.path === '/' }"
				to="/"
				>Lines</router-link
			>
			<router-link
				class="link"
				:class="{ 'active-link': $route.path === '/stops' }"
				to="/stops"
				>Stops</router-link
			>
		</nav>
		<router-view />
		<footer>
			<ThemeToggle />
		</footer>
	</main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import ThemeToggle from '@/features/ThemeToggle/ThemeToggle.vue';

export default defineComponent({
	components: {
		ThemeToggle,
	},
	setup() {
		const store = useStore();

		const darkMode = computed<boolean>(() => {
			return store.state.theme.darkMode;
		});

		return {
			darkMode,
		};
	},
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');
@import url('./style/reset.scss');
@import url('./style/main.scss');
@import url('./style/scrollbar.scss');
</style>
