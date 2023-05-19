<template>
  <div class="comment_area">
    <div class="publish_root_comment" v-show="store.user.id!==''">
      <h2>评论</h2>
      <el-avatar :src="store.user.icon" class="icon"/>
      <el-input
          class = "input_area"
          v-model="data.textarea"
          :rows="4"
          type="textarea"
          placeholder="输入评论"
      />
      <div class="action-box">
        <el-button @click="publishComment(0,0)">发表评论</el-button>
      </div>
    </div>
  </div>
  <h2>全部评论</h2>
  <div v-for="comment in data.comments">
    <div class="comment_list">
      <div class="comment_main">
        <el-avatar :src="comment.icon" class="icon"/>
        <el-text style="margin-right: 70%;">用户名：{{ comment.username }}</el-text>
        <el-text class="mx-1">发表时间:{{ comment.createTime }}</el-text>
        <div class="comment_content">
          <el-text>{{comment.comment}}</el-text>
        </div>
        <div class="comment_action-box">
          <el-text type="primary" @click="showInputArea(comment.id)">回复</el-text>
        </div>
        <div v-show="data.showIndex==comment.id" style="width: 100%;">
          <div style="width: 100%;padding-left: 4%;">
            <el-input
                v-model="data.textarea"
                :rows="2"
                type="textarea"
                placeholder="输入评论"
            />
          </div>
          <div style="padding-left: 90%">
            <el-button @click="publishComment(comment.id,comment.topId)">发表评论</el-button>
          </div>
        </div>
      </div>
      <div v-for="subComment in comment.children">
          <div class="children_list">
            <el-avatar :src="subComment.icon" class="icon"/>
            <el-text style="margin-right: 70%;">用户名：{{subComment.username }}</el-text>
            <el-text class="mx-1">发表时间:{{subComment.createTime}}</el-text>
            <div class="comment_content" v-show="subComment.pid===subComment.topId">
              <el-text>{{ subComment.comment }}</el-text>
            </div>
            <div class="comment_content" v-show="subComment.pid!==subComment.topId">
              <el-text>回复:@{{subComment.toUsername+subComment.comment }}</el-text>
            </div>
            <div class="comment_action-box">
              <el-text type="primary" @click="showInputArea(subComment.id)">回复</el-text>
            </div>
            <div v-show="data.showIndex==subComment.id">
              <div style="width: 100%;padding-left: 4%;">
                <el-input
                    v-model="data.textarea"
                    :rows="2"
                    type="textarea"
                    placeholder="输入评论"
                />
              </div>
              <div style="padding-left: 90%">
                <el-button @click="publishComment(subComment.id,subComment.topId)">发表评论</el-button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
import {addComments, getComments} from "@/api/comment";
import {usersStore} from "@/stores/userStore";
const props = defineProps(['article_id'])
const store = usersStore()
  const data = reactive({
    comments:[],
    showIndex:'0',
    textarea:"默认输入"
  });
  onBeforeMount(()=>{
    getComments(props.article_id).then(res=>{
      if(res.code==200){
        data.comments=res.data;
      }
    })
  })
  function showInputArea(id){
    data.textarea="默认输入";
    if(data.showIndex===id)
      data.showIndex=0;
    else
    data.showIndex=id;
  }
  function publishComment(pid,top_id){
    let comment = {
      articleId:props.article_id,
      comment:data.textarea,
      userId:store.user.id,
      pid:pid,
      topId:top_id
    }

    addComments(comment).then(res =>{

    })
  }
</script>
<style scoped>
.publish_root_comment{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}
h2{
  flex-basis: 100%;
  margin-bottom: 1%;
}
.input_area{
  width:70%;
  flex-grow: 1;
  margin-right: auto;
}
.icon{
  margin-right: 1%;
}
.action-box{
  margin-top: 1%;
  padding-left: 90%;
  flex-basis: 100%;
}
.comment_main{
  display: flex;
  flex-wrap: wrap;
}
.comment_content{
  flex-basis: 100%;
  padding-left: 4%;
}
.comment_action-box{
  flex-basis: 100%;
  padding-left: 4%;
}
.comment-box{
  display: flex;
}
.children_list{
  margin-left: 5%;
  /*flex-basis: 80%;*/
  /*background-color: #a0a5a8;*/
}
</style>
