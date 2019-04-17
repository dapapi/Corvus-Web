import axios from 'axios'
import qs from 'qs'
import env from '../assets/js/env'
// axios 配置
axios.defaults.timeout = 300000;
axios.defaults.headers.common['Accept'] = 'application/vnd.Corvus.v1+json';
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Location';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + env.getAccessToken() || '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = env.apiUrl;
const CancelToken = axios.CancelToken
const source = CancelToken.source()
//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post' || config.method === 'put') {
        let flag = true
        for (const key in config.data) {
            if (Array.isArray(config.data[key]) && config.data[key].length === 0) {
                flag = false
                break
            }
        }
        if(flag == true){
            config.data = qs.stringify(config.data);
        }
    }
    return config;
}, (error) => {
    const {response} = error
    toastr.error(response.data.message);
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    if (res.status < 200 && res.status > 300) {
        
        return Promise.reject(res);
    } else if (res.status_code < 200 && res.status_code > 300){
        
        return Promise.reject(res);
    }else{}
    
    return res;
},(error) => {
    if (String(error).indexOf('timeout') !== -1){
        toastr.error('请求超时请稍后重试');
    } else {
        toastr.error(response.data.message);
    }
        return Promise.reject(error);
})
    

export default function fetch(method = 'post', url, params, token = '') {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token
    }
    return new Promise((resolve, reject) => {
        axios[method](url, method.toLowerCase() === 'get' ? {params} : params)
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
