<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Icon from '@/components/ui/Icon.vue'
import { useI18n } from 'vue-i18n'
import { copy } from '@/copy'

const { cases, featuredCases } = copy.cases
const { heading, readFull, loopTitle } = copy.home.caseShowcase
const { t } = useI18n()

const main = featuredCases[0]
const secondary = cases.filter((c) => c.slug !== main.slug).slice(0, 2)
</script>

<template>
  <section class="section-y border-t border-line">
    <div class="page-wrap">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          :eyebrow="heading.eyebrow"
          :title="heading.title"
          :desc="heading.desc"
          max-width="640px"
        />
        <RouterLink to="/cases" class="btn-link shrink-0 pb-1">
          {{ t('home.caseShowcase.allLink', { count: cases.length }) }}
          <Icon name="arrow" :size="14" />
        </RouterLink>
      </div>

      <!-- featured -->
      <article
        v-if="main"
        v-reveal
        class="mt-12 overflow-hidden rounded-[16px] border border-line bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
      >
        <div class="grid lg:grid-cols-[1.05fr_1fr]">
          <!-- left: summary -->
          <div class="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="rounded-full border border-line bg-paper-2 px-2 py-[3px] text-[10.5px] text-muted">
                {{ main.industry }}
              </span>
              <span
                v-for="tag in main.tags"
                :key="tag"
                class="rounded-full bg-brand-soft px-2 py-[3px] text-[10.5px] font-medium text-brand"
              >
                {{ tag }}
              </span>
            </div>

            <p class="mt-5 text-[12px] tracking-[0.06em] text-faint">{{ main.client }}</p>
            <h3 class="mt-2 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink">
              {{ main.title }}
            </h3>
            <p class="mt-4 text-[14px] leading-[1.78] text-muted">{{ main.excerpt }}</p>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <div v-for="m in main.results.slice(0, 4)" :key="m.label" class="rounded-[10px] border border-line bg-paper-2/60 px-3.5 py-3">
                <p class="text-[20px] font-semibold leading-none tracking-[-0.03em] text-ink">{{ m.value }}</p>
                <p class="mt-1.5 text-[11px] text-muted">{{ m.label }}</p>
              </div>
            </div>

            <RouterLink :to="`/cases/${main.slug}`" class="btn-primary mt-6 h-10 px-4 text-[13px]">
              {{ readFull }}
              <Icon name="arrow" :size="13" />
            </RouterLink>
          </div>

          <!-- right: closed loop -->
          <div class="bg-paper-2/50 p-6 sm:p-8">
            <p class="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{{ loopTitle }}</p>
            <ol class="mt-5 space-y-5">
              <li v-for="(step, i) in main.solution.slice(0, 3)" :key="step.phase" class="relative pl-7">
                <span
                  class="absolute left-0 top-[3px] grid h-5 w-5 place-items-center rounded-full border border-line bg-paper text-[9.5px] font-semibold text-ink"
                >
                  {{ i + 1 }}
                </span>
                <span v-if="i < 2" class="absolute left-[9.5px] top-7 h-[calc(100%-4px)] w-px bg-line" />
                <p class="text-[10px] font-medium uppercase tracking-[0.1em] text-faint">{{ step.phase }}</p>
                <p class="mt-1 text-[14px] font-medium text-ink">{{ step.title }}</p>
                <p class="mt-1.5 text-[12.5px] leading-[1.7] text-muted">{{ step.detail }}</p>
              </li>
            </ol>

            <figure class="mt-6 rounded-[10px] border border-line bg-paper p-4">
              <blockquote class="text-[13px] leading-[1.75] text-ink-2">
                “{{ main.quote.text }}”
              </blockquote>
              <figcaption class="mt-3 text-[11.5px] text-faint">
                {{ main.quote.author }} · {{ main.quote.role }}
              </figcaption>
            </figure>
          </div>
        </div>
      </article>

      <!-- secondary -->
      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <RouterLink
          v-for="(c, i) in secondary"
          :key="c.slug"
          v-reveal="i * 80"
          :to="`/cases/${c.slug}`"
          class="group flex flex-col rounded-[14px] border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
        >
          <div class="flex items-center justify-between">
            <span class="text-[10.5px] uppercase tracking-[0.12em] text-faint">{{ c.industry }}</span>
            <span class="text-[10.5px] text-faint">{{ c.year }}</span>
          </div>
          <h3 class="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{{ c.title }}</h3>
          <p class="mt-2 text-[12px] text-muted">{{ c.client }}</p>
          <p class="mt-3 flex-1 text-[13px] leading-[1.72] text-muted">{{ c.excerpt }}</p>
          <div class="mt-5 flex items-center justify-between border-t border-line pt-4">
            <div class="flex gap-5">
              <div v-for="m in c.results.slice(0, 2)" :key="m.label">
                <p class="text-[15px] font-semibold tracking-[-0.02em] text-ink">{{ m.value }}</p>
                <p class="text-[10.5px] text-faint">{{ m.label }}</p>
              </div>
            </div>
            <Icon
              name="arrow"
              :size="14"
              class="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
            />
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
