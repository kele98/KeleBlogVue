<template>
  <el-form :model="form.user" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="form.user.username" disabled/>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="form.user.password" />
    </el-form-item>
    <el-form-item>
      <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/sysUser/uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img style="width: 80px;height: 80px" v-if="form.user.icon" :src="form.user.icon" class="avatar" />
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import {info, updateUser} from "@/api/user";
const form = reactive({
  user:{}
})
const originUrl = ref('');
function cancel(){
  if(originUrl.value!='')
  form.user.icon=originUrl.value;
  form.user.password='';
}
onBeforeMount( () =>{
  info().then(res =>{
    if(res.code==200){
      form.user.username = res.data.username
      form.user.password = res.data.password
      form.user.icon = res.data.icon
    }

  })
})
const onSubmit = () => {
  updateUser(form.user).then(res =>{
    if(res.code==200){
      ElMessage.success("修改成功")
    }
  })
}
function handleAvatarSuccess(res,file,files){
  if(res.code==200){
    originUrl.value=form.icon;
    form.user.icon=res.data;
  }
}
function beforeAvatarUpload(rawFile){
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>

</style>
