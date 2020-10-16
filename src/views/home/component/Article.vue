<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/article' }">文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
      <el-form ref="form" :model="form" label-width="80px" class="myform">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">草稿</el-radio>
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="3">已审核</el-radio>
            <el-radio :label="4">审核失败</el-radio>
            <el-radio :label="5">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option v-for="(value, index) in channels" :key="index" :label="value.name" :value="value.id"></el-option>
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
    </el-card>
    <el-card class="resultCard">
      <div slot="header" class="clearfix" v-cloak>
        <span>共查找到{{total}}条数据</span>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          size="medium">
          <el-table-column
            label="封面"
            width="180">
            <template slot-scope="scope">
              <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="cover"/>
              <img v-else src="~@/assets/none.jpg" class="cover"/>
            </template>
            <img src="">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            label="状态"
            width="180">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="info">
                草稿
              </el-tag>
              <el-tag v-else-if="scope.row.status === 1" type="info">
                待审核
              </el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success">
                审核通过
              </el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="warning">
                审核失败
              </el-tag>
              <el-tag v-else-if="scope.row.status === 4" type="warning">
                删除
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="onEdit()"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="onDelete(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 40, 80, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    
  </div>
</template>

<script>
import { getArticleChannel, deleteArticles, getArticles } from '@/api/article'
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
      currentPage4:1,
      value1:'',
      tableData: [],
      dataSize:Number,
      total:0,
      pageSize:10,
      status:null,
      channels:[],
      channelId:null,
    }
  },
  methods:{
    onSubmit(){
      console.log(this.channelId)
      this.currentPage4 = 1
      this.articles();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.articles(val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.articles()
      console.log(`当前页: ${val}`);
    },
    articles(){
      getArticles({
        'page':this.currentPage4,
        'per_page':this.pageSize,
        'status':this.status,
        'channel_id':this.channelId
      }).then(res=>{
        this.dataSize = res.data.data.total_count;
        this.total = parseInt(this.dataSize);
        this.tableData = res.data.data.results;
        console.log(res.data.data)
      })
    },
    onDelete(articleId){
      this.$alert('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if(action === 'confirm'){
              deleteArticles(articleId.toString()).then(res=>{
              this.$message.success('删除成功');
              }).catch(res => {
                this.$message.info('删除失败');
              })
            }
          }
        });
    },
    onEdit(){
      this.$router.push('/home/publish');
    }
  },
  created(){
    this.articles();
    getArticleChannel().then(res=>{
      this.channels = res.data.data.channels;
    })
  }
}
</script>

<style>
.article{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.box-card{
  width: 96%;
  padding: 10px 20px;
}
.myform{
  margin-top: 20px;
}
.resultCard{
  margin-top: 10px;
}
.cover{
  width: 160px;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.page{
  display: flex;
  justify-content: center;
}
</style>