<template>
    <div class="approval-text-container col-md-12">
        <span class="col-md-2 text-right">{{consdata[0].control_title}}</span>
        <div class="summernote col-md-10" id="summernote"></div>
    </div>
</template>

<script>
export default {
    props:['consdata'],
    data(){
        return{
            text:''
        }
    },
    mounted(){
        this.getSummernote()
        this.setNote()
    },
    methods:{
         getSummernote(){
            $('#summernote').summernote({
                tabsize: 2,
                height: 100,
                
            });
        },
        setNote(){
            if(this.text){
                $('#summernote').summernote('code', this.text);
            }else{
                $('#summernote').summernote('code', "");
            }
        },
        //获取富文本代码
        getNote(){
            var markupStr = $('#summernote').summernote('code');
            this.text = markupStr
        },
    }
}
</script>

<style>

</style>
