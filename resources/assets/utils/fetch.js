import axios from 'axios'
import qs from 'qs'
import config from '../js/config'

// import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json';
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = config.apiUrl;

//POST传参序列化
axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
    // _.toast("错误的传参", 'fail');
    toastr.error("错误的传参", 'fail')
	return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
	if (!res.data.success) {
		// _.toast(res.data.msg);
		return Promise.reject(res);
	}
	return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    toastr.error("错误的传参", 'fail')
	return Promise.reject(error);
});

export default function fetch(method = 'post', url, params) {
	return new Promise((resolve, reject) => {
		// axios.post(url, params)
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
