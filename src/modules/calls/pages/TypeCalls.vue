<template>
	<h1>Lista de tipos de llamadas</h1>
	<br />
	<el-button type="primary" plain @click="isCreateDialogVisible = true" size="large">
		Crear Tipo De Llamada &nbsp;&nbsp;
		<el-icon>
			<Phone />
		</el-icon>
	</el-button>
	<br />
	<br />
	<el-table v-loading="isLoadingTypeCalls" :data="filteredTableData" style="width: 100%" empty-text="No hay datos"
		:header-cell-style="{
			backgroundColor: '#89b3fd1c',
			color: '#303133c9',
			textAlign: 'center'
		}" :cell-style="{
			textAlign: 'center'
		}">
		<el-table-column label="Id" prop="id" />
		<el-table-column label="Nombre" prop="name" />
		<el-table-column label="Descripción" prop="description" />
		<el-table-column label="Tiempo gratis" prop="free_time">
			<template #default="scope">
				{{ scope.row.free_time }} Minutos
			</template>
		</el-table-column>
		<el-table-column align="right">
			<template #header>
				<el-input v-model="searchQuery" style="width: 240px" size="large" placeholder="Buscar..."
					:suffix-icon="Search" />
			</template>
			<template #default="scope">
				<el-button size="large" @click="editCallType(scope.$index, scope.row)">
					Editar
				</el-button>
				<el-button size="large" type="danger" @click="deleteCallType(scope.$index, scope.row)">
					Eliminar
				</el-button>
			</template>
		</el-table-column>
	</el-table>

	<el-dialog v-model="isDeleteDialogVisible" title="Advertencia" width="800" align-center>
		<span>¿Deseas eliminar el tipo de llamada? Esta acción no se puede deshacer</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="isDeleteDialogVisible = false">Cancelar</el-button>
				<el-button type="danger" @click="confirmDeletion">
					Confirmar
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="isCreateDialogVisible" title="Crear Tipo de Llamada" width="800" custom-class="custom-dialog"
		center>
		<el-form :model="formToCreate" class="custom-form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="formToCreate.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Descripción" :label-width="formLabelWidth">
				<el-input v-model="formToCreate.description" type="textarea" :rows="3" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Tiempo Gratis" :label-width="formLabelWidth">
				<el-input v-model="formToCreate.free_time" placeholder="Minutos" type="number" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="isCreateDialogVisible = false">Cancelar</el-button>
				<el-button type="primary" @click="confirmCreateCallType">
					Crear
				</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog v-model="isEditDialogVisible" title="Editar Tipo de Llamada" width="800" custom-class="custom-dialog"
		center>
		<el-form :model="form" class="custom-form">
			<el-form-item label="Nombre" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Descripción" :label-width="formLabelWidth">
				<el-input v-model="form.description" type="textarea" :rows="3" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Tiempo Gratis" :label-width="formLabelWidth">
				<el-input v-model="form.free_time" placeholder="Minutos" type="number" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="isEditDialogVisible = false">Cancelar</el-button>
				<el-button type="primary" @click="confirmEditCallType">
					Guardar
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onBeforeMount } from 'vue'
import { Search, Phone } from '@element-plus/icons-vue'
import * as ServiceCalls from "../services/calls.js"
import { request } from '../../../shared/service/http.js'

const formLabelWidth = '140px'
const isCreateDialogVisible = ref(false)
const isLoadingTypeCalls = ref(false)
const isDeleteDialogVisible = ref(false)
const isEditDialogVisible = ref(false)
const searchQuery = ref('')
const typeCallToEdit = ref()
const typeCallToDelete = ref()
const form = reactive({
	name: '',
	description: '',
	free_time: null,
})
const formToCreate = reactive({
	name: '',
	description: '',
	free_time: null,
})
const filteredTableData = computed(() =>
	tableData.value.filter(
		(data) =>
			!searchQuery.value ||
			data.name.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
)

const editCallType = async (_index: number, row) => {
	await getTypeCall(row.id)
	typeCallToEdit.value = row.id
	isEditDialogVisible.value = true
}

const deleteCallType = (_index: number, row) => {
	typeCallToDelete.value = row.id
	isDeleteDialogVisible.value = true
}

const tableData = ref([])
const confirmDeletion = async () => {
	await deleteTypeCall()
	isDeleteDialogVisible.value = false
}

const confirmCreateCallType = async () => {
	await createTypeCall()
}

const confirmEditCallType = async () => {
	await editTypeCall()
}

onBeforeMount(async () => {
	await getTypesCalls()
})

async function getTypesCalls() {
	isLoadingTypeCalls.value = true
	const { data, error } = await request(() => ServiceCalls.getTypesCalls(), false)
	if (!error) {
		tableData.value = data.data
		isLoadingTypeCalls.value = false
	}
	isLoadingTypeCalls.value = false
}

async function getTypeCall(id: number) {
	const { data, error } = await request(() => ServiceCalls.getTypeCall(id), false)
	if (!error) {
		form['name'] = data.data.name
		form['description'] = data.data.description
		form['free_time'] = parseInt(data.data.free_time)
	}
}

async function createTypeCall() {
	const { data, error } = await request(() => ServiceCalls.createTypeCall(formToCreate), true)
	if (!error) {
		tableData.value.push(data.data)
		isCreateDialogVisible.value = false
		form['name'] = ''
		form['description'] = ''
		form['free_time'] = null
	}
}

async function deleteTypeCall() {
	const data = await request(() => ServiceCalls.deleteTypeCall(typeCallToDelete.value), true)
	if (!data.error) {
		tableData.value = tableData.value.filter((el) => el.id != typeCallToDelete.value)
	}
}

async function editTypeCall() {
	const { data, error } = await request(() => ServiceCalls.editTypeCall(typeCallToEdit.value, form), true)
	if (!error) {
		const index = tableData.value.findIndex((el) => el.id == typeCallToEdit.value);
		tableData.value = tableData.value.filter((el) => el.id != typeCallToEdit.value);
		if (index !== -1) tableData.value.splice(index, 0, data.data);
		isEditDialogVisible.value = false

		form['name'] = ''
		form['description'] = ''
		form['free_time'] = ''
	}
}

</script>