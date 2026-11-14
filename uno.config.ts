import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      ink: '#191919',
      'ink-2': '#37352F',
      muted: '#6B6B68',
      faint: '#9B9A97',
      paper: '#FFFFFF',
      'paper-2': '#F7F7F5',
      'paper-3': '#F1F1EF',
      line: 'rgba(55, 53, 47, 0.10)',
      'line-strong': 'rgba(55, 53, 47, 0.18)',
      brand: '#2383E2',
      'brand-ink': '#1A6DBD',
      'brand-soft': '#EDF4FC',
      jade: '#0F7B6C',
      'jade-soft': '#E9F5F2',
      amber: '#C2820C',
      'amber-soft': '#FBF3E2',
      rose: '#C4553B',
      'rose-soft': '#FBEFEB',
    },
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Roboto, Helvetica, Arial, sans-serif',
      mono: '"SF Mono", "JetBrains Mono", "Roboto Mono", Menlo, Consolas, monospace',
    },
    boxShadow: {
      card: '0 1px 2px rgba(15, 15, 15, 0.04), 0 8px 24px -12px rgba(15, 15, 15, 0.10)',
      lift: '0 2px 4px rgba(15, 15, 15, 0.04), 0 18px 44px -18px rgba(15, 15, 15, 0.20)',
      stage: '0 32px 80px -36px rgba(15, 15, 15, 0.28), 0 2px 6px rgba(15, 15, 15, 0.05)',
      header: '0 1px 0 rgba(55, 53, 47, 0.08)',
    },
  },
  shortcuts: {
    // layout
    'page-wrap': 'mx-auto w-full max-w-[1120px] px-5 sm:px-8',
    'section-y': 'py-16 sm:py-24',
    'hairline': 'border-t border-line',
    // typography
    'eyebrow':
      'inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-[5px] text-[12px] font-medium tracking-[0.04em] text-muted uppercase',
    'display':
      'font-semibold tracking-[-0.035em] leading-[1.06] text-ink',
    'h2-section': 'text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.03em] leading-[1.14] text-ink',
    'lead': 'text-[16px] sm:text-[17px] leading-[1.75] text-muted',
    'body-sm': 'text-[14px] leading-[1.7] text-muted',
    // buttons
    'btn':
      'inline-flex select-none items-center justify-center gap-2 rounded-[8px] px-4 h-11 text-[14px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap',
    'btn-primary':
      'btn bg-ink text-white border border-ink hover:bg-[#000] hover:shadow-lift active:translate-y-px',
    'btn-ghost':
      'btn border border-line bg-paper text-ink-2 hover:bg-paper-2 hover:border-line-strong active:translate-y-px',
    'btn-link': 'inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-brand transition-colors cursor-pointer',
    // surfaces
    'card': 'rounded-[14px] border border-line bg-paper',
    'card-flat': 'rounded-[14px] border border-line bg-paper-2',
  },
})
