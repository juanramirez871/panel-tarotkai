<template>
	<h1>Lista de Usuarios</h1>
	<br />
	<el-button type="primary" plain @click="dialogFormVisible = true" size="large">
		Crear Usuario &nbsp;&nbsp;
		<el-icon>
			<UserFilled />
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
		<el-table-column label="Fecha de Creacion" prop="createdAt" >
			<template #default="scope">
				{{ DateFormat(scope.row.createdAt, 'DD MMM YYYY') }}
			</template>
		</el-table-column>
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="Extensión" prop="extension" />
		<el-table-column label="Rol" prop="role_id" />
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

	<el-dialog 
		v-model="dialogFormVisible" 
		title="Crear Usuario" 
		width="800" 
		custom-class="custom-dialog"
		center>
		<el-form :model="form" label-position="top" class="custom-form">
			<el-form-item label="Nombre">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Rol">
				<el-select v-model="form.region">
					<el-option label="Admin" value="shanghai" />
					<el-option label="Tarotista" value="beijing" />
					<el-option label="Central" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item label="Extensión">
				<el-input v-model="form.extension" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Contraseña">
				<el-input v-model="form.password" type="password" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisible = false" class="cancel-btn">Cancelar</el-button>
				<el-button type="primary" @click="handleConfirmCreateUser" class="confirm-btn">
					Crear
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisibleEditUser" title="Editar Usuario" width="800" center custom-class="custom-dialog">
		<el-form :model="form" class="custom-form">
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
			<el-form-item label="Contraseña" :label-width="formLabelWidth">
				<el-input v-model="form.name" type="text" autocomplete="off" />
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
import { computed, ref, reactive, onBeforeMount } from 'vue'
import { Search, UserFilled } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { request } from '../../../shared/service/http.js'
import * as Service from "../services/user"
import { DateFormat } from "../../../utils/dateFormat"

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
	password: '',
	extension: '',
})
const filterTableData = computed(() =>
	tableData.value.filter(
		(data) =>
			!search.value ||
			data.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
const handleEdit = (index: number, row) => {
	dialogFormVisibleEditUser.value = true
}

const handleDelete = (index: number, row) => {
	centerDialogVisible.value = true
}
const tableData = ref([])

onBeforeMount(async() => {
	await getAllUsers()
})

async function getAllUsers() {
	const { data, error } = await request(() => Service.getUsers(), false)
	if (!error) {
		tableData.value = data.data
	}
}

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

<style>
.custom-dialog {
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-form {
	padding: 20px;
}

.dialog-footer {
	text-align: right;
	padding: 10px 20px;
}
</style>