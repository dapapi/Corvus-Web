import axios from 'axios'
import qs from 'qs'
import config from '../js/config'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json';
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + config.getAccessToken() || '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = config.apiUrl;

//POST传参序列化
axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
	// toastr.error("错误的传参", 'fail')
	const { response } = error
	// toastr.error(response.responseJSON.message);
	toastr.error(response.data.message);
	return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    if (res.status < 200 && res.status > 300) {
		return Promise.reject(res);
	}
	return res;
}, (error) => {
	const { response: { status } } = error
	const { response } = error
	if (status === 401) {
		config.getStatusCode()[401]()
	} else {
		toastr.error(response.data.message);
	}
	return Promise.reject(error);
});

export default function fetch(method = 'post', url, params) {
	return new Promise((resolve, reject) => {
		axios[method](url, params)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}
