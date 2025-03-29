<template>
	<h1>Reportes</h1>
	<br />

	<div style="width: 100%; overflow-x: hidden;">
		<el-table style="width: 100%" :data="tableData" :fit="true" flexible :header-cell-style="{
			backgroundColor: '#89b3fd1c',
			color: '#333',
			fontWeight: 'bold',
			textAlign: 'center'
		}" :cell-style="{
			textAlign: 'center'
		}">
			<el-table-column label="Fecha" prop="createdAt" sortable min-width="150" />
			<el-table-column label="Hora de llamada" prop="name" min-width="150" />
			<el-table-column label="Central" prop="extencion" min-width="150" />
			<el-table-column label="Tiempo comprado" sortable prop="tiempoComprado" min-width="200" />
			<el-table-column label="Hora de inicio" prop="horaInicio" min-width="150" />
			<el-table-column label="Hora de Corte" prop="horaCorte" min-width="150" />
			<el-table-column label="Tiempo realizado" prop="tiempoRealizado" min-width="150" />
			<el-table-column label="Estado consulta" prop="estadoConsulta" min-width="150" />
			<el-table-column label="País de llamada" prop="paisLlamada" min-width="150" />
			<el-table-column label="Ciudad de llamada" prop="ciudadLlamada" min-width="150" />
			<el-table-column label="Nombre cliente" prop="nombreCliente" min-width="150" />
			<el-table-column label="Tarotista" prop="tarotista" min-width="150" />
			<el-table-column label="Referido" prop="referido" min-width="150" />
			<el-table-column label="Notas" prop="notas" min-width="150" />
			<el-table-column label="Número id" prop="numeroId" min-width="150" />
			<el-table-column label="Valor de consulta" prop="valorConsulta" min-width="150" />
			<el-table-column label="Medio de pago" prop="medioPago" min-width="150" />
		</el-table>
	</div>
</template>

<script lang="ts" setup>
const tableData = [
	{
		id: 1,
		createdAt: "2025-03-28",
		name: "10:30 AM",
		extencion: "Central 1",
		tiempoComprado: "30 minutos",
		horaInicio: "10:35 AM",
		horaCorte: "11:05 AM",
		tiempoRealizado: "30 minutos",
		estadoConsulta: "Completada",
		paisLlamada: "México",
		ciudadLlamada: "Ciudad de México",
		nombreCliente: "Juan Pérez",
		tarotista: "Ana Sánchez",
		referido: "Sí",
		notas: "Consulta satisfactoria",
		numeroId: 12345,
		valorConsulta: "$50 USD",
		medioPago: "Tarjeta de crédito"
	},
	{
		id: 2,
		createdAt: "2025-03-27",
		name: "02:00 PM",
		extencion: "Central 2",
		tiempoComprado: "20 minutos",
		horaInicio: "02:10 PM",
		horaCorte: "02:30 PM",
		tiempoRealizado: "20 minutos",
		estadoConsulta: "Completada",
		paisLlamada: "Argentina",
		ciudadLlamada: "Buenos Aires",
		nombreCliente: "María Gómez",
		tarotista: "Carlos Ramírez",
		referido: "No",
		notas: "Consulta sobre el amor",
		numeroId: 67890,
		valorConsulta: "$40 USD",
		medioPago: "PayPal"
	},
	{
		id: 3,
		createdAt: "2025-03-26",
		name: "05:45 PM",
		extencion: "Central 3",
		tiempoComprado: "15 minutos",
		horaInicio: "05:50 PM",
		horaCorte: "06:05 PM",
		tiempoRealizado: "15 minutos",
		estadoConsulta: "Cancelada",
		paisLlamada: "España",
		ciudadLlamada: "Madrid",
		nombreCliente: "Luis Fernández",
		tarotista: "Beatriz Ortega",
		referido: "Sí",
		notas: "Consulta cancelada por el cliente",
		numeroId: 54321,
		valorConsulta: "$30 USD",
		medioPago: "Transferencia bancaria"
	}
];

</script>
