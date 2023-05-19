
<template>
  <div class="container b-container" id="b-container">
      <h2 class="form_title title">Sign in to Website</h2>
      <div class="input_area">
        <el-text class="text">用户名:</el-text>
        <el-input class="form__input" type="text" placeholder="用户名" v-model="loginFrom.username"></el-input>
      </div>
      <div class="input_area">
        <el-text class="text">密码: </el-text>
        <el-input class="form__input" type="password" placeholder="密码" v-model.lazy="loginFrom.password"></el-input>
      </div>

      <div class="action_area">
        <a class="form__link">Forgot your password?</a>
        <el-button class="form__button button submit" @click="submit1">登录</el-button>
      </div>
  </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import {login,info} from "@/api/user";
import {setToken} from "@/utils/auth";
import {useRouter} from "vue-router";
import {usersStore} from "@/stores/userStore"
    const loginFrom = reactive({
      username:'',
      password:''
    })
    const router = useRouter()
    const store = usersStore()
    function submit1(){
      console.log('登录')
      login(loginFrom).then(res =>{
        if(res.data.token!=null){
          setToken(res.data.token);
          info().then(res =>{
            store.updateUser(res.data.id,res.data.username,res.data.icon)
            router.push('/')
          }).catch( err =>{
            console.log(err)
          })
        }
      }).catch( err =>{
        console.log(err)
      })
    }
</script>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
}
h2{
  width: 100%;
}
.input_area{
  width: 100%;
  display: flex;
}
.text{
  width: 10%;
}
.form__input{
  width: 40%;
  /*margin-right: 80%;*/
}
.action_area{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.action_area a{
  flex-grow: 1;
}
.action_area .form__button{
  /*flex-grow: 1;*/
}
</style>
