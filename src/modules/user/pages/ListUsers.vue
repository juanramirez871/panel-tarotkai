<template>
	<h1>Lista de Usuarios</h1>
	<br />
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

	<el-dialog v-model="centerDialogVisible" title="Advertencia" width="500" align-center>
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
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

interface User {
	id: number
	createdAt: string
	name: string
	address: string
	extencion: string
	rol: string
}

const centerDialogVisible = ref(false)
const search = ref('')
const filterTableData = computed(() =>
	tableData.filter(
		(data) =>
			!search.value ||
			data.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
const handleEdit = (index: number, row: User) => {
	console.log(index, row)
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
	open()
	centerDialogVisible.value = false
}

const open = () => {
	ElNotification.success({
		title: 'Exitosamente',
		message: 'Se elimino correctamente el usuario',
		offset: 10,
	})
}
</script>
