<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { copy } from '@/copy'

const { heading, steps } = copy.home.process
</script>

<template>
  <section class="section-y border-t border-line bg-paper-2/50">
    <div class="page-wrap">
      <SectionHeading
        :eyebrow="heading.eyebrow"
        :title="heading.title"
        :desc="heading.desc"
        align="center"
        max-width="720px"
      />

      <div class="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <div
          v-reveal="200"
          class="reveal-line absolute left-0 right-0 top-[15px] hidden h-px bg-line lg:block"
          aria-hidden="true"
        />

        <div v-for="(step, i) in steps" :key="step.title" v-reveal="i * 70" class="relative">
          <div class="relative flex items-center gap-3">
            <span
              class="z-10 grid h-[30px] w-[30px] place-items-center rounded-full border border-line bg-paper text-[11px] font-semibold text-ink"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="rounded-full border border-line bg-paper px-2 py-[2px] text-[10.5px] font-medium tracking-[0.04em] text-muted">
              {{ step.window }}
            </span>
          </div>

          <h3 class="mt-5 text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{{ step.title }}</h3>
          <p class="mt-2 text-[13px] leading-[1.75] text-muted">{{ step.desc }}</p>

          <ul class="mt-4 space-y-1.5">
            <li v-for="d in step.delivers" :key="d" class="flex items-start gap-1.5 text-[12px] text-ink-2">
              <span class="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-faint" />
              {{ d }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
