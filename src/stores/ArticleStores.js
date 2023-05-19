import {defineStore} from "pinia";
import {reactive} from "vue";
export const articleStore = defineStore('articleStore', () =>{
    //这里需要用ref函数创建对象 直接创建对象更新的话ui不会变
    const data = reactive({
        id:'',
        content:"",
        title:"",
    })
    function updateArticle(id,content,title) {
        data.id=id;
        data.content=content;
        data.title=title;
    }
    function reset(){
        data.id='';
        data.content='';
        data.title='';
    }
    //导出数据让外部访问
    return { data, updateArticle,reset }
})
