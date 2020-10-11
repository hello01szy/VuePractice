<template>
  <div class="article">
    <el-card class="box-card">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/article' }">文章管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" :model="form" label-width="80px" class="myform">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="已审核"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="Java" value="java"></el-option>
            <el-option label="Python" value="python"></el-option>
            <el-option label="C++" value="c++"></el-option>
            <el-option label="Android" value="android"></el-option>
            <el-option label="树莓派" value="cherry"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
    </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  name:'myarticle',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      currentPage4:4,
      value1:''
    }
  },
  methods:{
    onSubmit(){
      this.$message.success("创建成功")
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style>
.article{
  display: flex;
  justify-content: center;
}
.box-card{
  width: 100%;
  padding: 10px 20px;
}
.myform{
  margin-top: 20px;
}
</style>