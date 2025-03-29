import { defineStore } from "pinia";

export const useErrors = defineStore('errors', {
	state: () => ({
		errors: []
	}),
	getters:{
		hasErrors: state => state.errors ? Object.keys(state.errors).length > 0 : false,
	},
	actions: {
		setErrors(errors){
			this.errors = errors;
		},
	},
})