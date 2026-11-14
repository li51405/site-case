<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    decimals?: number
    suffix?: string
    prefix?: string
    duration?: number
    /** 千分位分隔，例如 1286 → 1,286 */
    separator?: boolean
  }>(),
  { decimals: 0, duration: 1500, separator: false, suffix: '', prefix: '' },
)

const el = ref<HTMLElement | null>(null)
const current = ref(0)
let observer: IntersectionObserver | null = null
let frame = 0

const display = computed(() => {
  const fixed = current.value.toFixed(props.decimals)
  if (!props.separator) return fixed
  const [intPart, decPart] = fixed.split('.')
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${withSep}.${decPart}` : withSep
})

function animate() {
  const start = performance.now()
  const from = 0
  const to = props.value
  const ease = (t: number) => 1 - Math.pow(1 - t, 3)

  const tick = (now: number) => {
    const progress = Math.min((now - start) / props.duration, 1)
    current.value = from + (to - from) * ease(progress)
    if (progress < 1) frame = requestAnimationFrame(tick)
    else current.value = to
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !('IntersectionObserver' in window)) {
    current.value = props.value
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        animate()
        observer?.disconnect()
      })
    },
    { threshold: 0.4 },
  )
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="tabular-nums">
    <span v-if="prefix">{{ prefix }}</span>{{ display }}<span v-if="suffix">{{ suffix }}</span>
  </span>
</template>
