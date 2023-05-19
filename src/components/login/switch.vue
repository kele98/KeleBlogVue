<template>
  <div class="switch" id="switch-cnt">
  <div class="switch__circle"></div>
  <div class="switch__circle switch__circle--t"></div>
  <div class="switch__container" id="switch-c1">
    <h2 class="switch__title title">Welcome Back !</h2>
    <p class="switch__description description">没有账号？前去注册</p>
    <el-button class="switch__button button switch-btn" @click="change">注册</el-button>
  </div>
  <div class="switch__container is-hidden" id="switch-c2">
    <h2 class="switch__title title">Hello Friend !</h2>
    <p class="switch__description description">已有账号？前去登录</p>
    <el-button class="switch__button button switch-btn" @click="change">登录</el-button>
  </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])
function change() {
        const switchC1 = document.querySelector("#switch-c1");
        const switchC2 = document.querySelector("#switch-c2");
        const switchCircle = document.querySelectorAll(".switch__circle");
        const switchCtn = document.querySelector("#switch-cnt");
        switchCtn.classList.add("is-gx")
        setTimeout(function(){
          switchCtn.classList.remove("is-gx");
        }, 1500)
        switchCtn.classList.toggle("is-txr");
        switchCircle[0].classList.toggle("is-txr");
        switchCircle[1].classList.toggle("is-txr");
        switchC1.classList.toggle("is-hidden");
        switchC2.classList.toggle("is-hidden");
        emit('event');
}
</script>

<style scoped>
.is-hidden{
  opacity: 0;
  position: absolute;
  /*transition: 0.5s;*/
}
</style>
