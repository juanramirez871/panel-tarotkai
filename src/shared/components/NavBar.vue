<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
    <el-text class="mx-1 title" size="large">TarotKai</el-text>
    </el-menu-item>
    <el-menu-item>
        <el-text class="mx-1" size="large">Luffy</el-text>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-avatar shape="circle" :size="50" :fit="fit" :src="url" class="block" />
      </template>
      <el-menu-item index="2-2">Perfil</el-menu-item>
      <el-menu-item index="2-3">Cerrar Sesion</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const state = reactive({
  fit: 'fill',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkXMY-6UV_ItytPcXtW7eUD1u4BgZmA3mXQ&s',
})

const { fit, url } = toRefs(state)
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.title{
  font-size: 35px;
  font-family: "Concert One", sans-serif !important;
}
</style>