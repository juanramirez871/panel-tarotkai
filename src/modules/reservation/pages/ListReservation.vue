<template>
	<h1>Reservaciónes</h1>
	<br />

	<el-button type="primary" plain @click="() => dialogFormVisibleCreateReservation = true" size="large">
		Crear Reservacion &nbsp;&nbsp;
		<el-icon>
			<Calendar />
		</el-icon>
	</el-button>

	<br />
	<br />
	<h2>Filtros</h2>
	<br />
	<div style="display: flex; gap: 20px">
		<div>
			<p>Tarotistas </p>
			<el-select multiple filterable v-model="filterRange" placeholder="Select" size="large" style="width: 240px">
				<el-option v-for="item, i in ['Sofia', 'Anais', 'Rafel']" :key="i" :label="item" :value="i" />
			</el-select>
		</div>
		<div>
			<p>Centrales </p>
			<el-select multiple filterable v-model="filterRange" placeholder="Select" size="large" style="width: 240px">
				<el-option v-for="item, i in ['Juan', 'Cristian', 'Gabriel']" :key="i" :label="item" :value="i" />
			</el-select>
		</div>
		<div>
			<p>Estado </p>
			<el-select multiple filterable v-model="filterRange" placeholder="Select" size="large" style="width: 240px">
				<el-option v-for="item, i in ['Terminado', 'En Curso', 'Cancelado']" :key="i" :label="item"
					:value="i" />
			</el-select>
		</div>
		<div>
			<p>Fecha</p>
			<el-date-picker v-model="filterRange" type="daterange" unlink-panels range-separator="A"
				start-placeholder="Fecha inicial" end-placeholder="Fecha Final" size="large" />
		</div>
	</div>
	<br />
	<br />

	<div style="display: flex;gap: 20px;">
		<article class="postcard light blue min-card">
			<div class="postcard__text t-dark">
				<div style="display: flex; gap: 10px;align-items: top;">
					<h1 class="postcard__title yellow">Tarotista Rafael</h1>
					<p> reservacion <b>#1</b></p>
				</div>
				<br />
				<div>
					<p>Fecha de creación: <span><b>Martes Junio 2025 11: 05pm</b></span></p>
					<p>Fecha de reservación: <span><b>Lunes Abril 2025 24: 22pm</b></span></p>
					<p>Tiempo reservado: <span><b>30 Minutos</b></span></p>
					<p>Central: <span><b>Gabriel</b></span></p>
					<p>Estado: <span><b><el-tag type="primary">Terminado</el-tag></b></span></p>
					<br />
					<el-button type="info" @click="() => dialogFormVisibleEditReservation = true">
						Editar<el-icon class="el-icon--right">
							<Edit />
						</el-icon>
					</el-button>
					<el-button type="danger" @click="() => centerDialogVisible = true">
						Eliminar<el-icon class="el-icon--right">
							<CloseBold />
						</el-icon>
					</el-button>
				</div>
				<br />
			</div>
		</article>
		<article class="postcard light blue min-card">
			<div class="postcard__text t-dark">
				<div style="display: flex; gap: 10px;align-items: top;">
					<h1 class="postcard__title yellow">Tarotista Rafael</h1>
					<p> reservacion <b>#1</b></p>
				</div>
				<br />
				<div>
					<p>Fecha de creación: <span><b>Martes Junio 2025 11: 05pm</b></span></p>
					<p>Fecha de reservación: <span><b>Lunes Abril 2025 24: 22pm</b></span></p>
					<p>Tiempo reservado: <span><b>30 Minutos</b></span></p>
					<p>Central: <span><b>Gabriel</b></span></p>
					<p>Estado: <span><b><el-tag type="primary">Terminado</el-tag></b></span></p>
					<br />
					<el-button type="info" @click="() => dialogFormVisibleEditReservation = true">
						Editar<el-icon class="el-icon--right">
							<Edit />
						</el-icon>
					</el-button>
					<el-button type="danger" @click="() => centerDialogVisible = true">
						Eliminar<el-icon class="el-icon--right">
							<CloseBold />
						</el-icon>
					</el-button>
				</div>
				<br />
			</div>
		</article>
	</div>

	<el-dialog v-model="centerDialogVisible" title="Advertencia" width="500" align-center>
		<span>¿Deseas eliminar la reserva? esta accion no se puede devolver</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="centerDialogVisible = false">Cancelar</el-button>
				<el-button type="danger" @click="handleConfirm">
					Confirmar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisibleEditReservation" title="Editar Reservacion" width="800">
		<el-form :model="form">
			<el-form-item label="Reservación" :label-width="formLabelWidth">
				<el-date-picker style="width: 100%;" v-model="valueDatePicker" type="datetime"
					:default-time="defaultTime" />
			</el-form-item>
			<el-form-item label="Tiempo" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="number" placeholder="Minutos" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Tarotista" :label-width="formLabelWidth">
				<el-select v-model="form.region">
					<el-option label="Sofia" value="shanghai" />
					<el-option label="Rafael" value="beijing" />
					<el-option label="Anais" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item label="Estado" :label-width="formLabelWidth">
				<el-select v-model="form.region">
					<el-option label="Pendiente" value="shanghai" />
					<el-option label="En curso" value="beijing" />
					<el-option label="Terminado" value="beijing" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisibleEditReservation = false">Cancelar</el-button>
				<el-button type="primary" @click="handleConfirmEditReservation">
					Guardar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisibleCreateReservation" title="Crear Reservacion" width="800">
		<el-form :model="form">
			<el-form-item label="Reservación" :label-width="formLabelWidth">
				<el-date-picker style="width: 100%;" v-model="valueDatePicker" type="datetime"
					:default-time="defaultTime" />
			</el-form-item>
			<el-form-item label="Tiempo" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="number" placeholder="Minutos" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Tarotista" :label-width="formLabelWidth">
				<el-select v-model="form.region">
					<el-option label="Sofia" value="shanghai" />
					<el-option label="Rafael" value="beijing" />
					<el-option label="Anais" value="beijing" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisibleCreateReservation = false">Cancelar</el-button>
				<el-button type="primary" @click="handleConfirmCreateReservation">
					Crear
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { Calendar, CloseBold, Edit } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { ElNotification } from 'element-plus'

const formLabelWidth = '140px'
const filterRange = ref(1)
const dialogFormVisibleEditReservation = ref(false)
const dialogFormVisibleCreateReservation = ref(false)
const form = reactive({
	name: '',
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: '',
})
const centerDialogVisible = ref(false)
const valueDatePicker = ref('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const handleConfirm = () => {
	alert("Se elimino correctamente la reserva")
	centerDialogVisible.value = false
}
const handleConfirmEditReservation = () => {
	alert("Se edito la reserva correctamente")
	dialogFormVisibleEditReservation.value = false
}

const handleConfirmCreateReservation = () => {
	alert("Se creo la reserva correctamente")
	dialogFormVisibleCreateReservation.value = false
}

const alert = (message) => {
	ElNotification.success({
		title: 'Exitosamente',
		message: message,
		offset: 10,
	})
}
</script>

<style lang="scss" scoped>
$main-green: #79dd09 !default;
$main-green-rgb-015: rgba(121, 221, 9, 0.1) !default;
$main-yellow: #bdbb49 !default;
$main-yellow-rgb-015: rgba(189, 187, 73, 0.1) !default;
$main-red: #bd150b !default;
$main-red-rgb-015: rgba(189, 21, 11, 0.1) !default;
$main-blue: #0076bd !default;
$main-blue-rgb-015: rgba(0, 118, 189, 0.1) !default;

.min-card {
	min-width: 500px;
}

.dark {
	background: #110f16;
}


.light {
	background: #f3f5f7;
}

a,
a:hover {
	text-decoration: none;
	transition: color 0.3s ease-in-out;
}

#pageHeaderTitle {
	margin: 2rem 0;
	text-transform: uppercase;
	text-align: center;
	font-size: 2.5rem;
}

/* Cards */
.postcard {
	flex-wrap: wrap;
	display: flex;

	box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
	border-radius: 10px;
	margin: 0 0 2rem 0;
	overflow: hidden;
	position: relative;
	color: #ffffff;

	&.dark {
		background-color: #18151f;
	}

	&.light {
		background-color: #e1e5ea;
	}

	.t-dark {
		color: #18151f;
	}

	a {
		color: inherit;
	}

	h1,
	.h1 {
		margin-bottom: 0.5rem;
		font-weight: 500;
		line-height: 1.2;
	}

	.small {
		font-size: 80%;
	}

	.postcard__title {
		font-size: 1.45rem;
	}

	.postcard__img {
		max-height: 180px;
		width: 100%;
		object-fit: cover;
		position: relative;
	}

	.postcard__img_link {
		display: contents;
	}

	.postcard__bar {
		width: 50px;
		height: 10px;
		margin: 10px 0;
		border-radius: 5px;
		background-color: #424242;
		transition: width 0.2s ease;
	}

	.postcard__text {
		padding: 1.5rem;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.postcard__preview-txt {
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: justify;
		height: 100%;
	}

	.postcard__tagbox {
		display: flex;
		flex-flow: row wrap;
		font-size: 14px;
		margin: 20px 0 0 0;
		padding: 0;
		justify-content: center;

		.tag__item {
			display: inline-block;
			background: rgba(83, 83, 83, 0.4);
			border-radius: 3px;
			padding: 2.5px 10px;
			margin: 0 5px 5px 0;
			cursor: default;
			user-select: none;
			transition: background-color 0.3s;
		}
	}

	&:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image: linear-gradient(-70deg, #424242, transparent 50%);
		opacity: 1;
		border-radius: 10px;
	}
}


/* COLORS */

.green .postcard__bar {
	background-color: $main-green;
}

.green::before {
	background-image: linear-gradient(-30deg,
			$main-green-rgb-015,
			transparent 50%);
}

.green:nth-child(2n)::before {
	background-image: linear-gradient(30deg, $main-green-rgb-015, transparent 50%);
}

.postcard .postcard__tagbox .blue.play:hover {
	background: $main-blue;
}

.blue .postcard__bar {
	background-color: $main-blue;
}

.blue::before {
	background-image: linear-gradient(-30deg, $main-blue-rgb-015, transparent 50%);
}
</style>
