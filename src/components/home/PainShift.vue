<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Icon from '@/components/ui/Icon.vue'
import { copy } from '@/copy'

const { heading, beforeLabel, afterLabel, rows, footnote } = copy.home.painShift
</script>

<template>
  <section class="section-y">
    <div class="page-wrap">
      <SectionHeading
        :eyebrow="heading.eyebrow"
        :title="heading.title"
        :desc="heading.desc"
        align="center"
        max-width="760px"
      />

      <div v-reveal class="mx-auto mt-12 max-w-[940px] overflow-hidden rounded-[14px] border border-line">
        <!-- header -->
        <div class="hidden grid-cols-2 border-b border-line bg-paper-2 md:grid">
          <div class="px-6 py-3.5">
            <p class="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{{ beforeLabel }}</p>
          </div>
          <div class="border-l border-line px-6 py-3.5">
            <p class="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">{{ afterLabel }}</p>
          </div>
        </div>

        <div
          v-for="(row, i) in rows"
          :key="row.before"
          class="group grid md:grid-cols-2"
          :class="i > 0 ? 'border-t border-line' : ''"
        >
          <div class="flex items-start gap-2.5 px-5 py-4 transition-colors group-hover:bg-paper-2/70 sm:px-6">
            <span class="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-line text-faint">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.8 1.8l4.4 4.4M6.2 1.8L1.8 6.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
              </svg>
            </span>
            <p class="text-[14.5px] leading-relaxed text-muted">{{ row.before }}</p>
          </div>
          <div
            class="flex items-start gap-2.5 border-t border-line px-5 py-4 transition-colors group-hover:bg-brand-soft/40 sm:px-6 md:border-l md:border-t-0"
          >
            <span class="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-ink text-white">
              <Icon name="check" :size="10" />
            </span>
            <p class="text-[14.5px] font-medium leading-relaxed text-ink">{{ row.after }}</p>
          </div>
        </div>
      </div>

      <p class="mt-5 text-center text-[12.5px] text-faint">
        {{ footnote }}
      </p>
    </div>
  </section>
</template>
