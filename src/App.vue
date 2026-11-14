<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { copy } from '@/copy'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const route = useRoute()
const ticking = ref(false)

function onScroll() {
  if (ticking.value) return
  ticking.value = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    ui.setScrolled(y > 8)
    ui.setShowBackTop(y > 900)
    ticking.value = false
  })
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.fullPath,
  () => {
    ui.closeNav()
  },
)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen bg-paper">
    <AppHeader />

    <main class="pt-[64px]">
      <router-view v-slot="{ Component, route: current }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="current.path" />
        </transition>
      </router-view>
    </main>

    <AppFooter />

    <transition name="fade">
      <button
        v-show="ui.showBackTop"
        class="fixed bottom-6 right-6 z-30 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-paper text-ink shadow-lift transition hover:border-line-strong hover:bg-paper-2"
        :aria-label="copy.common.backToTop"
        @click="backToTop"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
