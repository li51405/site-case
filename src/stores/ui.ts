import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const navOpen = ref(false)
  const isScrolled = ref(false)
  const showBackTop = ref(false)

  function toggleNav(value?: boolean) {
    navOpen.value = typeof value === 'boolean' ? value : !navOpen.value
    if (typeof document !== 'undefined') {
      document.body.style.overflow = navOpen.value ? 'hidden' : ''
    }
  }

  function closeNav() {
    toggleNav(false)
  }

  function setScrolled(value: boolean) {
    isScrolled.value = value
  }

  function setShowBackTop(value: boolean) {
    showBackTop.value = value
  }

  return { navOpen, isScrolled, showBackTop, toggleNav, closeNav, setScrolled, setShowBackTop }
})
