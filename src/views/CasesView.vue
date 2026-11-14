<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/layout/PageHero.vue'
import Icon from '@/components/ui/Icon.vue'
import StatCounter from '@/components/ui/StatCounter.vue'
import CtaSection from '@/components/home/CtaSection.vue'
import { copy } from '@/copy'

const { cases, industries, page } = copy.cases

const active = ref<string>(industries[0])

const filters = computed(() =>
  industries.map((name) => ({
    name,
    count: name === industries[0] ? cases.length : cases.filter((c) => c.industry === name).length,
  })),
)

const filtered = computed(() =>
  active.value === industries[0] ? cases : cases.filter((c) => c.industry === active.value),
)

const totalDays = 1286
</script>

<template>
  <div>
    <PageHero :eyebrow="page.hero.eyebrow" :title="page.hero.title" :desc="page.hero.desc">
      <div class="mt-9 grid max-w-[620px] grid-cols-3 gap-px overflow-hidden rounded-[12px] border border-line bg-line">
        <div class="bg-paper px-4 py-3.5">
          <p class="text-[20px] font-semibold tracking-[-0.03em] text-ink">
            <StatCounter :value="cases.length" />
          </p>
          <p class="mt-0.5 text-[11px] text-faint">{{ page.stats.casesLabel }}</p>
        </div>
        <div class="bg-paper px-4 py-3.5">
          <p class="text-[20px] font-semibold tracking-[-0.03em] text-ink">
            <StatCounter :value="industries.length - 1" />
          </p>
          <p class="mt-0.5 text-[11px] text-faint">{{ page.stats.industriesLabel }}</p>
        </div>
        <div class="bg-paper px-4 py-3.5">
          <p class="text-[20px] font-semibold tracking-[-0.03em] text-ink">
            <StatCounter :value="totalDays" :separator="true" />
          </p>
          <p class="mt-0.5 text-[11px] text-faint">{{ page.stats.daysLabel }}</p>
        </div>
      </div>
    </PageHero>

    <section class="py-12 sm:py-16">
      <div class="page-wrap">
        <!-- filters -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            v-for="f in filters"
            :key="f.name"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-200"
            :class="
              active === f.name
                ? 'border-ink bg-ink text-white'
                : 'border-line bg-paper text-muted hover:border-line-strong hover:text-ink'
            "
            @click="active = f.name"
          >
            {{ f.name }}
            <span class="text-[10.5px]" :class="active === f.name ? 'text-white/50' : 'text-faint'">
              {{ f.count }}
            </span>
          </button>
        </div>

        <!-- grid -->
        <transition-group name="case" tag="div" class="mt-8 grid gap-5 lg:grid-cols-2">
          <RouterLink
            v-for="c in filtered"
            :key="c.slug"
            :to="`/cases/${c.slug}`"
            class="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-paper transition-all duration-300 hover:border-line-strong hover:shadow-lift"
          >
            <div class="flex flex-1 flex-col p-6">
              <div class="flex items-center justify-between gap-3">
                <span class="rounded-full border border-line bg-paper-2 px-2 py-[3px] text-[10.5px] text-muted">
                  {{ c.industry }}
                </span>
                <span class="text-[10.5px] tabular-nums text-faint">{{ c.year }}</span>
              </div>

              <h2 class="mt-4 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {{ c.title }}
              </h2>
              <p class="mt-1.5 text-[12px] text-muted">{{ c.client }}</p>
              <p class="mt-3.5 flex-1 text-[13.5px] leading-[1.75] text-muted">{{ c.excerpt }}</p>

              <div class="mt-5 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in c.tags"
                  :key="tag"
                  class="rounded-[5px] bg-brand-soft px-2 py-[2px] text-[10.5px] font-medium text-brand"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-4 divide-x divide-line border-t border-line bg-paper-2/60">
              <div v-for="m in c.results.slice(0, 4)" :key="m.label" class="px-3 py-3 text-center">
                <p class="text-[14px] font-semibold leading-none tracking-[-0.02em] text-ink">{{ m.value }}</p>
                <p class="mt-1.5 text-[10px] leading-tight text-faint">{{ m.label }}</p>
              </div>
            </div>

            <div
              class="flex items-center justify-between border-t border-line px-6 py-3 text-[12px] text-muted transition-colors group-hover:text-ink"
            >
              <span>{{ c.duration }}</span>
              <span class="inline-flex items-center gap-1 font-medium">
                {{ page.viewLoop }}
                <Icon name="arrow" :size="12" class="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </RouterLink>
        </transition-group>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped>
.case-enter-active,
.case-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.case-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.case-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
.case-move {
  transition: transform 0.35s ease;
}
</style>
