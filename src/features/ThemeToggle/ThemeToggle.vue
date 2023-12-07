<template>
  <div class="dark-mode-switch" @click="toggleDarkMode">
    <span class="icon" v-if="darkMode">🌙</span>
    <span class="icon" v-else>☀️</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const darkMode = ref(false);
    const store = useStore();

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      store.dispatch('theme/toggleDarkMode', darkMode.value);
    };

    return {
      darkMode,
      toggleDarkMode,
    };
  },
});
</script>

<style>
.dark-mode-switch {
  width: 22px;
  cursor: pointer;
}
</style>