<template>
  <div class="left">
    <el-row class="tac">
      <el-col>
        <h5 class="mb-2">个人中心</h5>
        <el-menu
            default-active="1"
            class=""
            @select="handle"
        >
          <el-menu-item index="1">
            <el-icon></el-icon>
            <span>系统监控</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">信息设置</el-menu-item>
              <el-menu-item index="2-2">发布文章</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon></el-icon>
            <span>评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon></el-icon>
            <span>分类管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
  <div class="right">
    <router-view></router-view>
  </div>

</template>

<script setup>

import Header from "@/components/Header.vue";
import Editor from "@/components/Editor.vue";
import {useRouter} from "vue-router";
const router = useRouter();
const path = {
  '1':'',
  "2-1":"setting",
  '2-2':'editor',
  '4':'articleManager'
}
function handle(index,indexPath,item){
  router.push("/home/"+path[index])
}
</script >

<style scoped>
.left{
  display: flex;
  /*flex-grow: 1;*/
  width: 10%;
}
.tac{
  width: 100%;
}
.right{
  display: flex;
  /*flex-grow: 9;*/
  width: 90%;
  flex-wrap: wrap;
}
*{
  font-size: large;
}

</style>
