<template lang="pug">
.btn(v-bind="props.bind" v-is="props.is" :class="[paddingClass || 'px-4 py-2', 'rounded',{ 'cursor-not-allowed opacity-60': disabled },colorClass, {relative: loading}]" :disabled="disabled")
  slot
  LoadingMask(v-if="loading")
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  // import { RouteLocationRaw } from 'vue-router'
  import LoadingMask from './loading/LoadingMask.vue'
  import Anchor from './Anchor.vue'

  const colorClassMap = {
    default:
      'btn-default bg-white hover:bg-gray-100 text-gray-800 border border-gray-300',
    primary:
      'btn-primary bg-primary-500 hover:bg-primary-700 text-white border border-primary-400',
    warning:
      'btn-warning bg-warning-500 hover:bg-warning-700 text-white border border-warning-400',
    danger:
      'btn-danger bg-danger-500 hover:bg-danger-700 text-white border border-danger-400',
    success:
      'btn-success bg-success-500 hover:bg-success-700 text-white border border-success-400',
  }
  const outlineColorClassMap = {
    default:
      'bg-transparent hover:bg-gray-400 text-gray-800 hover:text-white border border-gray-400 hover:border-transparent',
    primary:
      'bg-transparent hover:bg-primary-500 text-primary-700 hover:text-white border border-primary-500 hover:border-transparent',
    warning:
      'bg-transparent hover:bg-warning-500 text-warning-700 hover:text-white border border-warning-500 hover:border-transparent',
    danger:
      'bg-transparent hover:bg-danger-500 text-danger-700 hover:text-white border border-danger-500 hover:border-transparent',
    success:
      'bg-transparent hover:bg-success-500 text-success-700 hover:text-white border border-success-500 hover:border-transparent',
  }
  type Color = 'default' | 'primary' | 'warning' | 'danger' | 'success'

  export default defineComponent({
    components: { Anchor, LoadingMask },
    inheritAttrs: false,
    props: {
      color: { type: String as PropType<Color>, default: 'default' },
      outline: { type: Boolean },
      size: { type: String, default: 'md' }, // sm, md, lg
      to: {}, // route
      disabled: { type: Boolean },
      loading: { type: Boolean },
      square: { type: Boolean }, // no padding, width = height
      paddingClass: { type: String },
    },
    // data() {
    //   return {}
    // },
    computed: {
      colorClass(): string {
        return this.outline
          ? outlineColorClassMap[this.color]
          : colorClassMap[this.color]
      },
      isAnchor(): boolean {
        return Boolean(this.to)
      },
      props(): any {
        const r = {
          bind: { ...this.$attrs },
          is: 'button',
        }
        if (this.isAnchor) {
          r.is = 'Anchor'
          r.bind.to = this.to
        }
        // @ts-ignore
        if (r.is === 'button' && !r.bind.type) {
          // @ts-ignore
          r.bind.type = 'button'
        }
        // @ts-ignore
        if (r.bind.onClick && !r.bind.onClick._stopWhenLoading) {
          const old = r.bind.onClick
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const vm = this
          // @ts-ignore
          r.bind.onClick = function (...args) {
            if (vm.loading) {
              return
            }
            // @ts-ignore
            return old.apply(this, args)
          }
          // @ts-ignore
          r.bind.onClick._stopWhenLoading = true
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
