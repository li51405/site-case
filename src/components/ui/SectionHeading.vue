<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    desc?: string
    align?: 'left' | 'center'
    maxWidth?: string
  }>(),
  { align: 'left', maxWidth: '720px' },
)
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto text-center' : ''" :style="{ maxWidth }">
    <p v-if="eyebrow" class="eyebrow">
      <span class="h-1 w-1 rounded-full bg-brand" />
      {{ eyebrow }}
    </p>
    <h2 class="h2-section" :class="eyebrow ? 'mt-4' : ''">{{ title }}</h2>
    <p v-if="desc" class="lead mt-4" :class="align === 'center' ? 'mx-auto' : ''">{{ desc }}</p>
    <slot />
  </div>
</template>
