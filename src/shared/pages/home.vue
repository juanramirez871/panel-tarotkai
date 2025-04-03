<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';


</script>

<template>
  <NavBar />
  <div class="content">
    <SideBar />
    <div class="content-view">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
}

.content-view {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  width: 100%;
  overflow-x: hidden;
}

::v-deep(.el-empty__description) {
  color: #eceaea !important;
}

::v-deep(.el-empty__image) {
  filter: brightness(0.8);
}

.custom-dialog {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-form {
  padding: 20px;
}
</style>
