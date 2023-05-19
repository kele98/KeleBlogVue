<template>
  <div class="page">
      <h1>{{data.page.title}}</h1>
    <MdEditor ref="editorRef" v-model="data.page.content" previewOnly class="richEditor"/>
      <Comment :article_id="id" ></Comment>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {getArticle} from "@/api/article";
import Comment from "@/components/Comment.vue";
let commentShow = false;
const data = reactive({
  page:{}
})
const id = useRoute().params.id;
const editorRef = ref(null);
//根据id获取文章数据
onBeforeMount(() =>{
  getArticle(id).then(res =>{
    if(res.code==200){
      data.page=res.data;
      commentShow=true;
    }
  })
})

</script>

<style scoped>
.page{
  width: 100%;
  padding: 0 25%;
}
</style>
