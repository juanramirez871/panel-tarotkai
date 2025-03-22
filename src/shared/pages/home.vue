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
}

.content-view {
  margin-left: 80px;
  margin-top: 20px;
  width: 94%;
}
</style>
