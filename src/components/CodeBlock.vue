<template lang="pug">
code.code-block(class="whitespace-pre-wrap block bg-gray-100 px-4 py-2 rounded-lg relative")
  span $ {{code}}
  button(class="px-2 py-1 rounded text-sm bg-gray-400 hover:bg-gray-500 text-white focus:outline-none focus:bg-gray-600 ml-2" type="button" @click="copy") {{text}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import * as hp from 'helper-js'

  export default defineComponent({
    // components: {},
    props: {
      code: { type: String, default: '' },
      copyText: { type: String, default: 'Copy' },
      copiedText: { type: String, default: 'Copied' },
    },
    data() {
      return {
        copied: false,
      }
    },
    computed: {
      text() {
        return this.copied ? this.copiedText : this.copyText
      },
    },
    // watch: {},
    methods: {
      copy() {
        hp.copyTextToClipboard(this.code)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 800)
      },
    },
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss"></style>
