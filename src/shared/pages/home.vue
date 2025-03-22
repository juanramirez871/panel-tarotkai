<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';


</script>

<template>
  <NavBar />
  <div class="content">
    <SideBar />
    <div style="margin-left: 80px; margin-top: 20px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
}
</style>
