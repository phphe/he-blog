<template>
  <span class="Icon" :class="$style.icon" :style="{ width: computedSize }">
    <!-- ZWSP(zero-width space) -->
    <span data-nosnippet>{{ "\u200b" }}</span>
    <img :src="src" :class="$style.svg" />
  </span>
</template>

<script lang="tsx">
// for svg, image
import { computed, defineComponent } from "vue";

export const config = {
  defaultSize: "1em",
};

export default defineComponent({
  props: {
    src: { type: String },
    size: { type: [String, Number], default: () => config.defaultSize },
  },
  setup(props) {
    const computedSize = computed(() =>
      typeof props.size === "number" ? props.size + "px" : props.size
    );
    return { computedSize };
  },
});
</script>

<style module>
.icon {
  display: inline-flex;
  align-items: center;
}

.svg {
  width: 100%;
  height: auto;
  fill: currentColor;
}
</style>
