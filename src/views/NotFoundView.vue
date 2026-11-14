<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import { copy } from '@/copy'

const nf = copy.common.notFound
/** 常用入口从导航派生（不含首页），改导航时此页自动同步 */
const links = copy.brand.nav.slice(1)
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute inset-x-0 top-0 h-[420px] bg-grid mask-fade-b opacity-60" />
    </div>

    <div class="page-wrap flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-24 text-center">
      <p class="font-mono text-[12px] tracking-[0.18em] text-faint">{{ nf.code }}</p>
      <h1 class="display mt-5 text-[clamp(30px,4.6vw,48px)]">{{ nf.title }}</h1>
      <p class="mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted">
        {{ nf.desc }}
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <RouterLink to="/" class="btn-primary h-11 px-5">
          {{ nf.backHome }}
          <Icon name="arrow" :size="14" />
        </RouterLink>
        <RouterLink to="/cases" class="btn-ghost h-11 px-5">{{ nf.browseCases }}</RouterLink>
      </div>

      <div class="mt-14 w-full max-w-[560px] border-t border-line pt-8">
        <p class="text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{{ nf.linksTitle }}</p>
        <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <RouterLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="rounded-[8px] border border-line px-3 py-2.5 text-[12.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            {{ l.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
