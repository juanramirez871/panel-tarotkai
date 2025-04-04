<template>
  <el-menu default-active="1" class="el-menu-vertical-demo menu" :collapse="isCollapse">

    <el-menu-item>
      <el-radio-group v-model="isCollapse" style="">
        <p :value="false">expand</p>
        <p :value="true">collapse</p>
      </el-radio-group>
    </el-menu-item>

    <div v-for="el in modules">

      <router-link v-if="el.submodules.length == 1" :to="{ name: el.route }">
        <el-menu-item :index="el.module_id">
          <el-icon>
            <component :is="getIconComponent(el.icon)" />
          </el-icon>
          <span>{{ el.name.split("_").join(" ") }}</span>
        </el-menu-item>
      </router-link>

      <el-sub-menu v-else :index="el.module_id">

        <template #title>
          <el-icon>
            <component :is="getIconComponent(el.icon)" />
          </el-icon>
          <span>{{ el.name.split("_").join(" ") }}</span>
        </template>

        <el-menu-item-group v-for="subModule in el.submodules">
          <router-link :to="{ name: subModule.route }">
            <el-menu-item :index="el.module_id + '-' + subModule.id">
              <el-icon>
                <component :is="getIconComponent(subModule.icon)" />
              </el-icon>
              <span>{{ subModule.name.split("_").slice(1).join(" ") }}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>

      </el-sub-menu>
    </div>

  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useModules } from '../store/modules.js'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const isCollapse = ref(false)
const modulesStore = useModules()
const { modules } = storeToRefs(modulesStore)

const getIconComponent = (iconName) => {
  return ElementPlusIconsVue[iconName] || ElementPlusIconsVue.QuestionFilled;
};

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