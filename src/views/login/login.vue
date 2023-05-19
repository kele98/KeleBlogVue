<template>
  <div class="body">
    <div class="main">
      <div class="left">
        <Switch @event="ReverseIsLogin"></Switch>
      </div>
      <div class="right">
        <sign-up v-show="isLogin"></sign-up>
        <sign-in v-show="!isLogin" :key="!isLogin"></sign-in>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from "@/components/login/switch.vue";
import SignUp from "@/components/login/signUp.vue";
import SignIn from "@/components/login/signIn.vue";
import {reactive, ref} from "vue";
export default {
  components: {
    Switch,
    SignUp,
    SignIn
  },
  setup(){
    const isLogin = ref(false);
    const ReverseIsLogin = () =>{
      console.log(isLogin.value)
      isLogin.value=!isLogin.value
    }
    return {
      isLogin,ReverseIsLogin
    }
  }

}


</script>
<style scoped >
*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  background-image: url('https://w.wallhaven.cc/full/l8/wallhaven-l8z6lq.png');
  background-position:50%;
  background-size:cover;
  color: #a0a5a8;
}

.main {
  display: flex;
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  /*box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;*/
  border-radius: 20px;
  overflow: hidden;
}
.left{
  width:300px;
  height: 100vh;
}
.right{
  width: 600px;
  height: 100vh;
}
@media (max-width: 1200px) {
  .main {
    transform: scale(0.7);
  }
}
@media (max-width: 1000px) {
  .main {
    transform: scale(0.6);
  }
}
@media (max-width: 800px) {
  .main {
    transform: scale(0.5);
  }
}
@media (max-width: 600px) {
  .main {
    transform: scale(0.4);
  }
}
</style>
