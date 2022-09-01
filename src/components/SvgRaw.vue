<!-- ./SvgRaw.vue -->
<script setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  useAttrs,
  watch,
} from "vue"

const modules = import.meta.globEager("@/assets/svg/*.svg", {
  as: "component",
})
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
})
const attrs = useAttrs()
const instance = getCurrentInstance()

const svgRef = ref()

const currentComponent = computed(() => {
  const fileName = "/" + props.name + ".svg"
  for (const path in modules) {
    const mod = modules[path]
    if (path.endsWith(fileName)) {
      return mod
    }
  }
  throw new Error("not found svg file:" + fileName)
})

// data-v-hash
let scopeId = ""
if (instance?.type) {
  console.log(instance)
  // __scopeId 存在的条件是 <style scoped>
  const __scopeId = instance?.type?.__scopeId
  if (__scopeId) {
    scopeId = __scopeId
  }
}

const attachAttr = async () => {
  await nextTick()
  // 取到 svg dom
  const cpt = svgRef.value
  if (!cpt) return
  const svg = cpt.$el
  if (!(svg instanceof Element)) return

  // 由于svg不在vue_template里,所以初始没有添加样式隔离,需要手动给svg和所有子dom添加 data-v-hash
  if (scopeId) {
    svg.setAttribute(scopeId, "")
    svg.querySelectorAll("*").forEach((element) => {
      element.setAttribute(scopeId, "")
    })
  }
}

watch(
  () => props.name,
  async () => {
    await nextTick()
    attachAttr()
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <component
    :is="currentComponent"
    v-if="currentComponent"
    ref="svgRef"
    v-bind="$attrs"
    class="svg-raw"
    :name="name"
  />
</template>
<style scoped>
svg,
path {
  transition: fill 1000ms;
}
svg:hover path {
  /* transform: rotate(30deg); */
  fill: #f00;
}
</style>
