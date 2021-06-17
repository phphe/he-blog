<template lang="pug">
.default-layout.fixed.w-full.h-full.flex
  .main-sidebar.flex-shrink-0.w-72.h-full.overflow-hidden.font-title.flex.flex-col(:class="{'fixed bg-white z-10 border-r-2': sm}" v-show="!sm || sidebarVisible")
    .text-center.p-2.bg-gray-50.pointer(v-if="sm" @click="sidebarVisible=false")
      Icon(name="arrow_back")
    .flex-grow.overflow-auto
      //- .contents-block.p-4.border-b-2(v-show="state.tableOfContents.visible")
      //-   .text-xl {{$t('Contents')}}
      //-   ul.list-decimal.pl-4.mt-1
      //-     li(v-for="item in state.tableOfContents.value")
      //-       a.text-primary-600(class='hover:text-primary-800' :href="item.url" v-anchor) {{item.text}}

      .main-title.text-2xl.text-gray-700.mt-32.ml-16 
        img.w-8.inline-block(v-if="!zhSupport" src="../assets/img/char_logo.png")
        span(:class="{'align-middle ml-1': !zhSupport}") {{(zhSupport ? '何 ' : '') + "He's Blog"}}
      .main-menu.mt-6.text-gray-600.ml-16
        Anchor.main-menu-item(:to="{name: 'home'}") {{$t('Home')}}
        Anchor.main-menu-item(:to="{name: 'page', params:{slug: 'my-works'}}") {{$t('Works')}}
        Anchor.main-menu-item(:to="{name: 'page', params:{slug: 'about'}}") {{$t('About')}}
        Popup.main-menu-item(caret menu hover)
          | {{$t('Languages')}}
          template(v-slot:card)
            .shadow.rounded.text-sm
              Anchor.block.py-2.px-3(class="hover:bg-gray-100" @click="switchLocale('en')") English
              Anchor.block.py-2.px-3(class="hover:bg-gray-100" @click="switchLocale('zh')") 简体中文
        Anchor.main-menu-item(v-if="isDev" @click="reloadRouteView()") Reload Route View
    //- .flex-shrink-0.py-2.text-center
  .main-right.flex-grow.overflow-auto()
    .px-4.main-body
      router-view(:key="routeViewKey")
    .py-10.text-center.text-sm.text-gray-500 Copyright © He's Blog {{year}}. All rights reserved.
  Btn.fixed.bottom-5.right-2(v-if="sm" class="roundedbg-white hover:bg-gray-100 text-gray-800 border border-gray-300 pt-0 pb-0 h-10" paddingClass="px-2" @click="sidebarVisible=!sidebarVisible")
    Icon(name="menu")
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { routeViewKey, reloadRouteView } from '../router'
  import { state } from '../store'
  import { switchLocale } from '../i18n'
  import { api } from '../http'
  import * as hp from 'helper-js'
  import useWindowSize from '../plugins/useWindowSize'
  import config from '../config'

  export default defineComponent({
    components: {},
    setup(props) {
      const windowSize = useWindowSize()
      const sm = computed(() => windowSize.value.innerWidth < 760)
      return { routeViewKey, reloadRouteView, sm }
    },
    // props: {},
    data() {
      return {
        state,
        sidebarVisible: false,
        year: new Date().getFullYear(),
        zhSupport: false,
        isDev: config.IS_DEVLOPMENT,
      }
    },
    async created() {},
    // computed: {},
    watch: {},
    methods: {
      switchLocale(to: string) {
        switchLocale(to, this.$router, this.$route)
      },
    },
    mounted() {
      this.zhSupport = Boolean(navigator.language.match(/^zh/))
    },
  })
</script>

<style lang="scss">
  .main-menu-item {
    @apply block mt-4;
  }
  .main-body {
    min-height: 750px;
    min-height: calc(100vh - 100px);
  }
</style>
