<template>
  <div class="listBlock">
    <div @click="gotoPage(data.id)" style="width: 100%">
      <h1>{{data.title}}</h1>
      <div v-html="data.content" class="html_content"></div>
    </div>
    <div class="content_class">
      <el-button type="primary"  class="content_button">SpringBoot</el-button>
      <el-button type="primary"  class="content_button">SpringSecurity</el-button>
      <el-button type="primary" class="content_button">源码</el-button>
    </div>
    <ul>
      <li>发布时间:{{data.createTime}}</li>
      <li>点击量:{{data.views}}</li>
    </ul>
    <el-divider></el-divider>
  </div>
</template>

<script setup>
  import router from "@/router";

  const props = defineProps({data:{}})
  function gotoPage(id){
    router.push({
      path:"/page/"+id
    })
  }
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.listBlock{
  display: flex;
  flex-wrap: wrap;
  /*background-color: bisque;*/
  width: 100%;
  padding: 0 25%;
}
h1{
  width: 100%;
  margin-right: auto;
}
.html_content{
  flex-grow: 1;
  /*height: 10%;*/
  width: 100%;
  min-height: 10vh;
  /*background-color: #222222;*/
  width: 100%;
  margin-bottom: 2%;
}
.content_class{
  flex-grow: 1;
  margin: 0;
 }
.content_button{
  margin: 0 1%;
  font-size: 1px;
}
@media screen and (max-width: 500px){
.content_class{
  display: none;
}
}
ul{
  /*width: 10vw;*/
  /*float: right;*/
  margin-left: 0.5vw;
  margin-right: 0;
  padding-left: 20%;
}
li{
  display: inline;
  margin: 0 0.5vw;
}
</style>
