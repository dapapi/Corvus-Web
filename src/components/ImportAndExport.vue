<template>
    <span>
        <span v-if="type === 'export'" @click="exportFile">
            <slot></slot>
        </span>
        <span v-if="type === 'import'" style="width:100%">
            <form v-if="this.importPower === 'true'" action="" style="display:inline-block;width:100%;height:34px;" >
                <input type="file" :id="`import_${this.getRandom}`" name="avatar" accept=".xlsx" style="display:none" @change="importFile($event)">
                <label :for="`import_${this.getRandom}`" style="width:100%">
                <slot></slot>
                </label>
            </form>
            <label v-else @click="unImport" style="width:100%">
                <slot></slot>
            </label>
        </span>
    </span>
</template>
<script>
 import {mapState} from 'vuex'
import axios from 'axios'
import env from '../assets/js/env'
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
        },
        //获取导出和导入的权限模块名称
        power:{
            type:String,
            // required:true
        }
    },
    
    data(){
        return {
          getRandom:Math.round(Math.random() * 1000),
          file:'',
          header:env.getHeaders(),
          importPower:'false',
          exportPower:'false',
          route:''
        }
    },
    computed:{
        ...mapState([
            'listPower'
        ])
    },
    mounted(){
        this.route = this.$route.path
    },
    watch:{
        //第一次加载判断是否有权限列表
        listPower:function(){
            this.importPower = this.listPower[this.power].import
            this.exportPower = this.listPower[this.power].export  
        },
        //路由跳转重新赋值权限
        route:function(){
            if(JSON.stringify(this.listPower)!=='{}'){
                this.importPower = this.listPower[this.power].import
                this.exportPower = this.listPower[this.power].export   
            }
        }
    },
    methods:{
        //没有导入权限
        unImport:function(){
            toastr.error('您没有导入权限，请确认');
        },
        //导入
        importFile:function(event){
            
            this.header['Content-Type'] = 'multipart/form-data;boundary = ' + new Date().getTime()
            this.file = event.target.files[0];
            let importUrl = `${env.apiUrl}/${this.moduleName}/import`
            let formData = new FormData();
            formData.append('file', this.file);
            //创建一个干净的axios对象
            var instance = axios.create();
            this.$emit('importFile')
            instance.defaults.headers = this.header
            instance.post(importUrl, formData)
            .then(function (response) {
               toastr.success('导入成功')
               this.$emit('reload')//导入成功刷新数据
            })
            .catch(function (error) {
                const {response: {status}} = error
                const {response} = error
                if (status === 401) {
                    env.getStatusCode()[401]()
                } else if (status === 422) {
                    const errors = response.data.errors
                    const errInfoArr = Object.keys(errors)
                    if (errInfoArr.length > 0) {
                        toastr.error(errors[errInfoArr[0]]);
                    } else {
                        toastr.error(response.data.message);
                    }
                } else if (status === 403) {
                    
                    toastr.error(response.data.message)
                } else {
                    toastr.error(response.data.message);
                }
            });
            
        },
        //导出
        exportFile:function(){
            
            if(this.exportPower==="false"){
                toastr.error('您没有导出权限，请确认');
                return false
            }
            var xhh = new XMLHttpRequest();
            //导出参数
            let getParams = []
            let _this = this
            if(this.params){
                //客户里边的参数必须传数组
               for (const key in this.params) {
                   if(this.params[key] instanceof Array){
                       if(this.params[key].length>0){
                          if(this.moduleName == 'clients'){
                              for (let i = 0; i < this.params[key].length; i++) {
                                  getParams.push(`${key}[]=${this.params[key][i]}`)
                              }
                          }else{
                              getParams.push(`${key}=${this.params[key]}`)
                          }
                       }
                   }else if(this.params[key]){
                       getParams.push(`${key}=${this.params[key]}`)
                   }else{}
               }
            }
            getParams = getParams.join('&')
            var page_url = `${env.apiUrl}/${this.moduleName}/export?${getParams}`
            xhh.open("post", page_url)
            xhh.setRequestHeader('Accept', 'application/vnd.Corvus.v1+json')
            xhh.setRequestHeader('Authorization', `Bearer ${env.getAccessToken() || ''}`)
            // xhh.responseType = 'blob'
            xhh.onreadystatechange = function () {
                if (xhh.readyState === 4 && xhh.status === 200) {
                        var filename = xhh.getResponseHeader("Content-disposition")
                        filename = decodeURI(filename)
                        filename = filename.split("filename*=utf-8''")[1]
                        var blob = new Blob([xhh.response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
                        var csvUrl = URL.createObjectURL(blob)
                        var link = document.createElement('a')
                        link.href = csvUrl
                        link.download = filename
                        link.click()
                }else if(xhh.readyState === 4&&xhh.status == 403){
                    
                    let str =  _this.toChineseWords(xhh.response);
                    toastr.error(str)
                }
            };
            xhh.send();
        },
        toChineseWords:function(data){
            data = data.split("\\u");
            var str ='';
            for(var i=0;i<data.length;i++){
                str+=String.fromCharCode(parseInt(data[i],16).toString(10));
            }
            return str;
        }
    }
}
</script>

