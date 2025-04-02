<template>
  <el-menu default-active="1" class="el-menu-vertical-demo menu" :collapse="isCollapse">

    <el-menu-item>
      <el-radio-group v-model="isCollapse" style="">
        <p :value="false">expand</p>
        <p :value="true">collapse</p>
      </el-radio-group>
    </el-menu-item>

    <router-link :to="{ name: 'calls' }">
      <el-menu-item index="1">
        <el-icon>
          <Phone style="color: black;" />
        </el-icon>
        <span>Llamadas</span>
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'customers' }">
      <el-menu-item index="2">
        <el-icon>
          <User style="color: black;" />
        </el-icon>
        <span>Clientes</span>
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'reservations' }">
      <el-menu-item index="3">
        <el-icon>
          <MessageBox style="color: black;" />
        </el-icon>
        <span>Reservas</span>
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'metrics' }">
      <el-menu-item index="4">
        <el-icon>
          <Histogram style="color: black;" />
        </el-icon>
        <span>Metricas</span>
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'goals' }">
      <el-menu-item index="5">
        <el-icon>
          <Star style="color: black;" />
        </el-icon>
        <span>Metas</span>
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'reports' }">
      <el-menu-item index="6">
        <el-icon>
          <Document style="color: black;" />
        </el-icon>
        <span>Reportes</span>
      </el-menu-item>
    </router-link>

    <el-sub-menu index="7">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        <span>Configuración</span>
      </template>
      <el-menu-item-group>
        <router-link :to="{ name: 'users' }"><el-menu-item index="7-1">Usuarios</el-menu-item></router-link>
        <router-link :to="{ name: 'privileges' }"><el-menu-item index="7-2">Permisos</el-menu-item></router-link>
        <router-link :to="{ name: 'type-calls' }"><el-menu-item index="7-3">Tipo de
            llamadas</el-menu-item></router-link>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Setting,
  User,
  Phone,
  MessageBox,
  Star,
  Histogram,
  Document
} from '@element-plus/icons-vue'
import { ref } from 'vue'

const isCollapse = ref(false)

</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}

a:visited {
  color: inherit;
  text-decoration: none;
}

.menu {
  min-height: 100vh;
  z-index: 1000;
}
</style>