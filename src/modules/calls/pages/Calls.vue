<template>
	<h1>Llamadas</h1>
	<br />
  
	<div style="display: flex; justify-content: center; flex-direction: column; width: 100%; align-items: center;">
	  <div style="display: flex; gap: 10px;">
		<div>
		  <p>Tipo de llamada </p>
		  <el-select v-if="array.length" v-model="callType" placeholder="Select" size="large" style="width: 440px">
			<el-option v-for="(item, i) in array" :key="i" :label="item" :value="i" />
		  </el-select>
		</div>
		<div>
		  <p>Tarifa </p>
		  <el-input class="input" v-model="rate" size="large" type="number" style="width: 100px" />
		</div>
		<div>
		  <p>Tiempo (minutos) </p>
		  <el-input class="input" v-model="time" size="large" type="number" style="width: 150px" />
		</div>
	  </div>
  
	  <br />
  
	  <div>
		<div>
		  <p>Tarotista </p>
		  <el-select v-if="array.length" filterable v-model="tarotista" placeholder="Select" size="large" style="width: 715px">
			<el-option v-for="(item, i) in array" :key="i" :label="item" :value="i" />
		  </el-select>
		</div>
  
		<br />
  
		<div>
		  <p>Cliente </p>
		<el-select v-if="array.length" filterable v-model="cliente" placeholder="Select" size="large" style="width: 715px">
			<el-option v-for="(item, i) in array" :key="i" :label="item" :value="i" />
		  </el-select>
		</div>
  
		<br />
  
		<div>
		  <p>Nota de la llamada</p>
		  <el-input type="textarea" :rows="2" v-model="callNote" />
		</div>
	  </div>
  
	  <br />
  
	  <el-button type="warning" plain style="width: 715px;" size="large">
		Cliente no registrado
	  </el-button>
  
	  <br />
  
	  <el-button type="primary" plain style="width: 715px;" size="large">
		Crear llamada
	  </el-button>
	</div>
  
	<br />
	<h1>Tarotistas disponibles</h1>
	<br />
  
	<div style="display: flex;">
	  <Tag />
	  <Tag />
	  <Tag />
	  <Tag />
	</div>
  </template>
  
  <script lang="ts" setup>
	import { ref } from 'vue'
	import { ElSelect, ElOption } from 'element-plus'; 
	import Tag from "../../../shared/components/Tag.vue"

	
	const array = ref<string[]>(["luffy", "zoro", "nami", "sanji"])
	const callType = ref<number>(1)
	const rate = ref<number | null>(null)
	const time = ref<number | null>(null)
	const tarotista = ref<number | null>(null)
	const cliente = ref<number | null>(null)
	const callNote = ref<string>("")
  </script>
  