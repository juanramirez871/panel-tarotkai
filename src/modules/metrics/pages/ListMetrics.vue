<template>
	<div style="height: 100%;">
		<h1>Metricas Generales</h1>
		<br />
		<div class="chart-container">
			<div style="width: 40%; height: 40%;">
				<Bar />
			</div>
			<div style="width: 40%; height: 30%;">
				<Bar />
			</div>
		</div>

		<br />
		<h1>Metricas de Centrales</h1>
		<br />

		<div class="chart-container">
			<div style="width: 30%; height: 300px;" v-for="central in ['juan', 'cristian', 'Gabriel', 'nicile']">
				<Line />
			</div>
		</div>

		<br />
		<h1>Metricas de Tarotistas</h1>
		<br />

		<div class="chart-container">
			<div style="width: 30%; height: 300px;" v-for="central in ['juan', 'cristian', 'Gabriel', 'nicile']">
				<Line />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Bar from '../components/Bar.vue';
import Line from '../components/Line.vue';


</script>


<style scoped>
.chart-container {
	width: 100% !important;
	justify-content: center;
	flex-wrap: wrap;
	display: flex;
	gap: 30px;
}
</style>