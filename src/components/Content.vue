<template>
  <div class="content">
    <List :data="key" v-for="key in data.list"></List>
    <div class="pagination-block">
      <el-pagination layout="prev, pager, next" v-model:page-size="data.size" v-model:current-page="data.index" v-model:total="data.total" @current-change="updateArticle" />
    </div>
  </div>
</template>
<script setup>
import List from "@/components/List.vue";
import {onBeforeMount, reactive, watch} from "vue";
import {getAllArticle} from "@/api/article";
  const data = reactive({
    list:[],
    index:1,
    size:10,
    total:0
  })
  //请求数据，加载文件
  onBeforeMount(() =>{
    updateArticle(1,data.size)
  })
  watch(()=> data.index,(index)=>{
    updateArticle(index,data.size)
})
  function updateArticle(index,size){
    getAllArticle(index,size).then(res =>{
      data.list=res.data.list
      data.total=res.data.total
    }).catch(err =>{
      console.log(err)
    })

  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.content{
  display: flex;
  justify-content: center;
  align-content: flex-start ;
  flex-direction:row;
  flex-wrap:wrap;
  width: 100%;
  background-color: white;
}
</style>
