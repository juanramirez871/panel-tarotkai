<template>
	<h1>Lista de Usuarios</h1>
	<br />
	<el-button type="primary" plain @click="dialogFormVisible = true">
		Crear Usuario &nbsp;&nbsp;
		<el-icon>
			<UserFilled />
		</el-icon>
	</el-button>
	<el-table :data="filterTableData" style="width: 100%">
		<el-table-column label="Id" prop="id" />
		<el-table-column label="Fecha de Creacion" prop="createdAt" />
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="Extensión" prop="extencion" />
		<el-table-column label="Rol" prop="rol" />
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
		<span>¿Deseas eliminar el usuario? esta accion no se puede devolver</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="centerDialogVisible = false">Cancelar</el-button>
				<el-button type="danger" @click="handleConfirm">
					Confirmar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisible" title="Crear Usuario" width="800">
		<el-form :model="form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Rol" :label-width="formLabelWidth">
				<el-select v-model="form.region">
					<el-option label="Admin" value="shanghai" />
					<el-option label="Tarotista" value="beijing" />
					<el-option label="Central" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item label="Extensión" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="number" autocomplete="off" />
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

	<el-dialog v-model="dialogFormVisibleEditUser" title="Editar Usuario" width="800">
		<el-form :model="form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Rol" :label-width="formLabelWidth">
				<el-select v-model="form.region">
					<el-option label="Admin" value="shanghai" />
					<el-option label="Tarotista" value="beijing" />
					<el-option label="Central" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item label="Extensión" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="number" autocomplete="off" />
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

interface User {
	id: number
	createdAt: string
	name: string
	address: string
	extencion: string
	rol: string
}

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
})
const filterTableData = computed(() =>
	tableData.filter(
		(data) =>
			!search.value ||
			data.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
const handleEdit = (index: number, row: User) => {
	console.log(index, row)
	dialogFormVisibleEditUser.value = true
}
const handleDelete = (index: number, row: User) => {
	console.log(index, row)
	centerDialogVisible.value = true
}

const tableData: User[] = [
	{
		createdAt: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		extencion: "100",
		rol: "Admin",
		id: 1
	},
	{
		createdAt: '2016-05-02',
		name: 'John',
		address: 'No. 189, Grove St, Los Angeles',
		extencion: "100",
		rol: "Admin",
		id: 1
	},
	{
		createdAt: '2016-05-04',
		name: 'Morgan',
		address: 'No. 189, Grove St, Los Angeles',
		extencion: "100",
		rol: "Admin",
		id: 1
	},
	{
		createdAt: '2016-05-01',
		name: 'Jessy',
		address: 'No. 189, Grove St, Los Angeles',
		extencion: "100",
		rol: "Admin",
		id: 1
	},
]


const handleConfirm = () => {
	alert("Se elimino correctamente el usuario")
	centerDialogVisible.value = false
}

const handleConfirmCreateUser = () => {
	alert("Se creo el usuario correctamente")
	dialogFormVisible.value = false
}

const handleConfirmEditUser = () => {
	alert("Se edito el usuario correctamente")
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
