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
		<el-table-column label="Id" prop="idUser" />
		<el-table-column label="Fecha de Creacion" prop="createdAt">
			<template #default="scope">
				{{ DateFormat(scope.row.createdAt, 'DD MMM YYYY') }}
			</template>
		</el-table-column>
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="Extensión" prop="extension" />
		<el-table-column label="Rol" prop="roleName" />
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
				<el-button type="danger" @click="handleConfirmDelete">
					Confirmar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisible" title="Crear Usuario" width="800" custom-class="custom-dialog" center>
		<el-form :model="formCreate" label-position="top" class="custom-form">
			<el-form-item label="Nombre">
				<el-input v-model="formCreate.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Rol">
				<el-select placeholder="" v-model="formCreate.rolId">
					<el-option v-for="role in selectRoles" :label="role.name" :key="role.id" :value="role.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="Extensión">
				<el-input v-model="formCreate.extent" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Correo">
				<el-input v-model="formCreate.email" type="email" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Contraseña">
				<el-input v-model="formCreate.password" type="password" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisible = false" class="cancel-btn">Cancelar</el-button>
				<el-button type="primary" @click="createUser" class="confirm-btn">
					Crear
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogFormVisibleEditUser" title="Editar Usuario" width="800" center
		custom-class="custom-dialog">
		<el-form :model="formEdit" class="custom-form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="formEdit.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Rol" :label-width="formLabelWidth">
				<el-select placeholder="" v-model="formEdit.rolId">
					<el-option v-for="role in selectRoles" :label="role.name" :key="role.id" :value="role.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="Extensión" :label-width="formLabelWidth">
				<el-input v-model="formEdit.extent" type="number" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Correo" :label-width="formLabelWidth">
				<el-input v-model="formEdit.email" type="email" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Contraseña" :label-width="formLabelWidth">
				<el-input v-model="formEdit.password" type="text" autocomplete="off" />
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
import { computed, ref, onBeforeMount } from 'vue'
import { Search, UserFilled } from '@element-plus/icons-vue'
import { request } from '../../../shared/service/http.js'
import * as ServiceUser from "../services/user"
import * as ServiceRole from "../../privileges/services/role.js"
import { DateFormat } from "../../../utils/dateFormat"

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const centerDialogVisible = ref(false)
const dialogFormVisibleEditUser = ref(false)
const idUserToDelete = ref(null)
const idUserToEdit = ref(null)
const search = ref('')
const selectRoles = ref([])
const formEdit = ref({
	name: '',
	email: '',
	rolId: '',
	extent: '',
	password: null,
})
let formCreate = ref({
	name: '',
	email: '',
	rolId: '',
	extent: '',
	password: '',
})
const filterTableData = computed(() =>
	tableData.value.filter(
		(data) =>
			!search.value ||
			data.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
const handleEdit = async (_index: number, row) => {
	idUserToEdit.value = row.idUser
	await getUser(row.idUser)
	dialogFormVisibleEditUser.value = true
}

const handleDelete = (_index: number, row) => {
	idUserToDelete.value = row.idUser
	centerDialogVisible.value = true
}
const tableData = ref([])

onBeforeMount(async () => {
	await getAllUsers()
	await getAllRoles()
})

async function getAllUsers() {
	const { data, error } = await request(() => ServiceUser.getUsers(), false)
	if (!error) {
		tableData.value = data.data
	}
}

async function getAllRoles() {
	const { data, error } = await request(() => ServiceRole.getRoles(), false)
	if (!error) {
		selectRoles.value = data.data
	}
}

async function deleteUser(id) {
	const { data } = await request(() => ServiceUser.deleteUser(id), true)
	if (data) {
		tableData.value = tableData.value.filter((el) => el.idUser != id)
	}
}

async function getUser(id) {
	const { data, error } = await request(() => ServiceUser.getUser(id), false)
	if (!error) {
		formEdit.value = {
			name: data.data.name,
			email: data.data.email,
			rolId: data.data.role_id,
			extent: data.data.extension,
			password: null,
		}
	}
}

async function editUser(id) {
	const { data, error } = await request(() => ServiceUser.editUser(id, formEdit.value), true)
	if (!error) {
		const index = tableData.value.findIndex((el) => el.idUser == id);
		tableData.value = tableData.value.filter((el) => el.idUser != id);
		if (index !== -1) tableData.value.splice(index, 0, data.data);

		formEdit.value = {
			name: '',
			email: '',
			rolId: '',
			extent: '',
			password: '',
		}
		dialogFormVisibleEditUser.value = false
	}
}

async function createUser() {
	const { data, error } = await request(() => ServiceUser.createUser(formCreate.value), true)
	if (!error) {
		dialogFormVisible.value = false
		tableData.value.unshift(data.data)
		formCreate.value = {
			name: '',
			email: '',
			rolId: '',
			extent: '',
			password: '',
		}
	}
}

const handleConfirmDelete = () => {
	deleteUser(idUserToDelete.value)
	centerDialogVisible.value = false
}

const handleConfirmEditUser = () => {
	editUser(idUserToEdit.value)
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