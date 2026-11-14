<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/ui/Icon.vue'
import CtaSection from '@/components/home/CtaSection.vue'
import { copy } from '@/copy'

const { cases, getCaseBySlug, detail } = copy.cases
const [secChallenge, secSolution, secOutcome, secVoice] = detail.sections
const { t } = useI18n()

const route = useRoute()
const study = computed(() => getCaseBySlug(String(route.params.slug)))

const next = computed(() => {
  const current = study.value
  if (!current) return cases[0]
  const idx = cases.findIndex((c) => c.slug === current.slug)
  return cases[(idx + 1) % cases.length]
})

watch(
  () => study.value,
  (s) => {
    if (s) document.title = s.title + detail.titleSuffix
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <template v-if="study">
    <!-- header -->
    <section class="border-b border-line">
      <div class="page-wrap pb-12 pt-8 sm:pt-10">
        <!-- breadcrumb -->
        <nav class="flex items-center gap-1.5 text-[12px] text-faint" :aria-label="detail.breadcrumbAria">
          <RouterLink to="/" class="transition-colors hover:text-ink">{{ detail.breadcrumbHome }}</RouterLink>
          <span>/</span>
          <RouterLink to="/cases" class="transition-colors hover:text-ink">{{ detail.breadcrumbCases }}</RouterLink>
          <span>/</span>
          <span class="text-muted">{{ study.industry }}</span>
        </nav>

        <div class="mt-7 grid gap-10 lg:grid-cols-[1fr_264px] lg:gap-14">
          <div>
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="rounded-full border border-line bg-paper-2 px-2.5 py-[3px] text-[10.5px] text-muted">
                {{ study.industry }}
              </span>
              <span
                v-for="tag in study.tags"
                :key="tag"
                class="rounded-full bg-brand-soft px-2.5 py-[3px] text-[10.5px] font-medium text-brand"
              >
                {{ tag }}
              </span>
            </div>

            <h1 class="display mt-5 text-[clamp(28px,4.2vw,46px)]">{{ study.title }}</h1>
            <p class="mt-3 text-[14px] text-muted">{{ study.client }}</p>
            <p class="lead mt-5 max-w-[680px]">{{ study.excerpt }}</p>
          </div>

          <!-- fact card -->
          <aside class="h-fit rounded-[12px] border border-line bg-paper-2/60 p-5">
            <p class="text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{{ detail.factTitle }}</p>
            <dl class="mt-3.5 space-y-3">
              <div class="flex items-baseline justify-between gap-3">
                <dt class="text-[12px] text-muted">{{ detail.factClient }}</dt>
                <dd class="text-right text-[12px] font-medium text-ink-2">{{ study.clientShort }}</dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="text-[12px] text-muted">{{ detail.factPeriod }}</dt>
                <dd class="text-[12px] font-medium text-ink-2">{{ study.year }}</dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="text-[12px] text-muted">{{ detail.factDuration }}</dt>
                <dd class="text-right text-[12px] font-medium text-ink-2">{{ study.duration }}</dd>
              </div>
            </dl>

            <div class="mt-5 border-t border-line pt-4">
              <p class="text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{{ detail.stackTitle }}</p>
              <div class="mt-2 flex flex-wrap gap-1">
                <span
                  v-for="t in study.stack"
                  :key="t"
                  class="rounded-[4px] border border-line bg-paper px-1.5 py-[2px] font-mono text-[10px] text-muted"
                >
                  {{ t }}
                </span>
              </div>
            </div>

            <RouterLink to="/contact" class="btn-primary mt-5 h-9 w-full text-[12.5px]">
              {{ detail.consultCta }}
            </RouterLink>
          </aside>
        </div>
      </div>
    </section>

    <!-- results band -->
    <section class="border-b border-line bg-paper-2">
      <div class="page-wrap grid grid-cols-2 gap-px bg-line py-2 sm:grid-cols-4">
        <div
          v-for="(m, i) in study.results"
          :key="m.label"
          v-reveal="i * 90"
          class="bg-paper-2 px-1 py-5 sm:px-6"
        >
          <p class="text-[clamp(22px,2.8vw,30px)] font-semibold leading-none tracking-[-0.035em] text-ink">
            {{ m.value }}
          </p>
          <p class="mt-2 text-[11.5px] text-muted">{{ m.label }}</p>
        </div>
      </div>
    </section>

    <!-- body -->
    <section class="py-14 sm:py-20">
      <div class="page-wrap">
        <div class="grid gap-12 lg:grid-cols-[180px_1fr] lg:gap-16">
          <!-- section index -->
          <nav class="hidden lg:block">
            <div class="sticky top-[96px] space-y-1.5 border-l border-line pl-4">
              <p class="text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{{ detail.tocTitle }}</p>
              <a
                v-for="sec in detail.sections"
                :key="sec.id"
                :href="`#${sec.id}`"
                class="block text-[12.5px] text-muted transition-colors hover:text-ink"
              >
                {{ sec.no }} {{ sec.title }}
              </a>
            </div>
          </nav>

          <div class="max-w-[720px]">
            <!-- challenge -->
            <section id="challenge" class="scroll-mt-[96px]">
              <div class="flex items-center gap-3">
                <span class="font-mono text-[11px] text-faint">{{ secChallenge.no }}</span>
                <h2 class="text-[22px] font-semibold tracking-[-0.02em] text-ink">{{ secChallenge.title }}</h2>
              </div>
              <p class="mt-2 text-[13px] text-muted">{{ secChallenge.desc }}</p>

              <ol class="mt-6 space-y-4">
                <li
                  v-for="(c, i) in study.challenge"
                  :key="i"
                  class="flex gap-4 rounded-[12px] border border-line bg-paper-2/50 p-4 sm:p-5"
                >
                  <span class="mt-[2px] grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line bg-paper text-[10.5px] font-semibold text-ink">
                    {{ i + 1 }}
                  </span>
                  <p class="text-[13.5px] leading-[1.8] text-ink-2">{{ c }}</p>
                </li>
              </ol>
            </section>

            <!-- solution -->
            <section id="solution" class="mt-14 scroll-mt-[96px]">
              <div class="flex items-center gap-3">
                <span class="font-mono text-[11px] text-faint">{{ secSolution.no }}</span>
                <h2 class="text-[22px] font-semibold tracking-[-0.02em] text-ink">{{ secSolution.title }}</h2>
              </div>
              <p class="mt-2 text-[13px] text-muted">{{ secSolution.desc }}</p>

              <div class="relative mt-7">
                <div class="absolute bottom-4 left-[13px] top-2 w-px bg-line" aria-hidden="true" />
                <div v-for="(s, i) in study.solution" :key="s.phase" class="relative pb-7 pl-10 last:pb-0">
                  <span
                    class="absolute left-0 top-0 grid h-[27px] w-[27px] place-items-center rounded-full border border-line bg-paper text-[10px] font-semibold text-ink"
                  >
                    {{ i + 1 }}
                  </span>
                  <p class="font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">{{ s.phase }}</p>
                  <h3 class="mt-1.5 text-[15.5px] font-semibold text-ink">{{ s.title }}</h3>
                  <p class="mt-2 text-[13.5px] leading-[1.8] text-muted">{{ s.detail }}</p>
                </div>
              </div>
            </section>

            <!-- outcome -->
            <section id="outcome" class="mt-14 scroll-mt-[96px]">
              <div class="flex items-center gap-3">
                <span class="font-mono text-[11px] text-faint">{{ secOutcome.no }}</span>
                <h2 class="text-[22px] font-semibold tracking-[-0.02em] text-ink">{{ secOutcome.title }}</h2>
              </div>
              <p class="mt-2 text-[13px] text-muted">{{ secOutcome.desc }}</p>

              <div class="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-line bg-line">
                <div
                  v-for="(m, i) in study.results"
                  :key="m.label"
                  v-reveal="i * 90"
                  class="bg-paper px-5 py-6"
                >
                  <p class="text-[26px] font-semibold leading-none tracking-[-0.035em] text-ink">{{ m.value }}</p>
                  <p class="mt-2 text-[11.5px] text-muted">{{ m.label }}</p>
                </div>
              </div>
            </section>

            <!-- voice -->
            <section id="voice" class="mt-14 scroll-mt-[96px]">
              <div class="flex items-center gap-3">
                <span class="font-mono text-[11px] text-faint">{{ secVoice.no }}</span>
                <h2 class="text-[22px] font-semibold tracking-[-0.02em] text-ink">{{ secVoice.title }}</h2>
              </div>

              <figure class="mt-6 rounded-[14px] border border-line bg-paper-2/60 p-6 sm:p-8">
                <Icon name="spark" :size="20" class="text-faint" />
                <blockquote class="mt-4 text-[16px] leading-[1.8] text-ink-2">
                  “{{ study.quote.text }}”
                </blockquote>
                <figcaption class="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span class="grid h-8 w-8 place-items-center rounded-full bg-ink text-[11px] font-medium text-white">
                    {{ study.quote.author.slice(0, 1) }}
                  </span>
                  <span class="text-[12.5px] text-muted">
                    <span class="font-medium text-ink-2">{{ study.quote.author }}</span>
                    · {{ study.quote.role }}
                  </span>
                </figcaption>
              </figure>
            </section>
          </div>
        </div>
      </div>
    </section>

    <!-- next case -->
    <section class="border-t border-line py-10">
      <div class="page-wrap">
        <RouterLink
          :to="`/cases/${next.slug}`"
          class="group flex flex-col items-start justify-between gap-4 rounded-[14px] border border-line bg-paper p-6 transition-all hover:border-line-strong hover:shadow-lift sm:flex-row sm:items-center"
        >
          <div>
            <p class="text-[10.5px] uppercase tracking-[0.14em] text-faint">{{ t('cases.detail.nextPrefix', { industry: next.industry }) }}</p>
            <p class="mt-2 text-[19px] font-semibold tracking-[-0.02em] text-ink">{{ next.title }}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
            {{ detail.nextView }}
            <Icon name="arrow" :size="14" class="transition-transform group-hover:translate-x-1" />
          </span>
        </RouterLink>
      </div>
    </section>

    <CtaSection />
    </template>

    <div v-else class="page-wrap py-24 text-center">
    <p class="text-[12px] uppercase tracking-[0.14em] text-faint">{{ detail.notFound.code }}</p>
    <h1 class="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-ink">{{ detail.notFound.title }}</h1>
    <p class="mt-3 text-[14px] text-muted">{{ detail.notFound.desc }}</p>
    <RouterLink to="/cases" class="btn-primary mt-7">{{ detail.notFound.back }}</RouterLink>
  </div>
  </div>
</template>
