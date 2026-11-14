<script setup lang="ts">
import PageHero from '@/components/layout/PageHero.vue'
import Icon from '@/components/ui/Icon.vue'
import CtaSection from '@/components/home/CtaSection.vue'
import NetworkGraph from '@/components/graphics/NetworkGraph.vue'
import { copy } from '@/copy'

const { certifications, principles, protocolLayers, securityFramework, page } = copy.technology
</script>

<template>
  <div>
    <PageHero :eyebrow="page.hero.eyebrow" :title="page.hero.title" :desc="page.hero.desc">
      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-muted">
        <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-ink" />{{ page.heroPoints[0] }}</span>
        <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-brand" />{{ page.heroPoints[1] }}</span>
        <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-jade" />{{ page.heroPoints[2] }}</span>
      </div>
    </PageHero>

    <!-- protocol stack -->
    <section class="py-14 sm:py-20">
      <div class="page-wrap">
        <div class="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <div class="lg:sticky lg:top-[96px] lg:self-start">
            <p class="eyebrow"><span class="h-1 w-1 rounded-full bg-brand" />{{ page.stack.eyebrow }}</p>
            <h2 class="mt-4 text-[clamp(24px,2.8vw,32px)] font-semibold leading-[1.18] tracking-[-0.03em] text-ink">
              {{ page.stack.title }}
            </h2>
            <p class="mt-4 text-[13.5px] leading-[1.78] text-muted">
              {{ page.stack.desc }}
            </p>
            <div class="mt-6 rounded-[10px] border border-line bg-paper-2/60 p-3">
              <div class="h-[130px] opacity-80">
                <NetworkGraph />
              </div>
              <p class="mt-1 text-center text-[10.5px] text-faint">{{ page.stack.graphNote }}</p>
            </div>
          </div>

          <div class="overflow-hidden rounded-[14px] border border-line">
            <div
              v-for="(l, i) in protocolLayers"
              :key="l.layer"
              class="group grid gap-3 border-b border-line px-5 py-5 transition-colors last:border-b-0 hover:bg-paper-2/50 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-5"
            >
              <div class="flex items-center gap-2 sm:block">
                <span class="font-mono text-[11px] tracking-[0.08em] text-faint">{{ l.layer }}</span>
                <span class="text-[10px] text-faint sm:mt-1 sm:block">{{ page.stack.layerLabel }} {{ 5 - i }}</span>
              </div>
              <div>
                <h3 class="text-[15px] font-semibold text-ink">{{ l.title }}</h3>
                <p class="mt-1 text-[12.5px] leading-relaxed text-muted">{{ l.desc }}</p>
              </div>
              <div class="flex flex-wrap gap-1 sm:max-w-[240px] sm:justify-end">
                <span
                  v-for="p in l.protocols"
                  :key="p"
                  class="rounded-[4px] border border-line bg-paper px-1.5 py-[2px] font-mono text-[10.5px] text-muted transition-colors group-hover:border-line-strong"
                >
                  {{ p }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- security framework -->
    <section id="framework" class="scroll-mt-[88px] border-t border-line bg-paper-2/50 py-14 sm:py-20">
      <div class="page-wrap">
        <div class="max-w-[680px]">
          <p class="eyebrow"><span class="h-1 w-1 rounded-full bg-brand" />{{ page.framework.eyebrow }}</p>
          <h2 class="h2-section mt-4">{{ page.framework.title }}</h2>
          <p class="lead mt-4">
            {{ page.framework.desc }}
          </p>
        </div>

        <!-- pipeline strip -->
        <div class="mt-10 overflow-x-auto pb-2">
          <div class="flex min-w-[680px] items-center gap-1.5">
            <template v-for="(s, i) in securityFramework" :key="s.index">
              <div class="flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
                <span class="font-mono text-[10px] text-faint">{{ s.index }}</span>
                <span class="text-[12px] font-medium text-ink-2">{{ s.title }}</span>
              </div>
              <Icon
                v-if="i < securityFramework.length - 1"
                name="arrow"
                :size="12"
                class="shrink-0 text-faint"
              />
            </template>
          </div>
        </div>

        <div class="mt-8 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(s, i) in securityFramework"
            :key="s.index"
            v-reveal="i * 50"
            class="bg-paper p-6"
          >
            <div class="flex items-baseline justify-between">
              <span class="font-mono text-[11px] tracking-[0.08em] text-faint">{{ s.index }}</span>
              <span class="text-[9.5px] uppercase tracking-[0.14em] text-faint">{{ s.caption }}</span>
            </div>
            <h3 class="mt-4 text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{{ s.title }}</h3>
            <p class="mt-2 text-[12.5px] leading-[1.75] text-muted">{{ s.desc }}</p>
            <ul class="mt-4 space-y-1.5 border-t border-line pt-3">
              <li v-for="c in s.checkpoints" :key="c" class="flex items-start gap-1.5 text-[11.5px] text-ink-2">
                <Icon name="check" :size="10" class="mt-[3px] text-jade" />
                {{ c }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- principles -->
    <section class="py-14 sm:py-20">
      <div class="page-wrap">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="max-w-[560px]">
            <p class="eyebrow"><span class="h-1 w-1 rounded-full bg-brand" />{{ page.principles.eyebrow }}</p>
            <h2 class="h2-section mt-4">{{ page.principles.title }}</h2>
          </div>
          <p class="max-w-[320px] text-[12.5px] leading-relaxed text-muted">
            {{ page.principles.desc }}
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="(p, i) in principles" :key="p.title" v-reveal="i * 60" class="rounded-[12px] border border-line p-6">
            <div class="flex items-center gap-2.5">
              <span class="grid h-8 w-8 place-items-center rounded-[7px] bg-paper-2 text-ink">
                <Icon :name="(['lock', 'network', 'doc', 'refresh'] as const)[i]" :size="15" />
              </span>
              <h3 class="text-[15px] font-semibold text-ink">{{ p.title }}</h3>
            </div>
            <p class="mt-3 text-[13px] leading-[1.75] text-muted">{{ p.desc }}</p>
          </div>
        </div>

        <!-- certs -->
        <div class="mt-12 border-t border-line pt-8">
          <p class="text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{{ page.certsTitle }}</p>
          <div class="mt-4 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="c in certifications" :key="c.name" class="bg-paper px-4 py-4">
              <p class="text-[13.5px] font-semibold text-ink">{{ c.name }}</p>
              <p class="mt-1 text-[11px] text-faint">{{ c.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
