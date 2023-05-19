<template>
  <div class="echarts-box">
    <div id="echarts_point" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script setup>
  import echarts from "@/echarts/echarts"
  import {onDeactivated, onMounted, onUnmounted, reactive, ref, watch} from "vue";
  import {getSystemData} from "@/api/system";
  const monitorData = reactive({
    data:{
      jvm:{
        total:0,
        used:0
      },
      mem:{
        total:0,
        usedMem:0
      },
      cpu:{
        free:0,
        used:0
      }
    }
  })
  const timer = ref(0)
  let chart;
  watch(monitorData,()=>{
    chart.setOption( {
      title:{
        text: '系统监控',
        subtext: '10s刷新一次',
        left: 'center'
      },
      graphic:{
        type:"group",
        left:"15%",
        top:"15%",
        children:[
          {
            type: 'text',// 文字
            z: 0,
            left: 0,
            top: 0,
            style: {
              fill: '#000000',
              text: 'JVM内存总量: '+monitorData.data.jvm.total+'MB',
              font: '14px Microsoft YaHei'
            }
          }
          ,{
          type: 'text',// 文字
          z: 0,
          left: 500,
          top: 0,
          style: {
            fill: '#000000',
            text: '内存总量: '+monitorData.data.mem.total+'GB',
            font: '14px Microsoft YaHei'
          }
        }
        ,{
            type: 'text',// 文字
            z: 0,
            left: 1050,
            top: 0,
            style: {
              fill: '#000000',
              text: 'Cpu线程数: '+monitorData.data.cpu.num,
              font: '14px Microsoft YaHei'
            }
          }
        ]
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'JVM内存信息',
          type: 'pie',
          radius: '50%',
          center: ['20%', '50%'],   //位置
          data: [
            { value: monitorData.data.jvm.used, name: '使用率' },
            { value: 100-monitorData.data.jvm.used, name: '空闲率' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: '系统内存信息',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],   //位置
          data: [
            { value: monitorData.data.mem.free, name: '空闲率' },
            { value: monitorData.data.mem.used, name: '占用率' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: 'cpu信息',
          type: 'pie',
          radius: '50%',
          center: ['80%', '50%'],   //位置
          data: [
            { value: monitorData.data.cpu.free, name: '空闲率' },
            { value: monitorData.data.cpu.used, name: '使用率' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
      ]
    });
  })
  onMounted(() =>{
    //先获取数据
    getMonitorData()
    //初始化echarts
    chart = echarts.init(document.getElementById("echarts_point"));
    window.onresize = function() {
      //自适应大小
      chart.resize();
    };
    timer.value = window.setInterval(getMonitorData,10000)
  })
  function getMonitorData(){
    getSystemData().then(res =>{
      if(res.code===200){
        monitorData.data = res.data
      }
    })
  }
  onUnmounted (()=>{ //离开当前组件的生命周期执行的方法
     window.clearInterval(timer.value);
    echarts.dispose;
  })
</script>

<style scoped>
.echarts-box{
  flex-grow: 1;
}
</style>
