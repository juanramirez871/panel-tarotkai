import { ElNotification } from 'element-plus'
import { useErrors } from "../store/errors";

export async function request(fn, notify) {
	let data = null;
	let error = null;
	try {
		const response = await fn()
		data = response.data
		const method = response.config.method
		const title = data?.title ?? 'Exito!';
		const type = data?.type ?? 'success';
		const message = data?.message;
		const isGet = method === 'get'
		const noNotify = isGet && !notify
		const notification = noNotify ? false : notify ?? true

		if (notification) {
			ElNotification({
				title,
				message,
				type
			})
		}


	} catch (e) {
		data = e.data;
		const title = e?.error?.tittle ?? e.response?.data?.title ?? 'Error!';
		const message = e?.error?.message ?? e.response?.data?.message ?? e.response?.data?.error ?? e?.message ?? e?.error?.error ?? e?.error ?? Object.values(e?.errors)?.[0]?.[0]

		if(e.response?.status == 422){
			ElNotification({ title: title, message: e.response?.data?.error, type: 'error', })
		}else{
			ElNotification({ title: title, message: message, type: 'error', })
		}

		const { setErrors } = useErrors();
		setErrors(e.errors);

		error = e;
	}
	return { data, error }
}
