<template>
	<h1>Lista de Privilegios</h1>
	<br />
	<div class="flex gap-2">
		<el-tag v-for="role in roles" class="tag" :key="role.id" closable :disable-transitions="false"
			@close="handleClose(role.id)" @click="setActiveRole(role)">
			<p style="cursor: pointer;">{{ role.name }}</p>
		</el-tag>
		<el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" size="large"
			@keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
		<el-button v-else class="button-new-tag tag" size="large" @click="showInput">
			+ Nuevo Rol
		</el-button>
	</div>

	<div v-if="activeRole.id">
		<div style="text-align: center;">
			<br />
			<h1>Privilegios de {{ activeRole.name }}</h1>
			<br />
		</div>

		<center>
			<el-tag @click="setActiveModule(module)" class="tag" style="cursor: pointer;" v-for="module in modules"
				:class="{ 'active-tag': activeModule === module[0] }" :key="module[1]['idModule']" type="primary"
				size="large" effect="ligth">
				{{ module[0] }}
			</el-tag>
			<h3 v-if="!activeModule">Selecciona un modulo</h3>
		</center>

		<div style="display: flex; flex-direction: column; align-items: center;" v-if="activeModule">
			<br>
			<h2>Permisos Generales</h2>
			<ul class="tg-list">
				<li class="tg-list-item center-tag" v-for="privilege in privilegesModule.privileges">
					<h4>{{ privilege.name }}</h4>
					<input @click="handleCheckPrivileges(privilege)" v-model="privilege.check" class="tgl tgl-skewed"
						:id="'cb3' + privilege.idPrivilege" type="checkbox" />
					<label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON"
						:for="'cb3' + privilege.idPrivilege"></label>
				</li>
			</ul>
			<div style="display: flex; flex-direction: column; align-items: center;"
				v-if="privilegesModule.subModules.length > 0">
				<br>
				<br>
				<div class="content-permission">
					<div v-for="submodules in privilegesModule.subModules">
						<h2 class="title-role">{{ submodules.name.split('_').join(' ') }}</h2>
						<ul style="justify-content" class="tg-list">
							<li class="tg-list-item center-tag" v-for="privilege in submodules.privileges">
								<h4>{{ privilege.name }}</h4>
								<input @click="handleCheckPrivileges(privilege)" v-model="privilege.check"
									class="tgl tgl-skewed" :id="'cb3' + privilege.idPrivilege" type="checkbox" />
								<label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON"
									:for="'cb3' + privilege.idPrivilege"></label>
							</li>
						</ul>
						<br>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="flex items-center justify-center h-100%">
			<el-empty description="No se ha seleccionado un rol" />
			<center>
				<h1>Selecciona un Rol</h1>
			</center>
		</div>
	</div>

	<el-dialog v-model="centerDialogVisible" title="Advertencia" width="500" align-center>
		<span>¿Deseas eliminar el rol? esta accion no se puede devolver</span>
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
import { nextTick, onBeforeMount, ref } from 'vue'
import type { InputInstance } from 'element-plus'
import { request } from '../../../shared/service/http.js'
import * as ServiceRole from "../../privileges/services/role.js"
import * as ServiceModule from "../../privileges/services/module.js"

const inputValue = ref('')
const activeRole = ref({
	id: null,
	name: ''
})
const activeModule = ref()
const roleToDelete = ref('')
const roles = ref([])
const privilegesModule: any = ref({})
const modules = ref([])
const centerDialogVisible = ref(false)
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()

onBeforeMount(async () => {

	await getAllRoles()
})

const handleClose = (tag) => {
	roleToDelete.value = tag
	centerDialogVisible.value = true
}

const handleConfirm = async () => {
	await deleteRole(roleToDelete.value)
	centerDialogVisible.value = false
}

const showInput = () => {
	inputVisible.value = true
	nextTick(() => {
		InputRef.value!.input!.focus()
	})
}

const handleInputConfirm = async () => {
	if (inputValue.value) {
		await createRole({ name: inputValue.value })
	}
	inputVisible.value = false
	inputValue.value = ''
}

async function setActiveRole(role) {
	if (role.name != activeRole.value.name) activeModule.value = null
	activeRole.value = role
	await getModulesWithPrivileges()
}

function setActiveModule([name, data]) {
	activeModule.value = name
	privilegesModule.value = data
}

async function getAllRoles() {
	const { data, error } = await request(() => ServiceRole.getRoles(), false)
	if (!error) {
		roles.value = data.data
	}
}

async function getModulesWithPrivileges() {
	const { data, error } = await request(() => ServiceModule.getModules(activeRole.value.id), false)
	if (!error) {
		modules.value = Object.entries(data.data)
	}
}

async function createRole(payload) {
	const { data, error } = await request(() => ServiceRole.createRoles(payload), true)
	if (!error) {
		roles.value.push(data.data)
	}
}

async function deleteRole(id: number | string) {
	const data = await request(() => ServiceRole.deleteRole(id), true)
	if (!data.error) {
		roles.value = roles.value.filter((el) => el.id != id)
	}
}

const handleCheckPrivileges = async (privilege) => {
	await request(() => ServiceModule.changePrivilegeRole(activeRole.value.id, privilege.idPrivilege), true)
}

</script>

<style scoped>
.title-role {
	text-align: center;
	background: #dfe2e775;
	border-radius: 5px;
	width: 100%;
}

.content-permission {
	display: flex;
	gap: 20px;
	justify-content: center;
	align-content: center;
	flex-wrap: wrap;
}

.center-tag {
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.tag {
	transition: all 0.3s ease, color 0.3s ease;
}

.active-tag {
	background-color: rgba(20, 128, 237, 0.62) !important;
	color: #fff !important;
	border-color: rgba(168, 207, 248, 0.62) !important;
}

.tag {
	margin: 15px;
	font-size: 20px;
	padding: 15px;
}

ul,
li {
	list-style: none;
	margin: 0;
	padding: 0;
}

.tg-list {
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.tg-list-item {
	margin: 30px;
}

h2 {
	color: #777;
}

h4 {
	color: #999;
}

.tgl {
	display: none;
}

.tgl,
.tgl:after,
.tgl:before,
.tgl *,
.tgl *:after,
.tgl *:before,
.tgl+.tgl-btn {
	box-sizing: border-box;
}

.tgl::-moz-selection,
.tgl:after::-moz-selection,
.tgl:before::-moz-selection,
.tgl *::-moz-selection,
.tgl *:after::-moz-selection,
.tgl *:before::-moz-selection,
.tgl+.tgl-btn::-moz-selection {
	background: none;
}

.tgl::selection,
.tgl:after::selection,
.tgl:before::selection,
.tgl *::selection,
.tgl *:after::selection,
.tgl *:before::selection,
.tgl+.tgl-btn::selection {
	background: none;
}

.tgl+.tgl-btn {
	outline: 0;
	display: block;
	width: 4em;
	height: 2em;
	position: relative;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.tgl+.tgl-btn:after,
.tgl+.tgl-btn:before {
	position: relative;
	display: block;
	content: "";
	width: 50%;
	height: 100%;
}

.tgl+.tgl-btn:after {
	left: 0;
}

.tgl+.tgl-btn:before {
	display: none;
}

.tgl:checked+.tgl-btn:after {
	left: 50%;
}

.tgl-light+.tgl-btn {
	background: #f0f0f0;
	border-radius: 2em;
	padding: 2px;
	transition: all 0.4s ease;
}

.tgl-light+.tgl-btn:after {
	border-radius: 50%;
	background: #fff;
	transition: all 0.2s ease;
}

.tgl-light:checked+.tgl-btn {
	background: #9FD6AE;
}

.tgl-ios+.tgl-btn {
	background: #fbfbfb;
	border-radius: 2em;
	padding: 2px;
	transition: all 0.4s ease;
	border: 1px solid #e8eae9;
}

.tgl-ios+.tgl-btn:after {
	border-radius: 2em;
	background: #fbfbfb;
	transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
}

.tgl-ios+.tgl-btn:hover:after {
	will-change: padding;
}

.tgl-ios+.tgl-btn:active {
	box-shadow: inset 0 0 0 2em #e8eae9;
}

.tgl-ios+.tgl-btn:active:after {
	padding-right: 0.8em;
}

.tgl-ios:checked+.tgl-btn {
	background: #86d993;
}

.tgl-ios:checked+.tgl-btn:active {
	box-shadow: none;
}

.tgl-ios:checked+.tgl-btn:active:after {
	margin-left: -0.8em;
}

.tgl-skewed+.tgl-btn {
	overflow: hidden;
	transform: skew(-10deg);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	transition: all 0.2s ease;
	font-family: sans-serif;
	background: #888;
}

.tgl-skewed+.tgl-btn:after,
.tgl-skewed+.tgl-btn:before {
	transform: skew(10deg);
	display: inline-block;
	transition: all 0.2s ease;
	width: 100%;
	text-align: center;
	position: absolute;
	line-height: 2em;
	font-weight: bold;
	color: #fff;
	text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

.tgl-skewed+.tgl-btn:after {
	left: 100%;
	content: attr(data-tg-on);
}

.tgl-skewed+.tgl-btn:before {
	left: 0;
	content: attr(data-tg-off);
}

.tgl-skewed+.tgl-btn:active {
	background: #888;
}

.tgl-skewed+.tgl-btn:active:before {
	left: -10%;
}

.tgl-skewed:checked+.tgl-btn {
	background: #86d993;
}

.tgl-skewed:checked+.tgl-btn:before {
	left: -100%;
}

.tgl-skewed:checked+.tgl-btn:after {
	left: 0;
}

.tgl-skewed:checked+.tgl-btn:active:after {
	left: 10%;
}

.tgl-flat+.tgl-btn {
	padding: 2px;
	transition: all 0.2s ease;
	background: #fff;
	border: 4px solid #f2f2f2;
	border-radius: 2em;
}

.tgl-flat+.tgl-btn:after {
	transition: all 0.2s ease;
	background: #f2f2f2;
	content: "";
	border-radius: 1em;
}

.tgl-flat:checked+.tgl-btn {
	border: 4px solid #7FC6A6;
}

.tgl-flat:checked+.tgl-btn:after {
	left: 50%;
	background: #7FC6A6;
}

.tgl-flip+.tgl-btn {
	padding: 2px;
	transition: all 0.2s ease;
	font-family: sans-serif;
	perspective: 100px;
}

.tgl-flip+.tgl-btn:after,
.tgl-flip+.tgl-btn:before {
	display: inline-block;
	transition: all 0.4s ease;
	width: 100%;
	text-align: center;
	position: absolute;
	line-height: 2em;
	font-weight: bold;
	color: #fff;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	border-radius: 4px;
}

.tgl-flip+.tgl-btn:after {
	content: attr(data-tg-on);
	background: #02C66F;
	transform: rotateY(-180deg);
}

.tgl-flip+.tgl-btn:before {
	background: #FF3A19;
	content: attr(data-tg-off);
}

.tgl-flip+.tgl-btn:active:before {
	transform: rotateY(-20deg);
}

.tgl-flip:checked+.tgl-btn:before {
	transform: rotateY(180deg);
}

.tgl-flip:checked+.tgl-btn:after {
	transform: rotateY(0);
	left: 0;
	background: #7FC6A6;
}

.tgl-flip:checked+.tgl-btn:active:after {
	transform: rotateY(20deg);
}
</style>