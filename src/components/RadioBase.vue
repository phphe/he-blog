<template lang="pug">
input(type="checkbox" v-model="localValue")
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    // components: {},
    props: {
      value: {},
      modelValue: {},
      nullable: { type: Boolean, default: true },
    },
    data() {
      return {}
    },
    computed: {
      localValue: {
        get(): boolean {
          return this.modelValue === this.value
        },
        set(checked: boolean) {
          if (checked) {
            this.$emit('update:modelValue', this.value)
          } else {
            if (this.nullable) {
              this.$emit('update:modelValue', null)
            } else {
              this.$el.checked = true
            }
          }
        },
      },
    },
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss"></style>
