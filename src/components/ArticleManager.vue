<template>
  <el-table
      ref="multipleTableRef"
      :data="data.list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="id" label="id"  />
    <el-table-column property="title" label="Name"  />
    <el-table-column property="createTime" label="发布时间" />
    <el-table-column property="updateTime" label="修改时间" />
    <el-table-column property="views" label="点击量" />
    <el-table-column>
      <template #default="scope">
        <el-button  @click="modify(scope.row)">修改</el-button>
      </template>
    </el-table-column>
    <el-table-column>
      <el-button>删除</el-button>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="selectAll">全选</el-button
    >
    <el-button @click="clearAll">清除</el-button>
  </div>
  <div class="pagination-block">
    <el-pagination layout="prev, pager, next" v-model:page-size="data.size" v-model:current-page="data.index" v-model:total="data.total" @current-change="updateArticle" />
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {getAllArticle} from "@/api/article";
import {ElTable} from "element-plus";
import {articleStore} from "@/stores/ArticleStores";
import {useRouter} from "vue-router";
//定义数据
const data = reactive({
    list:[],
    total:0,
    index:1,
    size:10,
})
const multipleTableRef = ref(null)
const router = useRouter();
onBeforeMount(() =>{
  updateArticle(1,data.size)
})
const handleSelectionChange = (val) => {
  console.log(val)
}
function selectAll(){
  multipleTableRef.value.toggleAllSelection()
}
function clearAll(){
  multipleTableRef.value.clearSelection()
}
function updateArticle(index,size){
  // debugger
  // console.log(1111111111111)
  getAllArticle(index,size).then(res =>{
    data.list=res.data.list
    data.total=res.data.total
  }).catch(err =>{
    console.log(err)
  })
}
function modify(article){
  articleStore().updateArticle(article.id,article.content,article.title)
  router.push("editor")
}
</script>

<style scoped>

</style>
