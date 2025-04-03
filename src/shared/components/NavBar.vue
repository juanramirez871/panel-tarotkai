<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <el-text class="mx-1 title" size="large">TarotKai</el-text>
    </el-menu-item>
    <el-menu-item>
      <el-text class="mx-1" size="large">{{ user.name.split(' ')[0] + ' ' + (user.name.split(' ')[1] ?? '') }} <b>({{
        user.extension }})</b></el-text>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-avatar shape="circle" :size="50" :fit="fit" :src="url" class="block" />
      </template>
      <el-menu-item index="2-2">Perfil</el-menu-item>
      <el-menu-item @click="logoutHandle" index="2-3">Cerrar Sesion</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuth } from '../../modules/auth/store/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuth()
const { user } = storeToRefs(authStore)
const activeIndex = ref('1')
const { logout } = useAuth()
const router = useRouter()
const state = reactive({
  fit: 'fill',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkXMY-6UV_ItytPcXtW7eUD1u4BgZmA3mXQ&s',
})
const { fit, url } = toRefs(state)


async function logoutHandle() {
  await logout()
  router.push({ name: "login" })
}

</script>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.title {
  font-size: 35px;
  font-family: "Concert One", sans-serif !important;
}
</style>