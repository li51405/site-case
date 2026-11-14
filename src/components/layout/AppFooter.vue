<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { copy } from '@/copy'

const { t } = useI18n()
const year = new Date().getFullYear()
const brand = copy.brand.brand
const footer = copy.brand.footer
</script>

<template>
  <footer class="border-t border-line bg-paper-2">
    <div class="page-wrap pb-6 pt-7 lg:pb-10 lg:pt-14">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <!-- Brand -->
        <div v-reveal>
          <div class="hidden items-center gap-2.5 lg:flex">
            <span class="grid h-8 w-8 place-items-center rounded-[7px] bg-ink">
              <svg width="17" height="17" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M9 23V9" stroke="#fff" stroke-width="3" stroke-linecap="round" />
                <path d="M23 23V9" stroke="#fff" stroke-width="3" stroke-linecap="round" />
                <path d="M9 16h14" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity="0.4" />
                <circle cx="16" cy="16" r="2.8" fill="#fff" />
              </svg>
            </span>
            <span class="text-[15px] font-semibold text-ink">{{ brand.name }}</span>
          </div>
          <p class="max-w-[300px] text-[12.5px] leading-relaxed text-muted lg:mt-4">
            {{ t('brand.footer.about', { slogan: brand.slogan, since: brand.since }) }}
          </p>
          <div
            class="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-0.5 lg:mt-5"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-jade anim-pulse-dot" />
            <span class="text-[11px] font-medium text-muted">{{ footer.statusOk }}</span>
          </div>
        </div>

        <!-- Links: desktop columns -->
        <div
          v-for="(col, i) in footer.columns"
          :key="col.title"
          v-reveal="(i + 1) * 90"
          class="hidden lg:block"
        >
          <h3 class="text-[12px] font-semibold uppercase tracking-[0.12em] text-faint">
            {{ col.title }}
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink
                :to="link.to"
                class="text-[13.5px] text-muted transition-colors hover:text-ink"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Contact strip: mobile compact (icon + value, no labels) -->
      <div class="mt-5 border-t border-line pt-3 lg:hidden">
        <a
          :href="brand.phoneHref"
          class="flex items-center gap-2 py-1.5 text-[13.5px] font-medium text-ink transition-colors active:text-brand"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="shrink-0 text-faint" aria-hidden="true">
            <path
              d="M3.1 2.4h2.2l1.1 2.8-1.4 1a9.4 9.4 0 0 0 4.8 4.8l1-1.4 2.8 1.1v2.2a1.1 1.1 0 0 1-1.2 1.1A11.9 11.9 0 0 1 2 3.6a1.1 1.1 0 0 1 1.1-1.2Z"
              stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"
            />
          </svg>
          {{ brand.phone }}
        </a>
        <a
          :href="`mailto:${brand.email}`"
          class="flex items-center gap-2 py-1.5 text-[13.5px] font-medium text-ink transition-colors active:text-brand"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="shrink-0 text-faint" aria-hidden="true">
            <rect x="2" y="3.2" width="12" height="9.6" rx="1.2" stroke="currentColor" stroke-width="1.3" />
            <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ brand.email }}
        </a>
        <p class="flex items-start gap-2 py-1.5 text-[13px] leading-relaxed text-ink-2">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="mt-1 shrink-0 text-faint" aria-hidden="true">
            <path
              d="M8 14s5-4.1 5-7.5A5 5 0 0 0 3 6.5C3 9.9 8 14 8 14Z"
              stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"
            />
            <circle cx="8" cy="6.5" r="1.6" stroke="currentColor" stroke-width="1.2" />
          </svg>
          {{ brand.address }}
        </p>
      </div>

      <!-- Contact strip: tablet/desktop 3-col with labels -->
      <div class="mt-12 hidden border-t border-line pt-8 sm:grid sm:grid-cols-3 sm:gap-x-4 lg:mt-14">
        <div>
          <p class="text-[11px] uppercase tracking-[0.12em] text-faint">{{ footer.hotlineLabel }}</p>
          <a
            :href="brand.phoneHref"
            class="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-brand sm:text-[15px]"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="shrink-0 text-faint" aria-hidden="true">
              <path
                d="M3.1 2.4h2.2l1.1 2.8-1.4 1a9.4 9.4 0 0 0 4.8 4.8l1-1.4 2.8 1.1v2.2a1.1 1.1 0 0 1-1.2 1.1A11.9 11.9 0 0 1 2 3.6a1.1 1.1 0 0 1 1.1-1.2Z"
                stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"
              />
            </svg>
            {{ brand.phone }}
          </a>
        </div>
        <div>
          <p class="text-[11px] uppercase tracking-[0.12em] text-faint">{{ footer.emailLabel }}</p>
          <a
            :href="`mailto:${brand.email}`"
            class="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-brand sm:text-[15px]"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="shrink-0 text-faint" aria-hidden="true">
              <rect x="2" y="3.2" width="12" height="9.6" rx="1.2" stroke="currentColor" stroke-width="1.3" />
              <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ brand.email }}
          </a>
        </div>
        <div>
          <p class="text-[11px] uppercase tracking-[0.12em] text-faint">{{ footer.addressLabel }}</p>
          <p class="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{{ brand.address }}</p>
        </div>
      </div>

      <!-- Legal: mobile compact -->
      <div class="mt-3.5 border-t border-line pt-3 text-[11.5px] leading-relaxed text-faint lg:hidden">
        <p>{{ t('brand.footer.copyrightMobile', { year, name: brand.name, icp: footer.icp }) }}</p>
        <p class="mt-1 flex items-center gap-x-3">
          <span class="cursor-default transition-colors hover:text-muted">{{ footer.privacy }}</span>
          <span class="cursor-default transition-colors hover:text-muted">{{ footer.terms }}</span>
        </p>
      </div>

      <!-- Legal: desktop -->
      <div
        class="mt-10 hidden flex-row items-center justify-between border-t border-line pt-6 text-[12px] text-faint lg:flex"
      >
        <p>{{ t('brand.footer.copyrightDesktop', { year, name: brand.name }) }}</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span class="cursor-default transition-colors hover:text-muted">{{ footer.privacy }}</span>
          <span class="cursor-default transition-colors hover:text-muted">{{ footer.terms }}</span>
          <span class="cursor-default transition-colors hover:text-muted">{{ footer.whitepaper }}</span>
          <span>{{ footer.icp }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
