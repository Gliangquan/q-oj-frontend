<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor, Viewer } from '@bytemd/vue-next'

const plugins = [
  gfm(),
  highlight(),
]

const value = ref('')

const handleChange = (val: string) => {
  value.value = val
}

</script>