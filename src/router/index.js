import { createRouter, createWebHistory } from 'vue-router'
import login from "@/views/login/login.vue";
import index from "@/views/index.vue"
import Editor from "@/components/Editor.vue";
import {getToken} from "@/utils/auth";
import Header from "@/components/Header.vue";
import Page from "@/components/Page.vue";
import Content from "@/components/Content.vue";
import Home from "@/views/Home.vue";
import {usersStore} from "@/stores/userStore";
import {info} from "@/api/user";
import Monitor from "@/components/Monitor.vue";
import Usersetting from "@/components/Usersetting.vue";
import ArticleManager from "@/components/ArticleManager.vue";
const routes = [
  {
    path: '/',
    component: index,
    meta:{
      auth:false
    },
    children:[
      {
        path: '',
        component: Content,
        meta: {
          auth: false
        }
      },
      {
        path: 'page/:id',
        component: Page,
        meta:{
          auth:false
        }
      }
    ]
  },
  {
    path: '/login',
    component: login,
    meta:{
      auth:false
    }
  },
  {
    path: '/home',
    component: Home,
    meta:{
      auth:true
    },
    children: [
      {
        path: '',
        component: Monitor,
      },
      {
        path: 'editor',
        component: Editor,
      },
      {
        path: 'setting',
        component: Usersetting,
      },
      {
        path: 'articleManager',
        component: ArticleManager,
      },
    ]
  },

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from,next) => {
  //如果存在用户auth就更新用户信息
  const token = getToken();
  if(token!=null) {
    //更新下用户信息
    if (usersStore().user.id === '') {
      info().then(res => {
        if (res.code === 200) {
          usersStore().updateUser(res.data.id, res.data.username, res.data.icon)
        }
      })
    }
  }
  if(to.meta.auth==true&&token==null){
    router.push('/login')
  }else {
    next()
  }
})

export default router
