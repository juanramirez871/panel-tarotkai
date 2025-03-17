<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo menu"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><document /></el-icon>
          <span>Llamadas</span>
        </el-menu-item>

        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>Clientes</span>
        </el-menu-item>

        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>Metricas</span>
        </el-menu-item>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>Configuración</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">Tarifas</el-menu-item>
            <el-menu-item index="4-2">Bonos</el-menu-item>
            <el-menu-item index="4-3">Permisos</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>

.menu {
  height: calc(100vh - 60px);
  min-width: 200px;
}

</style>