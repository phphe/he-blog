<template lang="pug">
template(v-if="node.isParent")
  template(v-if="node.depth > 1")
    a(:name="node.slug")
    div(v-is="'h'+node.depth") {{node.text}}
  template(v-if="node.children")
    CmdGeneratorArticleContent(v-for="child in node.children" :node="child" :store="node.store || store")
  template(v-if="node.depth === 1")
    strong Result
template(v-else-if="node.isJSON")
div(v-else v-is="node.tagName" v-bind="resolvedNode.attrs" v-html="resolvedNode.innerHTML")
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CmdGeneratorArticleContent',
    // components: {},
    props: {
      node: {},
      store: {},
    },
    // data() {
    //   return {}
    // },
    computed: {
      // node html resolved
      resolvedNode(): string {
        // e.g. remove start and end tag of <p>text</p>
        // @ts-ignore
        const { tagName, html } = this.node
        const m = html
          .trim()
          .match(new RegExp(`^<${tagName}(.*?)>(.*?)</${tagName}>$`, 's'))
        const innerHTML = m[2]
        let t = m[1].trim().match(/\b\S+?\b(=".*?")?/g)
        const attrs = {}
        if (t) {
          for (const t2 of t) {
            const arr = t2.split('=')
            const name = arr.shift()
            let value = t2.substring(name.length + 1) || '' // without name and =
            value = value.substring(1, value.length - 1) // without ""(quotes)
            attrs[name] = value
          }
        }
        return { innerHTML, attrs }
      },
    },
    // watch: {},
    // methods: {},
    // created() {},
    // mounted() {}
  })
</script>

<style lang="scss"></style>
