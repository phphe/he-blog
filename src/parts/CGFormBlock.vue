<template lang="pug">
br(v-if="form.breakLine")
.cmd-generator-form-block-group.inline-block(v-if="form.type === 'group'")
  template(v-if="form.multiple")
    div(v-for="(children, i) in form._children" :key="i")
      FormBlock(v-for="(childForm, i2) in children" :form="childForm" :hideLabel="i > 0")
      .mr-2.mb-2.inline-block.align-top
        label.block.py-2(v-if="i === 0") &nbsp;
        Btn.cgform-control(paddingClass="px-2" @click="i === 0 ?groupAdd() : groupReduce(i)")
          Icon(:name="i === 0 ? 'add' : 'remove'")
  template(v-else)
    FormBlock(v-for="childForm in form.children" :form="childForm")
.cmd-generator-form-block.mr-2.mb-2.inline-block.w-60.align-top.max-w-full(v-else :style="style")
  span.block.text-gray-600.py-2(v-if="!hideLabel")
    label(:for="id") {{form.name}}
    HelpIcon.ml-1(v-if="form.help")
      div(v-html="form.help")
  div(v-if="form.multiple")
    .flex(v-for="(x, i) in form.value" :key="i" :class="{'mt-2': i > 0}")
      .flex-grow
        input.w-full.cgform-control(
          :id="i === 0 ? id : null" :class="inputClass" v-bind="form.controlAttrs"
          :type="form.type === 'string' ? 'text' : 'number'"
          v-model="form.value[i]"
        )
      Btn.flex-shrink.ml-2.cgform-control(paddingClass="px-2" @click="i === 0 ?form.value.push(defaultValue()) : form.value.splice(i, 1)")
        Icon(:name="i === 0 ? 'add' : 'remove'")
  input.w-full.cgform-control(
    v-else-if="form.type === 'string' || form.type === 'number'"
    :id="id" :class="inputClass" v-bind="form.controlAttrs"
    :type="form.type === 'string' ? 'text' : 'number'"
    v-model="form.value"
  )
  select.w-full.cgform-control(
    v-else-if="form.type === 'select'"
    :id="id" :class="inputClass" v-bind="form.controlAttrs"
    v-model="form.value"
  )
    option(value="") {{$t('Please_select')}}
    option(v-for="item in cptOptions" :value="item.value") {{item.text}}
  template(v-else-if="form.type === 'radio'")
    span(v-for="(item, i) in cptOptions" :class="{'mr-2': !form.vertical && i < cptOptions.length - 1, flex: form.vertical, 'whitespace-nowrap': form.nowrap, 'leading-10': form.oneLine}")
      label
        RadioBase(class="align-center rounded-full border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-offset-0 focus:ring-primary-200 focus:ring-opacity-50"
          :value="item.value" v-model="form.value"
        )
        span.ml-1.align-middle {{item.text}}
      span.align-middle
        HelpIcon.ml-1(v-if="item.help")
          div(v-html="item.help")
  template(v-else-if="form.type === 'checkbox'")
    template(v-if="form.options")
      span(v-for="(item, i) in cptOptions" :class="{'mr-2': !form.vertical && i < cptOptions.length - 1, flex: form.vertical, 'whitespace-nowrap': form.nowrap, 'leading-10': form.oneLine}")
        label
          input(type="checkbox" class="rounded border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-offset-0 focus:ring-primary-200 focus:ring-opacity-50"
            :value="item.value" v-model="form.value" @change="checkRadioGroup($event, item, form)"
          )
          span.ml-1.align-middle {{item.text}}
        span.align-middle
          HelpIcon.ml-1(v-if="item.help")
            div(v-html="item.help")
    template(v-else)
      input(type="checkbox" class="rounded border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-offset-0 focus:ring-primary-200 focus:ring-opacity-50"
          v-model="form.value"
        )
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import * as hp from 'helper-js'
  import HelpIcon from '../components/HelpIcon.vue'
  import RadioBase from '../components/RadioBase.vue'

  export default defineComponent({
    name: 'FormBlock',
    components: { HelpIcon, RadioBase },
    props: {
      form: { type: Object },
      // for group
      hideLabel: { type: Boolean },
      isGroupLast: { type: Boolean },
      multiIndex: { type: Number },
    },
    data() {
      return {
        id: '',
        inputClass:
          'rounded-md bg-gray-100 border-transparent focus:border-primary-500 focus:bg-white focus:ring-0',
      }
    },
    computed: {
      style() {
        const r = {}
        if (this.form?.width) {
          // @ts-ignore
          r['width'] = `${this.form.width}px`
        }
        return r
      },
      cptOptions() {
        const r = [...this.form.options]
        if (this.form.nullable) {
          r.unshift({ value: null, text: 'None' })
        }
        return r
      },
    },
    watch: {
      'form.name': {
        immediate: true,
        handler(name) {
          let id = name ? name.replace(/\s+/, '_') + `_${hp.randString()}` : ''
          this.id = id
        },
      },
    },
    created() {
      this.initForm()
      this.$watch(() => this.form, this.initForm)
    },
    mounted() {},
    methods: {
      initForm() {
        if (
          this.form.type === 'group' &&
          this.form.multiple &&
          !this.form._children
        ) {
          this.form._children = [this.form.children]
        }
        if (
          this.form.type === 'select' &&
          this.form.nullable &&
          this.form.value === undefined
        ) {
          this.form.value = null
        }
        if (this.form.value == null) {
          if (this.form.multiple) {
            this.form.value = [this.defaultValue()]
          } else if (this.form.type === 'checkbox') {
            if (this.form.options) {
              this.form.value = []
            }
          } else {
            this.form.value = this.defaultValue()
          }
        }
      },
      groupAdd() {
        const cloned = JSON.parse(JSON.stringify(this.form.children))
        for (const child of cloned) {
          child.value = null
        }
        this.form._children.push(cloned)
      },
      groupReduce(i) {
        this.form._children.splice(i, 1)
      },
      defaultValue() {
        const { defaultValue } = this.form
        if (defaultValue == null) {
          return null
        }
        if (typeof defaultValue === 'function') {
          return defaultValue()
        } else {
          return defaultValue
        }
      },
      checkRadioGroup(e, option, form) {
        const { radioGroup } = option
        if (radioGroup != null) {
          if (e.target.checked) {
            const set = new Set(form.value)
            let changed = false
            for (const opt of form.options) {
              if (opt.radioGroup === radioGroup && opt !== option) {
                if (set.has(opt.value)) {
                  set.delete(opt.value)
                  changed = true
                }
              }
            }
            if (changed) {
              form.value = Array.from(set)
            }
          }
        }
      },
    },
  })
</script>

<style lang="scss">
  .cgform-control {
    @apply pt-0 pb-0 h-10;
  }
</style>
