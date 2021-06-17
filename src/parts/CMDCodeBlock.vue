<template lang="pug">
code.cmd-code-block(class="whitespace-pre-wrap block bg-gray-100 px-4 py-2 rounded-lg relative")
  span.align-middle(key="0") $ {{parts[0]}}
  span.align-middle.changed-part(:class="{'changed-part--highlight': animate}" key="1") {{parts[1]}}
  span.align-middle(key="2") {{parts[2]}}
  button(class="px-2 py-1 rounded text-sm bg-gray-400 hover:bg-gray-500 text-white focus:outline-none focus:bg-gray-600 ml-2" type="button" @click="copy") {{text}}
</template>

<script lang="ts">
  import { defineComponent, nextTick } from 'vue'
  import * as hp from 'helper-js'
  import CodeBlock from '../components/CodeBlock.vue'

  export default defineComponent({
    extends: CodeBlock,
    // components: {},
    props: {
      parts: { type: Array }, // length-3 array, ['head', 'changed', 'tail']
    },
    data() {
      return {
        animate: false,
      }
    },
    computed: {},
    // watch: {},
    methods: {
      highlight() {
        this.animate = false
        nextTick(() => {
          this.animate = true
          if (this._tm_animte) {
            clearTimeout(this._tm_animte)
          }
          this._tm_animte = setTimeout(() => {
            this.animate = false
          }, 1000)
        })
      },
    },
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss">
  .cmd-code-block {
    .changed-part {
      background: transparent;
      transition: all 0.3s;
    }
    .changed-part--highlight {
      background: #000;
      color: #fff;
    }
  }
</style>
