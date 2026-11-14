<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Icon from '@/components/ui/Icon.vue'
import { copy } from '@/copy'

const { pillars } = copy.services
const { heading, badgeFor, detailLink, comboTitle, comboDesc, comboCta } = copy.home.serviceSplit
</script>

<template>
  <section class="section-y">
    <div class="page-wrap">
      <SectionHeading
        :eyebrow="heading.eyebrow"
        :title="heading.title"
        :desc="heading.desc"
        align="center"
        max-width="720px"
      />

      <div class="mt-12 grid gap-5 lg:grid-cols-2">
        <article
          v-for="(p, idx) in pillars"
          :key="p.key"
          v-reveal="idx * 80"
          class="group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-paper transition-all duration-300 hover:border-line-strong hover:shadow-lift"
        >
          <!-- top accent -->
          <div class="h-1 w-full" :class="p.key === 'software' ? 'bg-ink' : 'bg-brand'" />

          <div class="flex flex-1 flex-col p-6 sm:p-8">
            <div class="flex items-center justify-between">
              <p class="text-[10.5px] font-medium uppercase tracking-[0.16em] text-faint">{{ p.eyebrow }}</p>
              <span
                class="rounded-full px-2 py-[3px] text-[10.5px] font-medium"
                :class="p.key === 'software' ? 'bg-paper-3 text-ink-2' : 'bg-brand-soft text-brand'"
              >
                {{ badgeFor[p.key] }}
              </span>
            </div>

            <h3 class="mt-5 text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[30px]">
              {{ p.title }}
            </h3>
            <p class="mt-2 text-[15px] font-medium text-ink-2">{{ p.tagline }}</p>
            <p class="mt-4 text-[14px] leading-[1.75] text-muted">{{ p.summary }}</p>

            <ul class="mt-6 space-y-px overflow-hidden rounded-[10px] border border-line">
              <li
                v-for="cap in p.capabilities"
                :key="cap.id"
                class="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3 last:border-b-0 transition-colors hover:bg-paper-2/70"
              >
                <span class="text-[13.5px] font-medium text-ink-2">{{ cap.title }}</span>
                <span class="text-[11.5px] text-faint">{{ cap.outcomeShort }}</span>
              </li>
            </ul>

            <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span v-for="s in p.sla" :key="s.label" class="flex items-baseline gap-1.5">
                <span class="text-[11px] text-faint">{{ s.label }}</span>
                <span class="text-[13px] font-semibold text-ink">{{ s.value }}</span>
              </span>
            </div>

            <div class="mt-auto pt-7">
              <RouterLink
                :to="`/services#${p.key}`"
                class="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink"
              >
                {{ detailLink }}
                <Icon name="arrow" :size="13" class="transition-transform duration-300 group-hover:translate-x-1" />
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

      <div
        v-reveal
        class="mt-5 flex flex-col items-start justify-between gap-4 rounded-[14px] border border-line bg-paper-2 px-6 py-5 sm:flex-row sm:items-center"
      >
        <p class="text-[13.5px] leading-relaxed text-muted">
          <span class="font-medium text-ink">{{ comboTitle }}</span>
          {{ comboDesc }}
        </p>
        <RouterLink to="/contact" class="btn-ghost h-9 shrink-0 px-3.5 text-[13px]">
          {{ comboCta }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
