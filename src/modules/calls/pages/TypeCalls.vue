<template>
	<h1>Lista de tipos de llamadas</h1>
	<br />
	<el-button type="primary" plain @click="dialogFormVisible = true" size="large">
		Crear Tipo De Llamada &nbsp;&nbsp;
		<el-icon>
			<Phone />
		</el-icon>
	</el-button>
	<br />
	<br />
	<el-table :data="filterTableData" style="width: 100%" :header-cell-style="{
		backgroundColor: '#89b3fd1c',
		color: '#303133c9',
		textAlign: 'center'
	}" :cell-style="{
		textAlign: 'center'
	}">
		<el-table-column label="Id" prop="id" />
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="Descripcion" prop="description" />
		<el-table-column label="Tiempo gratis" prop="freeTime" />
		<el-table-column prop="timeActive" label="Activo" width="150" filter-placement="bottom-end">
			<template #default="scope">
				<el-tag type="success" style="margin: 3px;" v-for="timeActive in scope.row.timesActive"
					disable-transitions>{{
						timeActive
					}}</el-tag>
			</template>
		</el-table-column>
		<el-table-column align="right">
			<template #header>
				<el-input v-model="search" style="width: 240px" size="large" placeholder="Buscar..."
					:suffix-icon="Search" />
			</template>
			<template #default="scope">
				<el-button size="small" @click="handleEdit(scope.$index, scope.row)">
					Editar
				</el-button>
				<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
					Eliminar
				</el-button>
			</template>
		</el-table-column>
	</el-table>

	<el-dialog v-model="centerDialogVisible" title="Advertencia" width="800" align-center>
		<span>¿Deseas eliminar el tipo de llamada? esta accion no se puede devolver</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="centerDialogVisible = false">Cancelar</el-button>
				<el-button type="danger" @click="handleConfirm">
					Confirmar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisible" title="Crear Tipo de Llamada" width="800">
		<el-form :model="form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Descripción" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Tiempo Gratis" :label-width="formLabelWidth">
				<el-input v-model="form.name" placeholder="Minutos" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Activo" :label-width="formLabelWidth">
				<el-select v-model="form.active" multiple placeholder="">
					<el-option v-for="item, i in form.options" :key="i" :label="item" :value="item" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisible = false">Cancelar</el-button>
				<el-button type="primary" @click="handleConfirmCreateUser">
					Crear
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisibleEditUser" title="Editar Tipo de Llamada" width="800">
		<el-form :model="form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Descripción" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Tiempo Gratis" :label-width="formLabelWidth">
				<el-input v-model="form.name" placeholder="Minutos" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Activo" :label-width="formLabelWidth">
				<el-select v-model="form.active" multiple placeholder="">
					<el-option v-for="item, i in form.options" :key="i" :label="item" :value="item" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisibleEditUser = false">Cancelar</el-button>
				<el-button type="primary" @click="handleConfirmEditUser">
					Guardar
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { Search, Phone } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const centerDialogVisible = ref(false)
const dialogFormVisibleEditUser = ref(false)
const search = ref('')
const form = reactive({
	name: '',
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: '',
	active: 1,
	options: ["Dias Normales", "lunes", "martes", "fin de mes"]
})
const filterTableData = computed(() =>
	tableData.filter(
		(data) =>
			!search.value ||
			data.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
const handleEdit = (index: number, row) => {
	console.log(index, row)
	dialogFormVisibleEditUser.value = true
}
const handleDelete = (index: number, row) => {
	console.log(index, row)
	centerDialogVisible.value = true
}

const tableData = [
	{
		createdAt: '2016-05-03',
		name: 'Psicólogia',
		address: 'No. 189, Grove St, Los Angeles',
		description: "es un servicio que la jefa ofrece totalmente gratis en la línea para que cualquier cliente lo pueda utiliza",
		rol: "Admin",
		id: 1,
		freeTime: "20M",
		timesActive: ["Dias normales", "lunes", "fin de mes"]
	},
	{
		createdAt: '2016-05-02',
		name: 'Nuevo Cliente',
		address: '',
		description: "cliente nuevo que llame a la línea de le obsequia 10 minutos",
		rol: "Admin",
		id: 1,
		freeTime: "40M",
		timesActive: ["dias sin promicion", "lunes", "fin de mes"]
	},
	{
		createdAt: '2016-05-04',
		name: 'Referido',
		address: '',
		description: "es un obsequio de 10 minutos a los clientes que refieren a un cliente nuevo ",
		rol: "Admin",
		id: 1,
		freeTime: "10M",
		timesActive: ["fines de semana", "lunes", "fin de mes"]
	},
	{
		createdAt: '2016-05-01',
		name: 'Repetición',
		address: 'No. 189, Grove St, Los Angeles',
		description: "si el cliente llama más de dos veces con el mismo tarotistas",
		rol: "Admin",
		id: 1,
		freeTime: "60M",
		timesActive: ["martes", "lunes", "fin de mes"]
	},
]


const handleConfirm = () => {
	alert("Se elimino correctamente el tipo de llamada")
	centerDialogVisible.value = false
}

const handleConfirmCreateUser = () => {
	alert("Se creo el tipo de llamada correctamente")
	dialogFormVisible.value = false
}

const handleConfirmEditUser = () => {
	alert("Se edito el tipo de llamada correctamente")
	dialogFormVisibleEditUser.value = false
}

const alert = (message) => {
	ElNotification.success({
		title: 'Exitosamente',
		message: message,
		offset: 10,
	})
}
</script>
