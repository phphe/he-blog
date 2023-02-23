<template>
  <div class="default-layout fixed w-full h-full flex">
    <div v-if="sidebarVisible" @click="sidebarVisible = false"
      class="fixed top-0 left-0 w-full h-full bg-black opacity-20">
    </div>
    <div class="main-sidebar flex-shrink-0 w-72 h-full overflow-hidden font-title flex flex-col"
      :class="{ 'fixed bg-white z-10 border-r-2': sm }" v-show="!sm || sidebarVisible">
      <div class="text-center p-2 bg-gray-50 pointer" v-if="sm" @click="sidebarVisible = false">
        <!-- <Icon name="arrow_back"></Icon> -->
      </div>
      <div class="flex-grow overflow-auto">
        <div class="main-title text-2xl text-gray-700 mt-32 ml-16">
          <a :href="homeURL">{{ name }}</a>
        </div>
        <div class="main-menu mt-6 text-gray-600 ml-16">
          <slot name="menu" />
        </div>
      </div>
    </div>
    <div class="main-right flex-grow overflow-auto">
      <div class="px-4 main-body">
        <slot />
      </div>
      <div class="py-10 text-center text-sm text-gray-500">Copyright © {{ name }} {{ year }}. All rights reserved.</div>
    </div>
    <div v-if="sm" class="sm-top-menu flex justify-between fixed w-full top-0 left-0 px-4 py-3 border-b">
      <a class="text-xl" :href="homeURL">{{ name }}</a>
      <VIcon src="/assets/img/menu.svg" :size="23" @click="sidebarVisible
        = !sidebarVisible" />
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed, watchEffect, reactive, onMounted, onUnmounted, ref } from 'vue'
import VIcon from "../components/VIcon.vue";

export default defineComponent({
  components: {
    VIcon
  },
  setup(props) {
    const windowSize = ref({
      width: 1920,
      height: 900,
    })
    const updateWindowSize = () => {
      windowSize.value = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    onMounted(() => {
      updateWindowSize()
      window.addEventListener('resize', updateWindowSize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowSize)
    })

    const sm = computed(() => windowSize.value.width < 760)
    return { sm, }
  },
  props: {
    name: String,
    homeURL: String,
  },
  data() {
    return {
      sidebarVisible: false,
      year: new Date().getFullYear(),
      isDev: import.meta.env.DEV,
    }
  },
  async created() { },
  // computed: {},
  watch: {},
  methods: {
  },
  mounted() {
  },
})
</script>
  
<style>
.main-menu-item {
  @apply block mt-4;
}

.main-body {
  min-height: 750px;
  min-height: calc(100vh - 100px);
}
</style>
  