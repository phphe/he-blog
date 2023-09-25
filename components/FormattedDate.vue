<template>
  <time v-if="dateObj" :datetime="dateObj.toISOString()">
    {{
      dateObj.toLocaleDateString(i18n.locale.value, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) }}
  </time>
</template>

<script setup lang="ts">
const i18n = useI18n()
const props = defineProps({
  date: {
    type: [String, Date],
  }
})
const dateObj = computed(() => typeof props.date === "string" ? new Date(props.date) : props.date)
</script>