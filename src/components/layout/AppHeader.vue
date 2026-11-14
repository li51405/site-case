<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { copy } from '@/copy'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const route = useRoute()
const { t } = useI18n()

const { brand, nav, header } = copy.brand

const isActive = computed(() => (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path),
)

const currentLabel = computed(() => nav.find((item) => isActive.value(item.to))?.label ?? brand.name)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 h-[64px] transition-[background-color,box-shadow,backdrop-filter] duration-300"
    :class="
      ui.isScrolled
        ? 'bg-white/85 shadow-header backdrop-blur-xl backdrop-saturate-150'
        : 'bg-white/60 backdrop-blur-sm'
    "
  >
    <div class="page-wrap flex h-full items-center justify-between gap-6">
      <!-- Brand -->
      <RouterLink to="/" class="group flex shrink-0 items-center gap-2.5" :aria-label="header.ariaHome">
        <span
          class="grid h-8 w-8 place-items-center rounded-[7px] bg-ink transition-transform duration-300 group-hover:-rotate-6"
        >
          <svg width="17" height="17" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M9 23V9" stroke="#fff" stroke-width="3" stroke-linecap="round" />
            <path d="M23 23V9" stroke="#fff" stroke-width="3" stroke-linecap="round" />
            <path d="M9 16h14" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity="0.4" />
            <circle cx="16" cy="16" r="2.8" fill="#fff" />
          </svg>
        </span>
        <span class="flex items-baseline gap-1.5">
          <span class="text-[15px] font-semibold tracking-[-0.01em] text-ink">{{ brand.name }}</span>
          <span class="hidden text-[10px] font-medium tracking-[0.16em] text-faint sm:inline">{{
            brand.nameEn
          }}</span>
        </span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 lg:flex" :aria-label="header.ariaNav">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="relative rounded-md px-3 py-2 text-[14px] transition-colors duration-200"
          :class="isActive(item.to) ? 'font-medium text-ink' : 'text-muted hover:text-ink'"
        >
          {{ item.label }}
          <span
            class="absolute inset-x-3 -bottom-px h-[2px] origin-left rounded-full bg-ink transition-transform duration-300"
            :class="isActive(item.to) ? 'scale-x-100' : 'scale-x-0'"
          />
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <a
          :href="brand.phoneHref"
          class="hidden text-[13px] font-medium tracking-[-0.01em] text-muted transition-colors hover:text-ink xl:block"
        >
          {{ brand.phone }}
        </a>
        <span class="mx-2 hidden h-4 w-px bg-line xl:block" />
        <RouterLink
          to="/contact"
          class="hidden h-9 items-center rounded-[7px] border border-line px-3.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-line-strong hover:bg-paper-2 sm:inline-flex"
        >
          {{ header.contactCta }}
        </RouterLink>
        <RouterLink
          to="/contact?intent=demo"
          class="hidden h-9 items-center rounded-[7px] border border-ink bg-ink px-3.5 text-[13.5px] font-medium text-white transition-all hover:shadow-lift active:translate-y-px sm:inline-flex"
        >
          {{ header.demoCta }}
        </RouterLink>

        <!-- Mobile trigger -->
        <button
          class="grid h-9 w-9 cursor-pointer place-items-center rounded-[7px] border border-line text-ink transition-colors hover:bg-paper-2 lg:hidden"
          :aria-expanded="ui.navOpen"
          :aria-label="header.ariaMenu"
          @click="ui.toggleNav()"
        >
          <svg v-if="!ui.navOpen" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 5h12M2 11h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <transition name="drawer">
        <div v-if="ui.navOpen" class="fixed inset-x-0 top-[64px] bottom-0 z-30 overflow-y-auto bg-paper lg:hidden">
        <div class="page-wrap py-4">
          <p class="px-1 pb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            {{ t('brand.header.current', { label: currentLabel }) }}
          </p>
          <RouterLink
            v-for="(item, index) in nav"
            :key="item.to"
            :to="item.to"
            class="flex items-start justify-between gap-4 border-b border-line py-4"
            :style="{ animationDelay: `${index * 40}ms` }"
          >
            <span class="anim-rise">
              <span class="block text-[17px] font-medium" :class="isActive(item.to) ? 'text-ink' : 'text-ink-2'">
                {{ item.label }}
              </span>
              <span class="mt-0.5 block text-[13px] text-muted">{{ item.desc }}</span>
            </span>
            <svg
              class="mt-1.5 shrink-0 text-faint"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </RouterLink>

          <div class="mt-6 flex flex-col gap-2.5">
            <RouterLink
              to="/contact?intent=demo"
              class="btn-primary w-full"
              @click="ui.closeNav()"
            >
              {{ header.drawerCta }}
            </RouterLink>
            <a :href="brand.phoneHref" class="btn-ghost w-full">{{ brand.phone }}</a>
          </div>
          <p class="mt-6 text-[12px] leading-relaxed text-faint">{{ brand.hours }}</p>
        </div>
      </div>
      </transition>
    </Teleport>
  </header>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
