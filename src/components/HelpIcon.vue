<template lang="pug">
Tooltip.inline-block
  Icon(name="help_outline" :size="size" class="cursor-default text-gray-500 hover:text-gray-700")
  template(v-slot:text)
    slot
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Icon from './Icon.vue'

  export default defineComponent({
    components: { Icon },
    props: {
      size: { type: Number, default: 20 },
    },
    // data() {
    //   return {}
    // },
    // computed: {},
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss"></style>
