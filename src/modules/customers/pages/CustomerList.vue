<template>
	<h1>Lista de Clientes</h1>
	<br />
	<el-button type="primary" plain @click="dialogFormVisible = true">
		Crear Cliente &nbsp;&nbsp;
		<el-icon>
			<UserFilled />
		</el-icon>
	</el-button>
	<el-table :data="filterTableData" style="width: 100%">
		<el-table-column label="Id" prop="id" />
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="Identificacion" prop="extencion" />
		<el-table-column label="llamadas" prop="rol" />
		<el-table-column label="Pais" prop="address" />
		<el-table-column label="Ciudad" prop="createdAt" />
		<el-table-column label="Ultima Llamada" prop="lastestCall" />
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
		<span>¿Deseas eliminar el Cliente? esta accion no se puede devolver</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="centerDialogVisible = false">Cancelar</el-button>
				<el-button type="danger" @click="handleConfirm">
					Confirmar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisible" title="Crear Cliente" width="800">
		<el-form :model="form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Identificacion" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Pais" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Ciudad" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="¿Cliente Nuevo?" :label-width="formLabelWidth">
				<el-switch v-model="value2" class="ml-2" />
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

	<el-dialog v-model="dialogFormVisibleEditUser" title="Editar cliente" width="800">
		<el-form :model="form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Identificacion" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Pais" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Ciudad" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="¿Cliente Nuevo?" :label-width="formLabelWidth">
				<el-switch v-model="value2" class="ml-2" />
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
import { Search, UserFilled } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const centerDialogVisible = ref(false)
const value2 = ref(true)
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
		createdAt: 'San Juan',
		name: 'Tom',
		address: 'Puerto Rico',
		extencion: "1096065071",
		rol: "84",
		id: 1,
		lastestCall: "02-03-2025"
	},
	{
		createdAt: 'San Juan',
		name: 'John',
		address: 'Puerto Rico',
		extencion: "1096065071",
		rol: "84",
		id: 1,
		lastestCall: "02-03-2025"
	},
	{
		createdAt: 'San Juan',
		name: 'Morgan',
		address: 'Puerto Rico',
		extencion: "1096065071",
		rol: "84",
		id: 1,
		lastestCall: "02-03-2025"
	},
	{
		createdAt: 'San Juan',
		name: 'Jessy',
		address: 'Puerto Rico',
		extencion: "1096065071",
		rol: "84",
		id: 1,
		lastestCall: "02-03-2025"
	},
]


const handleConfirm = () => {
	alert("Se elimino correctamente el cliente")
	centerDialogVisible.value = false
}

const handleConfirmCreateUser = () => {
	alert("Se creo el cliente correctamente")
	dialogFormVisible.value = false
}

const handleConfirmEditUser = () => {
	alert("Se edito el cliente correctamente")
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
