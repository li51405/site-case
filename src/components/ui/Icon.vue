<script setup lang="ts">
/** 线性图标集：统一 24×24 视觉栅格、1.6 描边，贴合 Notion 的克制线条语言 */
withDefaults(defineProps<{ name: keyof typeof paths; size?: number | string }>(), { size: 20 })

const paths = {
  shield: 'M12 3.2 5 6v5.4c0 4.3 2.9 7.6 7 9.4 4.1-1.8 7-5.1 7-9.4V6l-7-2.8Z M9.2 12.1l2 2 3.6-3.9',
  chip: 'M8 8h8v8H8z M4 9h2 M4 15h2 M18 9h2 M18 15h2 M9 4v2 M15 4v2 M9 18v2 M15 18v2',
  network: 'M12 5.5a2 2 0 100-4 2 2 0 000 4Z M5 20a2 2 0 100-4 2 2 0 000 4Z M19 20a2 2 0 100-4 2 2 0 000 4Z M12 5.5v5 M12 10.5 5.8 16 M12 10.5 18.2 16',
  cloud: 'M7.5 18h9a3.5 3.5 0 00.4-6.98A5.2 5.2 0 007.2 10.4 3.8 3.8 0 007.5 18Z',
  gauge: 'M12 20a8 8 0 118-8 M12 12l4.2-4.2',
  lock: 'M6.5 10.5h11v9h-11z M9 10.5V8a3 3 0 016 0v2.5 M12 14.2v1.8',
  layers: 'M12 3.5 3.8 8l8.2 4.5L20.2 8 12 3.5Z M3.8 12.6 12 17l8.2-4.4 M3.8 16.6 12 21l8.2-4.4',
  refresh: 'M20 12a8 8 0 01-13.6 5.7 M4 12a8 8 0 0113.6-5.7 M17.6 3.5v3.2h-3.2 M6.4 20.5v-3.2h3.2',
  chart: 'M4 20V9 M10 20V4 M16 20v-7 M22 20H2',
  check: 'M4.5 12.5l5 5 10-11',
  arrow: 'M4 12h15 M13 6l6 6-6 6',
  phone: 'M6.5 3.5h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7 2 2 0 016.5 3.5Z',
  mail: 'M3.5 6.5h17v11h-17z M3.8 7l8.2 6 8.2-6',
  calendar: 'M3.5 6.5h17v14h-17z M3.5 10.5h17 M8 3.5v4 M16 3.5v4',
  spark: 'M12 3.5v4 M12 16.5v4 M3.5 12h4 M16.5 12h4 M6.4 6.4l2.4 2.4 M15.2 15.2l2.4 2.4 M17.6 6.4l-2.4 2.4 M8.8 15.2l-2.4 2.4',
  building: 'M4.5 20.5V5.5h10v15 M14.5 10.5h5v10 M7.5 8.5h4 M7.5 12.5h4 M7.5 16.5h4',
  doc: 'M6.5 3.5h7l4.5 4.5v12.5h-11.5z M13.5 3.5V8h4.5 M9.5 12.5h5 M9.5 16h5',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18Z M12 7.5V12l3 1.8',
  target: 'M12 21a9 9 0 100-18 9 9 0 000 18Z M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9Z M12 13a1 1 0 100-2 1 1 0 000 2Z',
  plus: 'M12 5v14 M5 12h14',
  external: 'M9 5h10v10 M19 5 8 16',
  alert: 'M12 4 3 20h18L12 4Z M12 10v4 M12 17h.01',
} as const
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.55"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <path :d="paths[name]" />
  </svg>
</template>
