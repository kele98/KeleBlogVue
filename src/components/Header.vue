<template>
  <div class="header" >
        <el-menu
            class="el-menu"
            mode="horizontal"
            :ellipsis="false"
            background-color="transparent"
        >
          <el-menu-item index="0" @click="router.push('/')">
            <h1>Kele`S BLOG</h1>
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">
            <el-input  placeholder="想搜些什么呢？" class="search"/>
          </el-menu-item>
          <el-menu-item index="2">
            <el-avatar
                src="https://kele-blog.oss-cn-beijing.aliyuncs.com/icon/default.png" v-show="store.user.icon==''"
                class="icon"
            />
            <el-avatar
                :src="store.user.icon"
                v-show="store.user.icon!=''"
                class="icon"
            />
          </el-menu-item>
          <el-menu-item index="3" v-show="store.user.username==''" >
            <h2 class="login" @click="router.push('/login')">请登录</h2>
          </el-menu-item>
          <el-sub-menu index="3" v-show="store.user.username!=''" >
            <template #title>
              <h2 class="login" @click="router.push('/home')">{{store.user.username}}
              </h2>
            </template>
            <el-menu-item index="3-1" @click="logout">login out</el-menu-item>
          </el-sub-menu>
        </el-menu>

    <div class="signature" style="text-align:center;color:white;">
      <h1>
        Nothing is impossible
      </h1>
    </div>
  </div>
</template>
<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {usersStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import {removeToken} from "@/utils/auth";
  const router = useRouter()
  const store = usersStore()
  // onBeforeMount()
  function logout(){
    store.reset();
    removeToken();
  }
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
*{
  color: white;
}
.header{
  /*flex-grow: 1;*/
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 30vh;
  background-image:url("https://files.dbnuo.com/wallpaper/wallhaven-96ymj1.webp");
  margin-bottom: 1%;
}
.el-menu {
  margin: 0 10%;
  width: 100%;
  height: 20%;
  border: none;
}
.el-menu-item{
  border: none !important;
  background-color: transparent !important;
}
.signature{
  height: 55%;
  width: 100%;
  padding-top: 4vh;
  /*margin-bottom: 50%;*/
}

</style>
