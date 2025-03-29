<template>
	<h1>Llamadas</h1>
	<br />

	<div style="display: flex; justify-content: center; flex-direction: column; width: 100%; align-items: center;">
		<div style="display: flex; gap: 10px;">
			<div>
				<p>Tipo de llamada </p>
				<el-select filterable v-model="filterRange" placeholder="Select" size="large" style="width: 440px">
					<el-option v-for="item, i in ['Psicologa', 'comeback', 'nuevo cliente']" :key="i" :label="item"
						:value="i" />
				</el-select>
			</div>
			<div>
				<p>Tarifa </p>
				<el-input class="input" v-model="filterRange" size="large" type="number" style="width: 100px" />
			</div>
			<div>
				<p>Tiempo (minutos) </p>
				<el-input class="input" v-model="filterRange" size="large" type="number" style="width: 150px" />
			</div>
		</div>

		<br />

		<div>
			<div>
				<p>Tarotista </p>
				<el-select filterable v-model="filterRange" placeholder="Select" size="large" style="width: 715px">
					<el-option v-for="item, i in ['Anais', 'Sofia', 'Rafael']" :key="i" :label="item" :value="i" />
				</el-select>
			</div>

			<br />

			<div>
				<p>Cliente </p>
				<el-select filterable v-model="filterRange" placeholder="Select" size="large" style="width: 715px">
					<el-option v-for="item, i in ['Luffy', 'Roronoa', 'Choper']" :key="i" :label="item" :value="i" />
				</el-select>
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
import Tag from "../../../shared/components/Tag.vue"

const filterRange = ref("")

</script>
