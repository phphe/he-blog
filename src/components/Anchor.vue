<template lang="pug">
a.anchor.cursor-pointer(v-bind="props.bind" v-is="props.is" :class="underline ? 'hover:underline focus:underline' : 'no-underline'")
  slot
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import * as hp from 'helper-js'

  export default defineComponent({
    inheritAttrs: false,
    props: {
      underline: { type: Boolean },
    },
    // data() {
    //   return {
    //   }
    // },
    computed: {
      isExternal(): boolean {
        // @ts-ignore
        const { to } = this.$attrs
        return Boolean(hp.isString(to) && to.match(/^(http(s)?:)?\/\//))
      },
      // @ts-ignore
      props() {
        // @ts-ignore
        const r = {
          // @ts-ignore
          bind: { ...this.$attrs },
          is: 'a',
        }
        if (this.isExternal) {
          r.bind.href = this.$attrs.to
        } else if (this.$attrs.to) {
          let to = this.$attrs.to as any
          if (
            this.$i18n?.locale &&
            this.$i18n.locale !== this.$i18n.fallbackLocale
          ) {
            to = {
              ...to,
              name: to.name + '.i18n',
              params: { ...to.params, locale: this.$i18n.locale },
            }
            r.bind.to = to
          }
          if (this.$attrs.target === '_blank') {
            // @ts-ignore
            r.bind.href = this.$router.resolve(this.$attrs.to).href
          } else {
            r.is = 'router-link'
          }
        }
        if (r.is === 'a') {
          delete r.bind.to
        }
        return r
      },
    },
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {},
  })
</script>

<style lang="scss"></style>
