<template>
  <div class="editorContent">
    <el-text class="mx-1" type="primary" >文章标题</el-text>
    <el-input style="width:250px;"  placeholder="请输入文章标题" class="inputs" v-model="data.title" />
    <MdEditor ref="editorRef" v-model="data.content"  @onUploadImg="uploadImg" class="richEditor"/>
    <el-button type="primary" style="float: right" @click="dialogVisible = true" v-show="data.id==''">发布</el-button>
    <el-button type="primary" style="float: right" @click="dialogVisible = true" v-show="data.id!=''">修改</el-button>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <span v-show="data.id!=''">确定修改吗？</span>
    <span v-show="data.id==''">确定发布吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false;publish()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {saveArticle, updateArticle, uploadImage} from "@/api/article";
import {onActivated, onBeforeMount, onBeforeUnmount, onDeactivated, onMounted, onUnmounted, reactive, ref} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {ElMessage} from "element-plus";
import router from "@/router";
import {articleStore} from "@/stores/ArticleStores";
const data = reactive({
  id:'',
  content:"",
  title:"",
});
const dialogVisible = ref(false)
const editorRef = ref(null);

MdEditor.config({
  editorConfig: {
    // 输入渲染延迟，默认500ms。当仅预览模式时，未设置此项默认0ms
    renderDelay: 0
  }
});
//获取数据 如果是从修改页面过来的
onBeforeMount(() =>{
  data.id= articleStore().data.id
  data.content= articleStore().data.content
  data.title= articleStore().data.title
})
onBeforeUnmount(() =>{
  articleStore().reset()
})
function publish(){
  if(data.id==''){
    saveArticle(data).then(res =>{
      if(res.code==200){
        ElMessage("发布成功")
        router.push("/")
      }
    })
  }else {
    //修改文章
    updateArticle(data).then(res =>{
      if(res.code==200){
        ElMessage("修改成功")
        router.push("articleManager")
      }
    })
  }

}
  function uploadImg(files,callback){
    console.log("上传图片执行了")
    // 第一步.将图片上传到服务器.
    const formData = new FormData();
    for ( const file in files){
      formData.append("img",files[0]);
    }
    uploadImage(formData).then(res =>{
      callback(res.data)
    }).catch(err =>{
      console.log(err)
    })
  }

</script>

<style scoped>
.editorContent{
  /*background-color: darkgray;*/
  height: 80vh;
  width: 70%;
  margin: 0 15%;
}
.richEditor{
  width: 100%;
  height: 100%;
}

.inputs{
  position: relative;
  left: 0.5vw;
}
</style>
