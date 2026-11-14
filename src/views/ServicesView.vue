<script setup lang="ts">
import PageHero from '@/components/layout/PageHero.vue'
import Icon from '@/components/ui/Icon.vue'
import CtaSection from '@/components/home/CtaSection.vue'
import { copy } from '@/copy'

const { pillars, differentiators, page } = copy.services

const anchors = pillars.map((p) => ({ id: p.key, label: p.title }))
</script>

<template>
  <div>
    <PageHero :eyebrow="page.hero.eyebrow" :title="page.hero.title" :desc="page.hero.desc">
      <div class="mt-7 flex flex-wrap items-center gap-2">
        <a
          v-for="a in anchors"
          :key="a.id"
          :href="`#${a.id}`"
          class="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:border-line-strong hover:bg-paper-2"
        >
          {{ a.label }}
          <Icon name="arrow" :size="11" class="rotate-90 text-faint" />
        </a>
      </div>
    </PageHero>

    <!-- Pillars -->
    <section
      v-for="(p, idx) in pillars"
      :id="p.key"
      :key="p.key"
      class="scroll-mt-[88px]"
      :class="idx === 0 ? 'pt-16 sm:pt-20' : 'border-t border-line pt-16 sm:pt-20'"
    >
      <div class="page-wrap pb-16 sm:pb-24">
        <div class="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
          <!-- sticky aside -->
          <div class="lg:sticky lg:top-[96px] lg:self-start">
            <p class="text-[10.5px] font-medium uppercase tracking-[0.16em] text-faint">{{ p.eyebrow }}</p>
            <h2 class="mt-3 text-[clamp(24px,2.8vw,32px)] font-semibold leading-[1.18] tracking-[-0.03em] text-ink">
              {{ p.title }}
            </h2>
            <p class="mt-2.5 text-[14px] font-medium text-ink-2">{{ p.tagline }}</p>
            <p class="mt-4 text-[13.5px] leading-[1.78] text-muted">{{ p.summary }}</p>

            <div class="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-line bg-line">
              <div v-for="s in p.sla" :key="s.label" class="bg-paper px-2.5 py-2.5">
                <p class="text-[13px] font-semibold text-ink">{{ s.value }}</p>
                <p class="mt-0.5 text-[10px] text-faint">{{ s.label }}</p>
              </div>
            </div>

            <p class="mt-4 text-[12px] leading-relaxed text-faint">{{ p.audience }}</p>
          </div>

          <!-- capability cards -->
          <div class="space-y-4">
            <article
              v-for="(cap, i) in p.capabilities"
              :id="cap.id"
              :key="cap.id"
              v-reveal="i * 60"
              class="hover-line group scroll-mt-[96px] overflow-hidden rounded-[14px] border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
            >
              <div class="p-5 sm:p-6">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-baseline gap-3">
                    <span class="text-[10.5px] font-medium tabular-nums tracking-[0.08em] text-faint">
                      {{ String(i + 1).padStart(2, '0') }}
                    </span>
                    <h3 class="text-[17px] font-semibold tracking-[-0.01em] text-ink">{{ cap.title }}</h3>
                  </div>
                  <span class="hidden shrink-0 rounded-full border border-line px-2 py-[2px] text-[10.5px] text-faint sm:block">
                    {{ page.capabilityBadge[p.key] }}
                  </span>
                </div>

                <p class="mt-3 text-[14px] leading-[1.75] text-muted">{{ cap.summary }}</p>

                <ul class="mt-4 grid gap-2 sm:grid-cols-3">
                  <li
                    v-for="b in cap.bullets"
                    :key="b"
                    class="flex items-start gap-1.5 rounded-[8px] bg-paper-2/70 px-2.5 py-2 text-[12px] leading-[1.6] text-ink-2"
                  >
                    <Icon name="check" :size="11" class="mt-[3px] text-jade" />
                    {{ b }}
                  </li>
                </ul>
              </div>

              <div class="flex items-center gap-2 border-t border-line bg-paper-2/60 px-5 py-3 sm:px-6">
                <Icon name="target" :size="13" class="text-faint" />
                <p class="text-[12.5px] text-muted">
                  <span class="font-medium text-ink-2">{{ page.outcomePrefix }}</span>{{ cap.outcome }}
                </p>
              </div>
            </article>

            <div class="flex flex-wrap gap-1.5 pt-2">
              <span class="mr-1 text-[11px] uppercase tracking-[0.1em] text-faint">{{ page.stackLabel }}</span>
              <span
                v-for="t in p.stack"
                :key="t"
                class="rounded-[5px] border border-line bg-paper px-2 py-[3px] font-mono text-[11px] text-muted"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Differentiators -->
    <section class="border-t border-line bg-paper-2/50 py-16 sm:py-24">
      <div class="page-wrap">
        <div class="max-w-[640px]">
          <p class="eyebrow"><span class="h-1 w-1 rounded-full bg-brand" />{{ page.principles.eyebrow }}</p>
          <h2 class="h2-section mt-4">{{ page.principles.title }}</h2>
        </div>

        <div class="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-3">
          <div v-for="(d, i) in differentiators" :key="d.marker" v-reveal="i * 70" class="bg-paper p-7">
            <span class="font-mono text-[11px] tracking-[0.1em] text-faint">{{ d.marker }}</span>
            <h3 class="mt-4 text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{{ d.title }}</h3>
            <p class="mt-2.5 text-[13px] leading-[1.75] text-muted">{{ d.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
