<template lang="pug">
.cmd-generator-usage(:id="usage.hash")
  h2.text-2xl {{usage.name}}
  p.mt-2.whitespace-pre-wrap(v-if="usage.description" v-html="usage.description")
  form.mt-3
    CodeBlock(ref="codeBlock" :code="resultCode" :copyText="$t('Copy')" :copiedText="$t('Copied')" :parts="results")
    .mt-2
      template(v-for="(form, i) in usage.form" :key="i")
        FormBlock(:form="form")
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import FormBlock from '../parts/CGFormBlock.vue'
  import CodeBlock from '../parts/CMDCodeBlock.vue'
  import { NO_VALUE } from '../content/cmd-generators/_utils'

  export default defineComponent({
    components: { FormBlock, CodeBlock },
    props: {
      generator: { type: Object },
      usage: { type: Object },
    },
    data() {
      return {
        results: null,
      }
    },
    computed: {
      resultCode() {
        const { usage, generator } = this
        const mainParts = []
        const theArguments = []
        const keyedValues = {}
        mainParts.push(generator.cmd || generator.name)
        if (usage.cmd) {
          mainParts.push(usage.cmd)
        }
        const quote = (value) => (value.match(/[\s']/) ? `"${value}"` : value)
        const iteralForm = (forms, localKeyedValues) => {
          for (const form of forms) {
            if (form.type === 'group') {
              if (!form.multiple) {
                iteralForm(form.children, localKeyedValues)
              } else {
                for (let index = 0; index < form._children.length; index++) {
                  let localKeyedValues2 = localKeyedValues
                  if (form.key) {
                    if (!localKeyedValues[form.key]) {
                      localKeyedValues[form.key] = []
                    }
                    localKeyedValues2 = localKeyedValues[form.key][index] = {}
                  }
                  iteralForm(form._children[index], localKeyedValues2)
                }
              }
            } else if (form.value != null && form.value != '') {
              if (!form.key) {
                if (form.cmd) {
                  if (Array.isArray(form.value)) {
                    for (const value of form.value) {
                      if (value != null && value !== '') {
                        mainParts.push(form.cmd)
                        mainParts.push(quote(value))
                      }
                    }
                  } else if (typeof form.value === 'boolean') {
                    if (form.value === true) {
                      mainParts.push(form.cmd)
                    }
                  } else {
                    mainParts.push(form.cmd)
                    mainParts.push(quote(form.value))
                  }
                } else {
                  const parts = form.isArgument ? theArguments : mainParts
                  if (Array.isArray(form.value)) {
                    for (const value of form.value) {
                      if (value != null && value !== '') {
                        parts.push(quote(value))
                      }
                    }
                  } else {
                    parts.push(quote(form.value))
                  }
                }
              } else {
                localKeyedValues[form.key] = form.value
              }
            }
          }
        }
        iteralForm(usage.form, keyedValues)
        if (usage.beforeGenerate) {
          executeStringFunctionJS(usage.beforeGenerate, {
            usage,
            keyedValues,
            mainParts,
            theArguments,
            quote,
          })
        }

        let t
        if (generator.diableShortOptionMerge) {
          t = mainParts.slice()
        } else {
          // merger single word options
          t = []
          let stash
          const cleanStash = (hasValue: boolean) => {
            if (stash && stash.length > 0) {
              if (hasValue) {
                const last = stash.pop()
                t.push('-' + last)
              }
            }
            stash = null
          }
          for (const item of mainParts) {
            if (item[0] === '-' && item[1] !== '-') {
              if (!stash) {
                stash = []
                t.push(stash)
              }
              stash.push(item.substr(1))
            } else {
              const isValue = !item.startsWith('--')
              cleanStash(isValue)
              if (item.startsWith('\\-')) {
                t.push(item.substr(1))
              } else {
                t.push(item)
              }
            }
          }
          cleanStash()
          const mergeAble = []
          t = t.filter((v) => {
            if (Array.isArray(v)) {
              mergeAble.push(...v)
            } else {
              return true
            }
          })
          if (mergeAble.length > 0) {
            t.splice(1, 0, `-${mergeAble.join('')}`)
          }
        }

        const t2 = []
        // t with optionNameValueSeparator
        const spt = this.generator.optionNameValueSeparator
        const lspt = this.generator.longOptionNameValueSeparator
        const isValue = (v) => !v.match(/^--?[\w-_]+$/)
        const isLong = (v) => v.length > 2
        t.forEach((v, i) => {
          if (v === NO_VALUE) {
            //
          } else if (i > 0 && isValue(v)) {
            const optionName = t2.pop()
            const localSpt = isLong(optionName) ? lspt : spt
            t2.push(`${optionName}${localSpt}${v}`)
          } else {
            t2.push(v)
          }
        })
        return [...t2, ...theArguments].join(' ')
      },
    },
    watch: {
      resultCode: {
        immediate: true,
        handler(newCmd, old) {
          this.results = cmdDiff(old || '', newCmd)
          this.$refs?.codeBlock?.highlight()
        },
      },
    },
    // methods: {},
    // created() {},
    // mounted() {}
  })
  function executeStringJS(code) {
    return Function(`"use strict";return (
      ${code}
    )`)()
  }
  function executeStringFunctionJS(code, arg) {
    const { global, name } = resolveGlobal()
    global._executeStringFunctionJS_tmp = arg
    return executeStringJS(`
      ${code}(${name}._executeStringFunctionJS_tmp)`)
  }
  function resolveGlobal() {
    let globalVariable
    let globalVariableName
    try {
      if (global) {
        globalVariable = global
        globalVariableName = 'global'
      } else {
        globalVariable = window
        globalVariableName = 'window'
      }
    } catch (error) {
      globalVariable = window
      globalVariableName = 'window'
    }
    return { global: globalVariable, name: globalVariableName }
  }
  function cmdDiff(old, newCmd) {
    let changedStart = null,
      changedEnd = 0
    for (let i = 0; i < newCmd.length; i++) {
      if (old[i] !== newCmd[i]) {
        changedStart = i
        break
      }
    }
    if (changedStart == null) {
      changedStart = newCmd.length
    }
    for (let i = 0; i < newCmd.length; i++) {
      const j = newCmd.length - 1 - i
      const k = old.length - 1 - i
      if (old[k] !== newCmd[j] || k < changedStart || j < changedStart) {
        changedEnd = j + 1
        break
      }
    }
    let head = newCmd.substring(0, changedStart)
    let changed = newCmd.substring(changedStart, changedEnd)
    let tail = newCmd.substring(changedEnd)
    // move ends spaces to head and tail
    let m = changed.match(/^\s+/)
    if (m) {
      head = head + m
      changed = changed.substring(m.length)
    }
    m = changed.match(/\s+$/)
    if (m) {
      tail = m + tail
      changed = changed.substr(0, changed.length - m.length)
    }
    return [head, changed, tail]
  }
</script>

<style lang="scss"></style>
