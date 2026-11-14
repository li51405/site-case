<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    desc?: string
    compact?: boolean
  }>(),
  { compact: false },
)
</script>

<template>
  <section class="relative overflow-hidden border-b border-line">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute inset-x-0 top-0 h-[340px] bg-grid mask-fade-b opacity-60 anim-grid-drift" />
    </div>

    <div class="page-wrap" :class="compact ? 'pb-10 pt-10' : 'pb-14 pt-14 sm:pb-16 sm:pt-20'">
      <div class="max-w-[760px]">
        <p v-if="eyebrow" class="eyebrow anim-rise">
          <span class="h-1 w-1 rounded-full bg-brand" />
          {{ eyebrow }}
        </p>
        <h1
          class="display mt-5 text-[clamp(30px,4.6vw,50px)] anim-rise"
          :class="compact ? 'text-[clamp(26px,3.6vw,38px)]' : ''"
          style="animation-delay: 120ms"
        >
          {{ title }}
        </h1>
        <p v-if="desc" class="lead mt-5 max-w-[640px] anim-rise" style="animation-delay: 240ms">
          {{ desc }}
        </p>
        <div v-if="$slots.default" class="anim-rise" style="animation-delay: 360ms">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
