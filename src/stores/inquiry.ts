import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { copy } from '@/copy'

export interface InquiryDraft {
  name: string
  company: string
  role: string
  phone: string
  email: string
  topic: string
  scale: string
  message: string
  consent: boolean
}

const STORAGE_KEY = 'hy-inquiry-draft'

/** 表单默认值与 ContactView 的选项同源于 copy.contact，避免两处文案不同步 */
const emptyDraft = (): InquiryDraft => ({
  name: '',
  company: '',
  role: '',
  phone: '',
  email: '',
  topic: copy.contact.topics[1],
  scale: copy.contact.scales[1],
  message: '',
  consent: false,
})

function loadDraft(): InquiryDraft {
  if (typeof localStorage === 'undefined') return emptyDraft()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyDraft()
    return { ...emptyDraft(), ...(JSON.parse(raw) as Partial<InquiryDraft>), consent: false }
  } catch {
    return emptyDraft()
  }
}

export const useInquiryStore = defineStore('inquiry', () => {
  const draft = reactive<InquiryDraft>(loadDraft())
  const submitting = ref(false)
  const submitted = ref(false)
  const referenceId = ref('')

  const phoneValid = computed(() => /^1[3-9]\d{9}$/.test(draft.phone.trim()))
  const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email.trim()))
  const nameValid = computed(() => draft.name.trim().length >= 2)
  const companyValid = computed(() => draft.company.trim().length >= 2)

  /** 手机号脱敏展示，符合 PRD 中「敏感信息脱敏」的要求 */
  const maskedPhone = computed(() => {
    const p = draft.phone.trim()
    if (p.length < 7) return p
    return `${p.slice(0, 3)} **** ${p.slice(-4)}`
  })

  const canSubmit = computed(
    () =>
      nameValid.value &&
      companyValid.value &&
      phoneValid.value &&
      emailValid.value &&
      draft.consent &&
      !submitting.value,
  )

  const completedFields = computed(() => {
    const fields = [nameValid.value, companyValid.value, phoneValid.value, emailValid.value]
    return fields.filter(Boolean).length
  })

  function persist() {
    if (typeof localStorage === 'undefined') return
    try {
      const { consent: _consent, ...rest } = draft
      void _consent
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest))
    } catch {
      /* 隐私模式下忽略 */
    }
  }

  async function submit() {
    if (!canSubmit.value) return false
    submitting.value = true
    persist()

    // 真实项目在此处替换为 POST /api/leads
    await new Promise((resolve) => setTimeout(resolve, 900))

    referenceId.value = `HY-${new Date().getFullYear()}${String(
      Math.floor(Math.random() * 900000) + 100000,
    )}`
    submitting.value = false
    submitted.value = true
    return true
  }

  function reset() {
    Object.assign(draft, emptyDraft())
    submitted.value = false
    referenceId.value = ''
    if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY)
  }

  function prefillTopic(topic: string) {
    draft.topic = topic
    submitted.value = false
  }

  return {
    draft,
    submitting,
    submitted,
    referenceId,
    phoneValid,
    emailValid,
    nameValid,
    companyValid,
    maskedPhone,
    canSubmit,
    completedFields,
    submit,
    reset,
    prefillTopic,
  }
})
