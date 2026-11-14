<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import NetworkGraph from '@/components/graphics/NetworkGraph.vue'
import { copy } from '@/copy'

const brand = copy.brand.brand
const { badge, title, desc, primary, points } = copy.home.cta
</script>

<template>
  <section class="pb-16 pt-4 sm:pb-24">
    <div class="page-wrap">
      <div v-reveal class="relative overflow-hidden rounded-[20px] bg-ink px-6 py-12 sm:px-12 sm:py-16">
        <!-- decoration -->
        <div class="pointer-events-none absolute inset-0 opacity-[0.16]">
          <div class="absolute -right-10 -top-8 h-[320px] w-[420px] anim-float">
            <NetworkGraph variant="dark" />
          </div>
          <div
            class="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]"
            style="background-position: 80% 20%; background-size: 60% 80%; background-repeat: no-repeat"
          />
        </div>
        <!-- 品牌蓝辉光：缓慢呼吸 -->
        <div class="pointer-events-none absolute -left-24 bottom-[-140px] h-[380px] w-[560px]">
          <div
            class="h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(35,131,226,0.22),transparent)] blur-3xl anim-glow"
          />
        </div>

        <div class="relative max-w-[640px]">
          <p class="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-[5px] text-[11.5px] font-medium tracking-[0.06em] text-white/60">
            <span class="h-1 w-1 rounded-full bg-white/60" />
            {{ badge }}
          </p>

          <h2 class="mt-5 text-[clamp(26px,3.6vw,40px)] font-semibold leading-[1.14] tracking-[-0.03em] text-white">
            {{ title }}
          </h2>

          <p class="mt-4 text-[15px] leading-[1.75] text-white/60">
            {{ desc }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/contact?intent=assessment"
              class="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-6 text-[14.5px] font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              {{ primary }}
              <Icon name="arrow" :size="15" />
            </RouterLink>
            <a
              :href="brand.phoneHref"
              class="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-white/20 px-5 text-[14.5px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Icon name="phone" :size="15" />
              {{ brand.phone }}
            </a>
          </div>

          <ul class="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            <li v-for="p in points" :key="p" class="flex items-center gap-1.5 text-[12.5px] text-white/45">
              <Icon name="check" :size="12" class="text-white/50" />
              {{ p }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
