<script setup lang="ts">
/** 装饰性节点网络图：用于 Hero 背景与技术底座页，表达「节点 · 链路 · 数据流动」 */

withDefaults(defineProps<{ variant?: 'dark' | 'light' }>(), { variant: 'light' })

const nodes = [
  { x: 52, y: 74, r: 3.4 },
  { x: 132, y: 38, r: 2.2 },
  { x: 168, y: 118, r: 5.2, hub: true },
  { x: 96, y: 168, r: 2.6 },
  { x: 214, y: 62, r: 2.8 },
  { x: 258, y: 140, r: 3.6 },
  { x: 300, y: 84, r: 2.2 },
  { x: 336, y: 168, r: 3 },
  { x: 232, y: 206, r: 2.4 },
  { x: 150, y: 232, r: 3.2 },
  { x: 66, y: 246, r: 2.2 },
  { x: 302, y: 232, r: 2.6 },
  { x: 356, y: 108, r: 2 },
  { x: 200, y: 260, r: 2 },
]

const edges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 4],
  [2, 5],
  [2, 3],
  [3, 9],
  [4, 5],
  [4, 6],
  [5, 6],
  [5, 7],
  [6, 12],
  [7, 12],
  [7, 11],
  [8, 5],
  [8, 9],
  [8, 11],
  [9, 10],
  [9, 13],
  [10, 3],
  [11, 13],
  [13, 8],
]
</script>

<template>
  <svg viewBox="0 0 400 300" fill="none" class="h-full w-full" aria-hidden="true">
    <g :stroke="variant === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(55,53,47,0.13)'" stroke-width="0.9">
      <line
        v-for="([a, b], i) in edges"
        :key="`e-${i}`"
        :x1="nodes[a].x"
        :y1="nodes[a].y"
        :x2="nodes[b].x"
        :y2="nodes[b].y"
      />
    </g>

    <g class="anim-dash" :stroke="variant === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(35,131,226,0.55)'" stroke-width="1.1">
      <path d="M52 74 L168 118 L258 140 L336 168" />
      <path d="M96 168 L168 118 L214 62 L300 84" />
      <path d="M150 232 L232 206 L258 140" />
    </g>

    <g>
      <circle
        v-for="(n, i) in nodes"
        :key="`n-${i}`"
        :cx="n.x"
        :cy="n.y"
        :r="n.r"
        :fill="variant === 'dark' ? '#fff' : n.hub ? '#2383E2' : '#191919'"
        :opacity="variant === 'dark' ? (n.hub ? 1 : 0.55) : n.hub ? 1 : 0.28"
      />
      <circle
        :cx="168"
        :cy="118"
        r="10"
        :stroke="variant === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(35,131,226,0.35)'"
        stroke-width="1"
        class="anim-pulse-dot"
      />
      <circle
        :cx="168"
        :cy="118"
        r="17"
        :stroke="variant === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(35,131,226,0.16)'"
        stroke-width="1"
        stroke-dasharray="2 6"
      />
    </g>
  </svg>
</template>
