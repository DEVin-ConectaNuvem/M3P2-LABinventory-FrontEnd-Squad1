import { useStore } from 'vuex'
import { computed } from 'vue'

export function useGeneralLoading() {
  const store = useStore()

  const statusLoading = computed(() => store.state.configModule.configs.loading)

  function toggleLoading(payload) {
    store.dispatch('configModule/toggleLoading', payload)
  }

  return {
    statusLoading,
    toggleLoading
  }
}
