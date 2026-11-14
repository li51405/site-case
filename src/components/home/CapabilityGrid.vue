<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import Icon from '@/components/ui/Icon.vue'
import { copy } from '@/copy'

const { heading, moreLink, moreText, items } = copy.home.capabilityGrid
</script>

<template>
  <section class="section-y border-t border-line bg-paper-2/50">
    <div class="page-wrap">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          :eyebrow="heading.eyebrow"
          :title="heading.title"
          :desc="heading.desc"
          max-width="620px"
        />
        <RouterLink to="/services" class="btn-link shrink-0 pb-1">
          {{ moreLink }}
          <Icon name="arrow" :size="14" />
        </RouterLink>
      </div>

      <div class="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal="i * 60"
          :to="item.to"
          class="hover-line group relative flex flex-col bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-paper-2/60 sm:p-7"
        >
          <div class="flex items-start justify-between">
            <span
              class="grid h-10 w-10 place-items-center rounded-[9px] border border-line bg-paper-2 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
            >
              <Icon :name="item.icon" :size="19" />
            </span>
            <span class="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">{{ item.tag }}</span>
          </div>

          <h3 class="mt-6 text-[17px] font-semibold tracking-[-0.01em] text-ink">{{ item.title }}</h3>
          <p class="mt-2.5 flex-1 text-[14px] leading-[1.72] text-muted">{{ item.desc }}</p>

          <span class="mt-5 inline-flex items-center gap-1 text-[12.5px] font-medium text-faint transition-colors group-hover:text-ink">
            {{ moreText }}
            <Icon name="arrow" :size="12" class="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
