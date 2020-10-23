<template>
  <div ref="main" class="main">
    粉丝管理
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// 基于准备好的dom，初始化echarts实例
export default {
  name:'Fans',
  mounted(){
    var myChart = echarts.init(this.$refs.main);
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
  }
}
</script>

<style>
  .main{
    width:300px;
    height: 300px;
  }
</style>