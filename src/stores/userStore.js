import {defineStore} from "pinia";
import {reactive, ref} from "vue";
export const usersStore = defineStore('usersStore', () =>{
    //这里需要用ref函数创建对象 直接创建对象更新的话ui不会变
    const user = reactive({
        id:'',
        username:'',
        icon:''
    })
    function updateUser(id,username,icon) {
        user.id=id;
        user.username=username;
        user.icon=icon;
    }
    function reset(){
        user.id='';
        user.username='';
        user.icon='';
    }
    //导出数据让外部访问
    return { user, updateUser,reset }
})
