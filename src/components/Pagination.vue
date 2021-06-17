<template lang="pug">
.pagination(v-if="pageCount && pageCount > 1")
  .button-group
    Anchor.pagination-page-btn(
      v-for="(btn, index) in pageBtns" :key="btn.text+btn.page"
      :class="['px-2 py-1 border mr-1 rounded', btn.page == current ? 'bg-primary-500 hover:bg-primary-700 text-white border-primary-400' : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-300' ]" 
      @click="useLink ? null : gotoPage(btn.page)" :to="useLink ? genLink(btn.page): null"
    ) {{btn.text}}
  //- form.pagination-input-area(v-if="input" @submit.prevent="gotoPageByInput")
  //-   span Go to page
  //-   Input.pagination-input(:size="size" type="number" v-model.number="inputPage" min="1" :max="pageCount")
  //-   Button(:size="size" type="submit") Go
</template>

<script lang="ts">
  import { arrayFirst, arrayLast } from 'helper-js'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      // number
      page: { required: true, type: Number }, // items count
      total: { required: true, type: Number }, // items count
      pageSize: { default: 10, type: Number },
      max: { default: 11, type: Number }, // max number of buttons, min is 7
      input: { type: Boolean }, // TODO
      useLink: { type: Boolean },
      queryName: { default: 'page', type: String },
    },
    data() {
      return {
        cache: {
          pageBtns: null,
        },
        inputPage: null,
      }
    },
    computed: {
      current() {
        return this.page == null ? 1 : parseInt(this.page)
      },
      pageCount() {
        return Math.ceil(this.total / this.pageSize)
      },
      leftBtns() {
        const items = []
        if (this.current > 1) {
          items.push({
            text: '«',
            page: this.current - 1,
          })
          items.push({
            text: '1',
            page: 1,
          })
        }
        return items
      },
      rightBtns() {
        const items = []
        if (this.current < this.pageCount) {
          items.push({
            text: this.pageCount,
            page: this.pageCount,
          })
          items.push({
            text: '»',
            page: this.current + 1,
          })
        }
        return items
      },
      pageBtns() {
        // clone
        const leftBtns = this.leftBtns.slice(0)
        const rightBtns = this.rightBtns.slice(0)
        const centerBtns = [
          {
            text: this.current,
            page: this.current,
          },
        ]
        // complete centerBtns
        const max = this.max < 7 ? 7 : this.max
        let rest = max - leftBtns.length - rightBtns.length - centerBtns.length
        let leftPage = this.current - 1
        let rightPage = this.current + 1
        while (rest > 0 && (leftPage > 1 || rightPage < this.pageCount)) {
          if (leftPage > 1) {
            centerBtns.splice(0, 0, {
              text: leftPage,
              page: leftPage,
            })
            rest--
          }
          if (rest <= 0) break
          if (rightPage < this.pageCount) {
            centerBtns.push({
              text: rightPage,
              page: rightPage,
            })
            rest--
          }
          leftPage--
          rightPage++
        }
        const centerFirst = arrayFirst(centerBtns)
        const centerLast = arrayLast(centerBtns)
        if (centerFirst.page < this.current && centerFirst.page > 2) {
          centerFirst.text = '…'
        }
        if (
          this.current < centerLast.page &&
          centerLast.page < this.pageCount - 1
        ) {
          centerLast.text = '…'
        }
        this.cache.pageBtns = [...leftBtns, ...centerBtns, ...rightBtns]
        return this.cache.pageBtns
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler(route) {
          if (this.useLink) {
            const page = parseInt(route.query[this.queryName] || 1)
            if (page !== this.page) {
              this.$emit('update:page', page)
            }
          }
        },
      },
    },
    methods: {
      async gotoPage(page: number) {
        if (this.useLink) {
          this.setPageRoute(page)
        } else {
          this.$emit('update:page', page)
        }
      },
      gotoPageByInput() {
        if (this.inputPage != null) {
          let t = parseInt(this.inputPage)
          if (t > this.pageCount) {
            t = this.pageCount
          } else if (t < 1) {
            t = 1
          }
          this.gotoPage(t)
        }
      },
      genLink(page: number) {
        return {
          path: this.$route.path,
          query: { ...this.$route.query, [this.queryName]: page },
        }
      },
      setPageRoute(page: number) {
        this.$router.push(this.genLink(page))
      },
    },
  })
</script>

<style lang="scss">
  .pagination {
    display: inline-block;
  }
  .pagination-page-btn {
  }
  .pagination-page-btn--active {
  }
  .pagination-input-area {
    display: inline-block;
    margin-left: 1em;
  }
  .pagination-input {
    width: 50px;
    padding-left: 5px;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
</style>
