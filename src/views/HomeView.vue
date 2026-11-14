<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import PainShift from '@/components/home/PainShift.vue'
import CapabilityGrid from '@/components/home/CapabilityGrid.vue'
import ServiceSplit from '@/components/home/ServiceSplit.vue'
import CaseShowcase from '@/components/home/CaseShowcase.vue'
import ProcessSection from '@/components/home/ProcessSection.vue'
import CtaSection from '@/components/home/CtaSection.vue'
</script>

<template>
  <div>
    <HeroSection />
    <div id="why">
      <PainShift />
    </div>
    <div id="capabilities">
      <CapabilityGrid />
    </div>
    <div id="practices">
      <ServiceSplit />
    </div>
    <div id="cases">
      <CaseShowcase />
    </div>
    <div id="process">
      <ProcessSection />
    </div>
    <CtaSection />
  </div>
</template>
