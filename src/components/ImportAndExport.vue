<template>
    <span>
        <span v-if="type === 'export'" @click="exportFile">
            <slot></slot>
        </span>
        <span v-if="type === 'import'" style="width:100%">
            <form action="" style="display:inline-block;width:100%" >
                <input type="file" :id="`import_${this.getRandom}`" name="avatar" accept=".xlsx" style="display:none" @change="importFile($event)">
                <label :for="`import_${this.getRandom}`" style="width:100%">
                <slot></slot>
                </label>
            </form>
        </span>
    </span>
</template>
<script>
import axios from 'axios'
import config from '../assets/js/config'
import fetch from '../assets/utils/fetch.js'
//导入和导出调通的模块只有 客户
export default {
    name:'ImportAndExport',
    props:{
        //模块名称
        moduleName:{
            type:String,
            required:true,
        },
        //import 导入 export 导出
        type:{
            type:String,
            required:true
        },
        //导出需要传递的参数
        params:{
            type:Object
        }
    },
    data(){
        return {
          getRandom:Math.round(Math.random() * 1000),
          file:'',
          header:config.getHeaders()
        }
    },
    mounted(){
    },
    methods:{
        //导入
        importFile:function(event){
            this.header['Content-Type'] = 'multipart/form-data;boundary = ' + new Date().getTime()
            this.file = event.target.files[0];
            let importUrl = `${config.apiUrl}/${this.moduleName}/import`
            let formData = new FormData();
            formData.append('file', this.file);
            //创建一个干净的axios对象
            var instance = axios.create();
            instance.defaults.headers = this.header
            instance.post(importUrl, formData)
            .then(function (response) {
               toastr.success('导入成功')
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        //导出
        exportFile:function(){
            var xhh = new XMLHttpRequest();
            //导出参数
            let getParams = []
            if(this.params){
               for (const key in this.params) {
                   if(this.params[key]){
                       getParams.push(`${key}=${this.params[key]}`)
                   }
               }
            }
            getParams = getParams.join('&')
            var page_url = `${config.apiUrl}/${this.moduleName}/export?${getParams}`
            xhh.open("GET", page_url)
            xhh.setRequestHeader('Accept', 'application/vnd.Corvus.v1+json')
            xhh.setRequestHeader('Authorization', `Bearer ${config.getAccessToken() || ''}`)
            xhh.responseType = 'blob'
            xhh.onreadystatechange = function () {
                if (xhh.readyState === 4 && xhh.status === 200) {
                    var filename = xhh.getResponseHeader("Content-disposition")
                        // console.log(filename)
                        filename = decodeURI(filename)
                        filename = filename.split("filename*=utf-8''")[1]
                    var blob = new Blob([xhh.response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
                    var csvUrl = URL.createObjectURL(blob)
                    var link = document.createElement('a')
                    link.href = csvUrl
                    link.download = filename
                    link.click()
                }
            };
            xhh.send();
        }
    }
}
</script>

