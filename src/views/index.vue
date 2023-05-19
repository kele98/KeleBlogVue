<template>
    <Header></Header>
<!--    <Editor></Editor>-->
<!--    <Content></Content>-->
<!--    <page></page>-->
  <router-view></router-view>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Editor from "@/components/Editor.vue";
import Content from "@/components/Content.vue";
import Page from "@/components/Page.vue";
</script>
<style scoped>
</style>
