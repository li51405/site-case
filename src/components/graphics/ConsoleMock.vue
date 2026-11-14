<script setup lang="ts">
import NetworkGraph from './NetworkGraph.vue'
import { copy } from '@/copy'

const {
  ariaLabel,
  url,
  logoChar,
  workspace,
  nav,
  dutyTitle,
  dutyStatus,
  dutySla,
  overviewTitle,
  updatedAt,
  timeRanges,
  stats,
  chartTitle,
  chartLegendAllow,
  chartLegendBlock,
  topologyTitle,
  events,
} = copy.home.consoleMock

const W = 300
const H = 84

const series = [34, 38, 37, 42, 41, 47, 46, 52, 51, 56, 55, 60, 59, 65, 64, 69, 68, 73, 72, 78, 77, 83, 82, 88]

function buildLine(values: number[]) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const stepX = W / (values.length - 1)
  const pts = values.map((v, i) => ({
    x: +(i * stepX).toFixed(2),
    y: +(H - ((v - min) / (max - min || 1)) * (H - 8) - 4).toFixed(2),
  }))
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i += 1) {
    const cur = pts[i]
    const next = pts[i + 1]
    const mx = +((cur.x + next.x) / 2).toFixed(2)
    d += ` C ${mx},${cur.y} ${mx},${next.y} ${next.x},${next.y}`
  }
  return { d, area: `${d} L ${W},${H} L 0,${H} Z`, last: pts[pts.length - 1] }
}

const chart = buildLine(series)
</script>

<template>
  <div
    class="overflow-hidden rounded-[16px] border border-line bg-paper shadow-stage"
    role="img"
    :aria-label="ariaLabel"
  >
    <!-- Title bar -->
    <div class="flex h-10 items-center gap-3 border-b border-line bg-paper-2 px-3.5">
      <div class="flex items-center gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-[#E5E3DD]" />
        <span class="h-2.5 w-2.5 rounded-full bg-[#E5E3DD]" />
        <span class="h-2.5 w-2.5 rounded-full bg-[#E5E3DD]" />
      </div>
      <div
        class="mx-auto flex h-6 max-w-[300px] flex-1 items-center justify-center gap-1.5 rounded-[5px] border border-line bg-paper px-2"
      >
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" class="text-faint">
          <rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" stroke-width="1.1" />
          <path d="M4.2 5V3.7a1.8 1.8 0 013.6 0V5" stroke="currentColor" stroke-width="1.1" />
        </svg>
        <span class="truncate text-[10px] text-faint">{{ url }}</span>
      </div>
      <div class="hidden items-center gap-1.5 sm:flex">
        <span class="h-2 w-2 rounded-sm bg-[#E5E3DD]" />
        <span class="h-2 w-2 rounded-sm bg-[#E5E3DD]" />
      </div>
    </div>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="hidden w-[168px] shrink-0 border-r border-line bg-paper-2 p-2.5 md:block">
        <div class="flex items-center gap-2 rounded-[6px] px-1.5 py-1.5">
          <span class="grid h-6 w-6 place-items-center rounded-[5px] bg-ink text-[10px] font-semibold text-white">
            {{ logoChar }}
          </span>
          <span class="flex-1 truncate text-[11.5px] font-medium text-ink-2">{{ workspace }}</span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" class="text-faint">
            <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </div>

        <div class="mt-3 space-y-0.5">
          <div
            v-for="item in nav"
            :key="item.label"
            class="flex items-center gap-2 rounded-[5px] px-2 py-[7px] text-[11.5px]"
            :class="
              item.active
                ? 'border border-line bg-paper font-medium text-ink shadow-sm'
                : 'text-muted'
            "
          >
            <span
              class="h-1.5 w-1.5 rounded-full"
              :class="item.active ? 'bg-ink' : 'bg-[#D9D7D2]'"
            />
            {{ item.label }}
          </div>
        </div>

        <div class="mt-4 rounded-[8px] border border-line bg-paper p-2.5">
          <p class="text-[10px] font-medium text-ink-2">{{ dutyTitle }}</p>
          <div class="mt-1.5 flex items-center gap-1.5">
            <span class="h-1.5 w-1.5 rounded-full bg-jade anim-pulse-dot" />
            <span class="text-[10px] text-muted">{{ dutyStatus }}</span>
          </div>
          <div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-paper-3">
            <div class="h-full w-[86%] rounded-full bg-jade/70" />
          </div>
          <p class="mt-1.5 text-[9.5px] text-faint">{{ dutySla }}</p>
        </div>
      </aside>

      <!-- Main -->
      <div class="min-w-0 flex-1 p-3.5 sm:p-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-[13px] font-semibold tracking-[-0.01em] text-ink">{{ overviewTitle }}</p>
            <p class="mt-0.5 text-[10px] text-faint">{{ updatedAt }}</p>
          </div>
          <div class="flex items-center gap-1 rounded-[6px] border border-line bg-paper-2 p-0.5">
            <span
              v-for="(range, i) in timeRanges"
              :key="range"
              class="px-2 py-[3px] text-[10px]"
              :class="i === 0 ? 'rounded-[4px] bg-paper font-medium text-ink shadow-sm' : 'text-faint'"
            >
              {{ range }}
            </span>
          </div>
        </div>

        <!-- stat tiles -->
        <div class="mt-3 grid grid-cols-3 gap-2">
          <div v-for="s in stats" :key="s.label" class="rounded-[9px] border border-line p-2.5">
            <p class="text-[9.5px] text-faint">{{ s.label }}</p>
            <p class="mt-1 flex items-baseline gap-0.5 text-[17px] font-semibold tracking-[-0.03em] text-ink">
              {{ s.value }}<span v-if="s.unit" class="text-[9px] font-normal text-faint">{{ s.unit }}</span>
            </p>
            <p class="mt-0.5 text-[9px]" :class="s.tone">{{ s.delta }}</p>
          </div>
        </div>

        <!-- chart -->
        <div class="mt-2 grid gap-2 lg:grid-cols-[1.55fr_1fr]">
          <div class="rounded-[9px] border border-line p-2.5">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-medium text-ink-2">{{ chartTitle }}</p>
              <div class="flex items-center gap-2">
                <span class="flex items-center gap-1 text-[9px] text-faint">
                  <i class="h-[2px] w-3 rounded-full bg-ink/70" />{{ chartLegendAllow }}
                </span>
                <span class="flex items-center gap-1 text-[9px] text-faint">
                  <i class="h-[2px] w-3 rounded-full bg-brand/60" />{{ chartLegendBlock }}
                </span>
              </div>
            </div>

            <svg :viewBox="`0 0 ${W} ${H}`" class="mt-2 h-[76px] w-full sm:h-[84px]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#191919" stop-opacity="0.10" />
                  <stop offset="100%" stop-color="#191919" stop-opacity="0" />
                </linearGradient>
              </defs>
              <g stroke="rgba(55,53,47,0.07)" stroke-width="0.6">
                <line v-for="i in 4" :key="`g-${i}`" x1="0" :y1="(H / 4) * i" :x2="W" :y2="(H / 4) * i" />
              </g>
              <path :d="chart.area" fill="url(#areaFill)" />
              <path :d="chart.d" stroke="#191919" stroke-width="1.4" stroke-linecap="round" />
              <path
                d="M0 62 C 40 58, 60 66, 96 60 S 150 48, 180 54 S 240 44, 300 50"
                stroke="#2383E2"
                stroke-opacity="0.55"
                stroke-width="1.1"
                fill="none"
              />
              <circle :cx="chart.last.x - 1" :cy="chart.last.y" r="2.4" fill="#191919" />
            </svg>
          </div>

          <div class="relative overflow-hidden rounded-[9px] border border-line bg-paper-2/60">
            <p class="absolute left-2.5 top-2.5 text-[10px] font-medium text-ink-2">{{ topologyTitle }}</p>
            <div class="h-[230px] p-1.5 opacity-90 lg:h-auto lg:min-h-[92px]">
              <NetworkGraph />
            </div>
          </div>
        </div>

        <!-- events -->
        <div class="mt-2 rounded-[9px] border border-line">
          <div v-for="(e, i) in events" :key="e.text" class="flex items-center gap-2 px-2.5 py-[7px]" :class="i > 0 ? 'border-t border-line' : ''">
            <span class="text-[9px] tabular-nums text-faint">{{ e.time }}</span>
            <span class="min-w-0 flex-1 truncate text-[10px] text-ink-2">{{ e.text }}</span>
            <span
              class="shrink-0 rounded-full px-1.5 py-[1px] text-[9px]"
              :class="{
                'bg-rose-soft text-rose': e.tone === 'rose',
                'bg-brand-soft text-brand': e.tone === 'blue',
                'bg-jade-soft text-jade': e.tone === 'jade',
              }"
            >
              {{ e.tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
