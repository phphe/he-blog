<template lang="pug">
.components-view.container.mx-auto
  h1.text-2xl.text-center components
  h1.text-xl.text-center.mt-4 Anchor
  Anchor No url
  Anchor.ml-4(href="//google.com") External url
  Anchor.ml-4(to="/") Router link
  Anchor.ml-4(to="/" target="_blank") Router link but target _blank
  Anchor.ml-4(@click="alertHello") click event
  h1.text-xl.text-center.mt-4 Icon
  Icon(name="settings")
  h1.text-xl.text-center.mt-4 Btn(button)
    Anchor.ml-2.text-sm(to="https://v1.tailwindcss.com/components/buttons" underline) more
  div
    Btn() default
    Btn.ml-2(color="primary") primary
    Btn.ml-2(color="warning") warning
    Btn.ml-2(color="danger") danger
    Btn.ml-2(color="success") success
  .mt-1
    Btn(outline) default
    Btn.ml-2(color="primary" outline) primary
    Btn.ml-2(color="warning" outline) warning
    Btn.ml-2(color="danger" outline) danger
    Btn.ml-2(color="success" outline) success
  .mt-1
    Btn(disabled) disabled
    Btn.ml-2(color="primary" disabled) disabled
    Btn.ml-2(color="warning" disabled) disabled
    Btn.ml-2(color="danger" disabled) disabled
    Btn.ml-2(color="success" disabled) disabled
  .mt-1
    Btn.rounded-full(color="primary") rounded-full
    Btn.ml-2(color="primary" to="/") route
    Btn.ml-2.shadow(color="default") shadow
    Btn.ml-2.shadow(color="primary" @click="alertHello") click event
    Btn.ml-2.shadow(color="default" loading @click="alertHello") loading
  h1.text-xl.text-center.mt-4 AspectBox
  AspectBox.w-40.inline-block(src="https://picsum.photos/seed/picsum/200/300" :aspect="1/1")
  AspectBox.w-80.ml-2.inline-block(src="https://picsum.photos/seed/picsum/200/300" :aspect="16/9")
  AspectBox.w-40.ml-2.bg-primary-500.inline-block(:aspect="1/1")
  h1.text-xl.text-center.mt-4 Badge
  Badge(text="1")
    Btn(outline) TODO
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Anchor from '../components/Anchor.vue'
  import Icon from '../components/Icon.vue'
  import Btn from '../components/Btn.vue'
  import AspectBox from '../components/AspectBox.vue'
  import Badge from '../components/Badge.vue'

  export default defineComponent({
    components: { Anchor, Icon, Btn, AspectBox, Badge },
    data() {
      return {
        a: null,
      }
    },
    methods: {
      alertHello() {
        alert('hello')
      },
    },
  })
</script>

<style lang="scss">
  .components-view {
  }
</style>
