import {
  reactive,
  onBeforeUnmount,
  Teleport,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue'

const store = reactive({
  title: '',
  description: '',
  keywords: '',
  author: '',
})

export function HTMLHead() {
  return (
    <Teleport to="head">
      {store.title && <title>{store.title}</title>}
      {store.description && (
        <meta name="description" content={store.description} />
      )}
      {store.keywords && <meta name="keywords" content={store.keywords} />}
      {store.author && <meta name="author" content={store.author} />}
    </Teleport>
  )
}

export const useTitle = generateUseFunction('title')
export const useDescription = generateUseFunction('description')
export const useKeywords = generateUseFunction('keywords')
export const useAuthor = generateUseFunction('author')

function generateUseFunction(name: string) {
  return (value: string, vm?: ComponentInternalInstance) => {
    // @ts-ignore
    store[name] = value
    const thevm = vm || getCurrentInstance()
    if (!thevm) {
      throw new Error(
        `HTMLHead use ${name}: the second argument is required when called outside of setup`
      )
    }
    onBeforeUnmount(() => {
      // @ts-ignore
      if (store[name] === value) {
        // @ts-ignore
        store[name] = ''
      }
    }, thevm)
  }
}
