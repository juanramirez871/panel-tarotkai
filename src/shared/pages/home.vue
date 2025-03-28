<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';


</script>

<template>
  <NavBar />
  <div class="content">
    <SideBar />
    <div class="content-view">
      <router-view></router-view>
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
}
</style>
