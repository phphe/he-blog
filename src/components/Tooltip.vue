<template lang="pug">
Popup.tool-tip(hover :mode="mode" :space="space")
  slot
  template(v-slot:card)
    .tool-tip-inner(:style="innerStyle")
      slot(name="nostyle")
        .tool-tip-default
          slot(name="text") {{text}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Popup from './Popup.vue'
  import * as hp from 'helper-js'

  export default defineComponent({
    components: { Popup },
    props: {
      text: { type: String },
      space: { type: Number, default: 5 },
      mode: {
        type: String,
        default: 'display', // new/display
      },
    },
    data() {
      return {
        visible: false,
        innerStyle: {},
      }
    },
    // computed: {},
    watch: {},
    // created() {},
    // mounted() {},
    methods: {},
  })
</script>

<style lang="scss">
  $radius: 4px;
  .tool-tip {
  }
  .tool-tip-inner {
  }
  .tool-tip-default {
    background: #000;
    color: #fff;
    padding: 5px 10px;
    font-size: small;
    border-radius: $radius;
    white-space: pre-wrap;
    max-width: 500px;
  }
</style>
