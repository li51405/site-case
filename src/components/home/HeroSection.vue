<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ConsoleMock from '@/components/graphics/ConsoleMock.vue'
import Icon from '@/components/ui/Icon.vue'
import StatCounter from '@/components/ui/StatCounter.vue'
import { copy } from '@/copy'

const { heroMetrics, trustLogos } = copy.brand
const hero = copy.home.hero

/** 背景微视差：网格与光晕以不同速率随滚动缓慢上移，产生纵深 */
const gridLayer = ref<HTMLElement>()
const glowLayer = ref<HTMLElement>()
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    if (gridLayer.value) gridLayer.value.style.transform = `translateY(${y * 0.12}px)`
    if (glowLayer.value) glowLayer.value.style.transform = `translateY(${y * 0.22}px)`
    ticking = false
  })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || location.search.includes('noreveal')) return
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- backdrop -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        ref="gridLayer"
        class="absolute inset-x-0 top-0 h-[620px] bg-grid mask-fade-b opacity-70 anim-grid-drift"
      />
      <div class="absolute left-1/2 top-[-160px] h-[420px] w-[880px] -translate-x-1/2">
        <div ref="glowLayer" class="h-full w-full">
          <div
            class="h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(35,131,226,0.10),transparent)] blur-2xl anim-glow"
          />
        </div>
      </div>
    </div>

    <div class="page-wrap pb-14 pt-14 sm:pb-20 sm:pt-24">
      <!-- headline block：首屏 stagger 编排（0 / 120 / 220 / 340 / 460 / 580ms） -->
      <div class="mx-auto max-w-[860px] text-center">
        <RouterLink
          to="/technology"
          class="group inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-[12.5px] text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-ink anim-rise"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-jade anim-pulse-dot" />
          </span>
          <span>{{ hero.badge }}</span>
          <span class="h-3 w-px bg-line" />
          <span class="flex items-center gap-1 font-medium text-ink">
            {{ hero.badgeAction }}
            <Icon name="arrow" :size="12" class="transition-transform group-hover:translate-x-0.5" />
          </span>
        </RouterLink>

        <h1 class="display mt-6 text-[clamp(34px,5.6vw,60px)]">
          <span class="block anim-rise" style="animation-delay: 120ms">{{ hero.titleLine1 }}</span>
          <span class="block anim-rise" style="animation-delay: 220ms">{{ hero.titleLine2 }}</span>
        </h1>

        <p
          class="mx-auto mt-6 max-w-[620px] text-[16.5px] leading-[1.75] text-muted sm:text-[18px] anim-rise"
          style="animation-delay: 340ms"
        >
          {{ hero.introLead }}
          <strong class="font-medium text-ink-2">{{ hero.introHighlight1 }}</strong>
          {{ hero.introJoin }}
          <strong class="font-medium text-ink-2">{{ hero.introHighlight2 }}</strong>{{ hero.introTail }}
        </p>

        <div
          class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row anim-rise"
          style="animation-delay: 460ms"
        >
          <RouterLink to="/contact?intent=assessment" class="btn-primary h-12 w-full px-6 text-[14.5px] sm:w-auto">
            {{ hero.primaryCta }}
            <Icon name="arrow" :size="15" />
          </RouterLink>
          <RouterLink to="/cases" class="btn-ghost h-12 w-full px-5 text-[14.5px] sm:w-auto">
            {{ hero.secondaryCta }}
          </RouterLink>
        </div>

        <p class="mt-5 text-[12.5px] text-faint anim-rise" style="animation-delay: 580ms">
          {{ hero.note }}
        </p>
      </div>

      <!-- console mock：入场后低频光泽扫过 + 悬浮呼吸 + hover 微放大 -->
      <div v-reveal class="relative mx-auto mt-14 max-w-[1000px] sm:mt-16">
        <div
          class="pointer-events-none absolute inset-x-6 -bottom-6 -z-10 h-24 rounded-[40px] bg-[radial-gradient(closest-side,rgba(15,15,15,0.12),transparent)] blur-xl"
        />
        <div class="anim-float">
          <div class="shine-loop rounded-[16px] transition-transform duration-500 ease-out hover:scale-[1.01]">
            <ConsoleMock />
          </div>
        </div>
      </div>

      <!-- trust logos -->
      <div v-reveal="80" class="mx-auto mt-12 max-w-[1000px]">
        <p class="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
          {{ hero.trustTitle }}
        </p>
        <div class="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
          <div
            v-for="logo in trustLogos"
            :key="logo"
            class="flex items-center justify-center gap-1.5 text-center text-[12.5px] font-medium text-faint transition-colors hover:text-muted"
          >
            <span class="h-3 w-3 rounded-[3px] border border-line-strong" />
            {{ logo }}
          </div>
        </div>
      </div>
    </div>

    <!-- metrics strip -->
    <div class="border-y border-line bg-paper-2">
      <div class="page-wrap grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        <div
          v-for="(m, i) in heroMetrics"
          :key="m.label"
          v-reveal="i * 90"
          class="bg-paper-2 px-1 py-7 md:px-7"
        >
          <p class="text-[clamp(26px,3.2vw,34px)] font-semibold leading-none tracking-[-0.04em] text-ink">
            <StatCounter
              :value="m.value"
              :decimals="m.decimals ?? 0"
              :suffix="m.suffix"
              :separator="m.value >= 1000"
            />
          </p>
          <p class="mt-2 text-[13px] font-medium text-ink-2">{{ m.label }}</p>
          <p class="mt-1 text-[11.5px] leading-relaxed text-faint">{{ m.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
