<template>
  <time v-if="dateObj" :datetime="dateObj.toISOString()">
    {{
      dateObj.toLocaleDateString('en-us', {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) }}
  </time>
</template>

<script setup lang="ts">
const props = defineProps({
  date: {
    type: [String, Date],
  }
})
const dateObj = computed(() => typeof props.date === "string" ? new Date(props.date) : props.date)
</script>