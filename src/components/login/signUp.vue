<template>
  <div class="container a-container" id="a-container">
      <h2 class="form_title title">Create Account</h2>
    <div class="input_area">
      <el-text class="text">用户名:</el-text>
      <el-input class="form__input" type="text" placeholder="用户名" v-model="loginFrom.username"></el-input>
    </div>
    <div class="input_area">
      <el-text class="text">密码: </el-text>
      <el-input class="form__input" type="password" placeholder="密码" v-model.lazy="loginFrom.password"></el-input>
    </div>
    <div class="action_area">
      <el-button class="form__button button submit" @click="signup()">注册</el-button>
    </div>
  </div>
</template>

<script setup>
 import {signUp} from "@/api/user";
 import {reactive} from "vue";
 const loginFrom = reactive({
   username:'',
   password:''
 })
 function signup(){
   signUp(loginFrom).then(res =>{
      if(res.data.code==200){
        console.log("注册成功")
      }
   }).catch(err =>{
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
