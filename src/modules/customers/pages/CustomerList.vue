<template>
	<h1>Lista de Clientes</h1>
	<br />
	<el-button type="primary" size="large" plain @click="dialogFormVisible = true">
		Crear Cliente &nbsp;&nbsp;
		<el-icon>
			<UserFilled />
		</el-icon>
	</el-button>
	<br />
	<br />
	<el-table v-loading="isLoadingCustomers" empty-text="No hay datos" :data="filterTableData" style="width: 100%"
		:header-cell-style="{
			backgroundColor: '#89b3fd1c',
			color: '#303133c9',
			textAlign: 'center'
		}" :cell-style="{
			textAlign: 'center'
		}">
		<el-table-column label="Id" prop="id" />
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="llamadas" prop="calls">
			<template #default="scope">
				{{ scope.row.calls ?? 0 }}
			</template>
		</el-table-column>
		<el-table-column label="Pais" prop="country" />
		<el-table-column label="Ciudad" prop="city" />
		<el-table-column label="Ultima Llamada" prop="lastCall">
			<template #default="scope">
				Pendiente
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

	<el-dialog v-model="dialogFormVisible" title="Crear Cliente" width="800" custom-class="custom-dialog" center>
		<el-form :model="formCreate" class="custom-form" label-position="top">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="formCreate.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Pais" :label-width="formLabelWidth">
				<el-input v-model="formCreate.country" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Ciudad" :label-width="formLabelWidth">
				<el-input v-model="formCreate.city" type="text" autocomplete="off" />
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

	<el-dialog v-model="dialogFormVisibleEditUser" title="Editar cliente" width="800" custom-class="custom-dialog"
		center>
		<el-form class="custom-form" label-position="top" :model="formEdit">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="formEdit.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Pais" :label-width="formLabelWidth">
				<el-input v-model="formEdit.country" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Ciudad" :label-width="formLabelWidth">
				<el-input v-model="formEdit.city" type="text" autocomplete="off" />
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
import { request } from '../../../shared/service/http.js'
import * as ServiceCustomer from "../services/customer.js"

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const centerDialogVisible = ref(false)
const dialogFormVisibleEditUser = ref(false)
const search = ref('')
const isLoadingCustomers = ref(false)
const tableData = ref([])
const customerToDelete = ref(0)
const customerToEdit = ref(0)
const formCreate = reactive({
	name: '',
	country: '',
	city: ''
})
const formEdit = reactive({
	name: '',
	country: '',
	city: ''
})
const filterTableData = computed(() =>
	tableData.value.filter(
		(data) =>
			!search.value ||
			data.name.toLowerCase().includes(search.value.toLowerCase())
	)
)

onBeforeMount(async () => {
	await getCustomers()
})

const getCustomers = async () => {

	isLoadingCustomers.value = true
	const { data, error } = await request(() => ServiceCustomer.getCustomers(), false)
	if (!error) {
		tableData.value = data.data
		isLoadingCustomers.value = false
	}
	isLoadingCustomers.value = false
}

const getCustomer = async () => {

	const { data, error } = await request(() => ServiceCustomer.getCustomer(customerToEdit.value), false)
	if (!error) {
		formEdit["name"] = data.data.name
		formEdit["country"] = data.data.country
		formEdit["city"] = data.data.city
	}
}

const createCustomer = async () => {

	const { data, error } = await request(() => ServiceCustomer.createCustomer(formCreate), true)
	if (!error) {
		tableData.value.unshift(data.data)
		dialogFormVisible.value = false
		formCreate["name"] = ""
		formCreate["country"] = ""
		formCreate["city"] = ""
	}
}

const editCustomer = async (id: number) => {

	const { data, error } = await request(() => ServiceCustomer.editCustomer(id, formEdit), true)
	if (!error) {
		const index = tableData.value.findIndex((el) => el.id == id);
		tableData.value = tableData.value.filter((el) => el.id != id);
		if (index !== -1) tableData.value.splice(index, 0, data.data);
		dialogFormVisibleEditUser.value = false
		formEdit["name"] = ""
		formEdit["country"] = ""
		formEdit["city"] = ""
	}
}

const deleteCustomer = async (id: number) => {

	const data = await request(() => ServiceCustomer.deleteCustomer(id), true)
	if (!data.error) {
		tableData.value = tableData.value.filter((el) => el.id != id)
	}
}

const handleEdit = async (_index: number, row) => {
	customerToEdit.value = row.id
	await getCustomer()
	dialogFormVisibleEditUser.value = true
}

const handleDelete = (_index: number, row) => {
	customerToDelete.value = row.id
	centerDialogVisible.value = true
}

const handleConfirm = async () => {
	await deleteCustomer(customerToDelete.value)
	centerDialogVisible.value = false
}

const handleConfirmCreateUser = async () => {
	await createCustomer()
}

const handleConfirmEditUser = async () => {
	await editCustomer(customerToEdit.value)
}

</script>
