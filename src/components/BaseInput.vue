<template lang="pug">
//- v-model don't work when use `is`  with native HTML element
component.base-input(
  :is="multiline ? 'textarea' : 'input'"
  @input="localValue=$event.target.value"
  type="text" :disabled="disabled"
  :class="[!multiline && 'base-input-'+size, {'is-focus': isFocus, 'base-input-multiline': multiline, 'is-disabled': disabled}]"
  ref="control" @focus="fh_onfocus" @blur="fh_onblur"
  :rows="multiline ? $attrs.rows || 5 : false"
)
</template>

<script>
import * as vf from 'vue-functions'
import * as hp from 'helper-js'
import FocusHelper from './FocusHelper.js'

export default {
  extends: FocusHelper,
  mixins: [vf.updatablePropsEvenUnbound({
    value: {$localName: 'localValue'},
  })],
  // components: {},
  props: {
    size: {default: 'md'},
    multiline: {type: Boolean},
    disabled: {type: Boolean},
    commonEventslistener: {type: Function}, // listen common events
  },
  data() {
    return {
      mountedPromise: new Promise((resolve, reject) => {
        this._mountedPromise_resolve = resolve
      }),
    }
  },
  // computed: {},
  watch: {
    localValue: {
      immediate: true,
      async handler(localValue) {
        // :value="localValue" don't work for textarea, so set value manually
        // set $el.value null when is undefined
        await this.mountedPromise
        this.$el.value = localValue === undefined ? null : localValue
      }
    }
  },
  // methods: {},
  // created() {},
  mounted() {
    this._mountedPromise_resolve()
    this.$watch('multiline', () => {
      if (this._destroy_commonEventslistener) {
        this._destroy_commonEventslistener()
        this._destroy_commonEventslistener = null
      }
      this.$nextTick(() => {
        const names = ['blur', 'change', 'focus', 'contextmenu', 'select', 'keydown', 'keypress', 'keyup', 'resize']; // 'input' is already listened
        const destroys = [];
        for (const name of names) {
          const handler = hp.onDOM(this.$el, name, (event) => {
            this.$emit(name, event)
            if (this.commonEventslistener) {
              this.commonEventslistener(name, event)
            }
          })
          destroys.push(() => hp.offDOM(this.$el, name, handler))
        }
        this._destroy_commonEventslistener = () => destroys.forEach(f => f())
      })
    }, {immediate: true})
  },
  beforeDestroy() {
    if (this._destroy_commonEventslistener) {
      this._destroy_commonEventslistener()
      this._destroy_commonEventslistener = null
    }
  },
}
</script>

<style lang="scss">
$radius: $borderRadius;
.base-input{
  vertical-align:top;
  border-radius: $radius;
  border: 1px solid $borderColor;
  box-sizing: border-box;
  padding: 0 15px;
  cursor: pointer;
  appearance: none;
  background-color: #fff;
  background-image: none;
  outline: none;
  transition: border-color .2s $bezier;
  &.is-focus{
    border-color: $activeBorderColor;
  }
  &[type=number]{
    padding-right: 0;
  }
  &.is-disabled{
    background-color: $greyBack;
    cursor: not-allowed;
  }
}
.base-input-sm{
  $height: $formControlHeightSm;
  height: $height;
  line-height: $height;
}
.base-input-md{
  $height: $formControlHeight;
  height: $height;
  line-height: $height;
}
.base-input-lg{
  $height: $formControlHeightLg;
  height: $height;
  line-height: $height;
}
// multiline ===========
.base-input-multiline{
  height: auto;
  line-height: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
