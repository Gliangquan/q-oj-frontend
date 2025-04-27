<template>
  <div class="about">
    <h1>This is an home page</h1>

    <!-- 测试 MdEditor.vue -->
    <MdEditor />
    <!-- 测试 CodeEditor.vue -->
    <codeEditor />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MdEditor from '@/components/MdEditor.vue'
import codeEditor from '@/components/CodeEditor.vue'

</script>
