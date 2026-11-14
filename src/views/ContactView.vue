<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/layout/PageHero.vue'
import Icon from '@/components/ui/Icon.vue'
import { copy } from '@/copy'
import { useInquiryStore } from '@/stores/inquiry'

const route = useRoute()
const inquiry = useInquiryStore()
const attempted = ref(false)
const { t } = useI18n()

const brand = copy.brand.brand
const contact = copy.contact
const { topics, scales, presets, prefill } = contact

const showError = (valid: boolean) => attempted.value && !valid

const progress = computed(() => Math.round((inquiry.completedFields / 4) * 100))

onMounted(() => {
  const intent = String(route.query.intent ?? '')
  if (intent === 'demo') {
    inquiry.prefillTopic(prefill.demoTopic)
    if (!inquiry.draft.message) {
      inquiry.draft.message = prefill.demoMessage
    }
  }
  if (intent === 'assessment' && !inquiry.draft.message) {
    inquiry.draft.message = prefill.assessmentMessage
  }
})

function applyPreset(text: string) {
  inquiry.draft.message = text
}

async function handleSubmit() {
  attempted.value = true
  await inquiry.submit()
}
</script>

<template>
  <div>
    <PageHero :eyebrow="contact.hero.eyebrow" :title="contact.hero.title" :desc="contact.hero.desc" />

    <section class="py-12 sm:py-16">
      <div class="page-wrap grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
        <!-- left: info -->
        <div class="space-y-8">
          <div>
            <p class="text-[10.5px] font-medium uppercase tracking-[0.14em] text-faint">{{ contact.info.title }}</p>
            <ul class="mt-4 space-y-4">
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[7px] border border-line bg-paper-2 text-ink">
                  <Icon name="phone" :size="14" />
                </span>
                <div>
                  <p class="text-[11px] text-faint">{{ contact.info.hotlineLabel }}</p>
                  <a :href="brand.phoneHref" class="text-[14.5px] font-medium text-ink hover:text-brand">
                    {{ brand.phone }}
                  </a>
                  <p class="mt-0.5 text-[11.5px] text-faint">{{ brand.hours }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[7px] border border-line bg-paper-2 text-ink">
                  <Icon name="mail" :size="14" />
                </span>
                <div>
                  <p class="text-[11px] text-faint">{{ contact.info.emailLabel }}</p>
                  <a :href="`mailto:${brand.email}`" class="text-[14.5px] font-medium text-ink hover:text-brand">
                    {{ brand.email }}
                  </a>
                  <p class="mt-0.5 text-[11.5px] text-faint">{{ contact.info.emailNote }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[7px] border border-line bg-paper-2 text-ink">
                  <Icon name="building" :size="14" />
                </span>
                <div>
                  <p class="text-[11px] text-faint">{{ contact.info.addressLabel }}</p>
                  <p class="mt-0.5 text-[13px] leading-relaxed text-ink-2">{{ brand.address }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- what happens next -->
          <div class="rounded-[12px] border border-line bg-paper-2/60 p-5">
            <p class="text-[12.5px] font-semibold text-ink">{{ contact.nextSteps.title }}</p>
            <ol class="mt-3.5 space-y-3">
              <li v-for="(s, i) in contact.nextSteps.items" :key="i" class="flex gap-2.5">
                <span class="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                <span class="text-[12px] leading-[1.7] text-muted">{{ s }}</span>
              </li>
            </ol>
          </div>

          <!-- privacy -->
          <div class="rounded-[12px] border border-line p-5">
            <div class="flex items-center gap-2">
              <Icon name="lock" :size="14" class="text-jade" />
              <p class="text-[12.5px] font-semibold text-ink">{{ contact.privacy.title }}</p>
            </div>
            <p class="mt-2 text-[11.5px] leading-[1.75] text-muted">
              {{ contact.privacy.desc }}
            </p>
          </div>
        </div>

        <!-- right: form -->
        <div>
          <!-- success -->
          <div v-if="inquiry.submitted" class="rounded-[16px] border border-line bg-paper p-7 sm:p-10">
            <div class="grid h-11 w-11 place-items-center rounded-full bg-jade-soft text-jade">
              <Icon name="check" :size="20" />
            </div>
            <h2 class="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink">
              {{ t('contact.success.title', { name: inquiry.draft.name }) }}
            </h2>
            <p class="mt-3 text-[13.5px] leading-[1.8] text-muted">
              <i18n-t keypath="contact.success.desc">
                <template #phone>
                  <span class="font-medium text-ink-2">{{ inquiry.maskedPhone }}</span>
                </template>
              </i18n-t>
            </p>

            <dl class="mt-6 divide-y divide-line rounded-[12px] border border-line">
              <div class="flex items-center justify-between px-4 py-3">
                <dt class="text-[12px] text-muted">{{ contact.success.summary.reference }}</dt>
                <dd class="font-mono text-[12px] font-medium text-ink">{{ inquiry.referenceId }}</dd>
              </div>
              <div class="flex items-center justify-between px-4 py-3">
                <dt class="text-[12px] text-muted">{{ contact.success.summary.company }}</dt>
                <dd class="text-[12px] font-medium text-ink">{{ inquiry.draft.company }}</dd>
              </div>
              <div class="flex items-center justify-between px-4 py-3">
                <dt class="text-[12px] text-muted">{{ contact.success.summary.topic }}</dt>
                <dd class="text-[12px] font-medium text-ink">{{ inquiry.draft.topic }}</dd>
              </div>
              <div class="flex items-center justify-between px-4 py-3">
                <dt class="text-[12px] text-muted">{{ contact.success.summary.scale }}</dt>
                <dd class="text-[12px] font-medium text-ink">{{ inquiry.draft.scale }}</dd>
              </div>
            </dl>

            <div class="mt-6 flex flex-wrap gap-3">
              <RouterLink to="/cases" class="btn-ghost">{{ contact.success.viewCases }}</RouterLink>
              <button class="btn-link cursor-pointer" @click="inquiry.reset()">{{ contact.success.resubmit }}</button>
            </div>
          </div>

          <!-- form -->
          <form v-else class="rounded-[16px] border border-line bg-paper p-6 sm:p-8" novalidate @submit.prevent="handleSubmit">
            <div class="flex items-center justify-between">
              <h2 class="text-[17px] font-semibold tracking-[-0.01em] text-ink">{{ contact.form.title }}</h2>
              <div class="flex items-center gap-2">
                <div class="h-1 w-16 overflow-hidden rounded-full bg-paper-3">
                  <div class="h-full rounded-full bg-ink transition-all duration-500" :style="{ width: `${progress}%` }" />
                </div>
                <span class="text-[10.5px] tabular-nums text-faint">{{ inquiry.completedFields }}/4</span>
              </div>
            </div>
            <p class="mt-1.5 text-[12px] text-muted">{{ contact.form.requiredNote }}</p>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="text-[12px] font-medium text-ink-2">{{ contact.form.fields.name.label }}</span>
                <input
                  v-model="inquiry.draft.name"
                  type="text"
                  :placeholder="contact.form.fields.name.placeholder"
                  class="mt-1.5 h-11 w-full rounded-[8px] border bg-paper px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                  :class="showError(inquiry.nameValid) ? 'border-rose' : 'border-line'"
                />
                <span v-if="showError(inquiry.nameValid)" class="mt-1 block text-[11px] text-rose">{{ contact.form.fields.name.error }}</span>
              </label>

              <label class="block">
                <span class="text-[12px] font-medium text-ink-2">{{ contact.form.fields.company.label }}</span>
                <input
                  v-model="inquiry.draft.company"
                  type="text"
                  :placeholder="contact.form.fields.company.placeholder"
                  class="mt-1.5 h-11 w-full rounded-[8px] border bg-paper px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                  :class="showError(inquiry.companyValid) ? 'border-rose' : 'border-line'"
                />
                <span v-if="showError(inquiry.companyValid)" class="mt-1 block text-[11px] text-rose">{{ contact.form.fields.company.error }}</span>
              </label>

              <label class="block">
                <span class="text-[12px] font-medium text-ink-2">{{ contact.form.fields.role.label }}</span>
                <input
                  v-model="inquiry.draft.role"
                  type="text"
                  :placeholder="contact.form.fields.role.placeholder"
                  class="mt-1.5 h-11 w-full rounded-[8px] border border-line bg-paper px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                />
              </label>

              <label class="block">
                <span class="text-[12px] font-medium text-ink-2">{{ contact.form.fields.phone.label }}</span>
                <input
                  v-model="inquiry.draft.phone"
                  type="tel"
                  inputmode="numeric"
                  maxlength="11"
                  :placeholder="contact.form.fields.phone.placeholder"
                  class="mt-1.5 h-11 w-full rounded-[8px] border bg-paper px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                  :class="showError(inquiry.phoneValid) ? 'border-rose' : 'border-line'"
                />
                <span v-if="showError(inquiry.phoneValid)" class="mt-1 block text-[11px] text-rose">{{ contact.form.fields.phone.error }}</span>
              </label>

              <label class="block sm:col-span-2">
                <span class="text-[12px] font-medium text-ink-2">{{ contact.form.fields.email.label }}</span>
                <input
                  v-model="inquiry.draft.email"
                  type="email"
                  :placeholder="contact.form.fields.email.placeholder"
                  class="mt-1.5 h-11 w-full rounded-[8px] border bg-paper px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
                  :class="showError(inquiry.emailValid) ? 'border-rose' : 'border-line'"
                />
                <span v-if="showError(inquiry.emailValid)" class="mt-1 block text-[11px] text-rose">{{ contact.form.fields.email.error }}</span>
              </label>
            </div>

            <!-- topic -->
            <fieldset class="mt-6">
              <legend class="text-[12px] font-medium text-ink-2">{{ contact.form.topicLabel }}</legend>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <button
                  v-for="t in topics"
                  :key="t"
                  type="button"
                  class="cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all"
                  :class="
                    inquiry.draft.topic === t
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-paper text-muted hover:border-line-strong hover:text-ink'
                  "
                  @click="inquiry.draft.topic = t"
                >
                  {{ t }}
                </button>
              </div>
            </fieldset>

            <!-- scale -->
            <label class="mt-6 block">
              <span class="text-[12px] font-medium text-ink-2">{{ contact.form.scaleLabel }}</span>
              <div class="relative mt-1.5">
                <select
                  v-model="inquiry.draft.scale"
                  class="h-11 w-full appearance-none rounded-[8px] border border-line bg-paper px-3 pr-9 text-[14px] text-ink outline-none transition-colors focus:border-ink"
                >
                  <option v-for="s in scales" :key="s" :value="s">{{ s }}</option>
                </select>
                <Icon
                  name="arrow"
                  :size="13"
                  class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-faint"
                />
              </div>
            </label>

            <!-- message -->
            <div class="mt-6">
              <div class="flex items-center justify-between">
                <span class="text-[12px] font-medium text-ink-2">{{ contact.form.messageLabel }}</span>
                <span class="text-[10.5px] text-faint">{{ contact.form.messageHint }}</span>
              </div>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <button
                  v-for="p in presets"
                  :key="p.label"
                  type="button"
                  class="cursor-pointer rounded-[6px] border border-dashed border-line-strong px-2.5 py-1 text-[11.5px] text-muted transition-colors hover:border-ink hover:text-ink"
                  @click="applyPreset(p.text)"
                >
                  {{ p.label }}
                </button>
              </div>
              <textarea
                v-model="inquiry.draft.message"
                rows="4"
                :placeholder="contact.form.messagePlaceholder"
                class="mt-2 w-full resize-y rounded-[8px] border border-line bg-paper p-3 text-[14px] leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
              />
            </div>

            <!-- consent -->
            <label class="mt-5 flex cursor-pointer items-start gap-2.5">
              <input v-model="inquiry.draft.consent" type="checkbox" class="mt-[3px] h-4 w-4 cursor-pointer accent-[#191919]" />
              <span class="text-[11.5px] leading-[1.7] text-muted">
                {{ contact.form.consent }}
              </span>
            </label>

            <div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-[11px] text-faint">{{ contact.form.footerNote }}</p>
              <button
                type="submit"
                class="btn-primary h-11 px-5 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="inquiry.submitting"
              >
                <template v-if="inquiry.submitting">{{ contact.form.submitting }}</template>
                <template v-else>
                  {{ contact.form.submit }}
                  <Icon name="arrow" :size="14" />
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
