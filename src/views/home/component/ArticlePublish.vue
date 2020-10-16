<template>
  <div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>发布文章</el-breadcrumb-item>
			</el-breadcrumb>
			</div>
			<div>
				<el-form ref="publish-form" :model="form" label-width="80px" size="small" :rules="rules">
					<el-form-item label="标题" prop="title">
						<el-input v-model="form.title" class="input_title"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="form.channel_id" placeholder="请选择类型">
							<el-option v-for="(item, index) in channels" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="封面">
						<el-radio-group v-model="pic">
							<el-radio label="1">单图</el-radio>
							<el-radio label="3">三图</el-radio>
							<el-radio label="0">无图</el-radio>
							<el-radio label="-1">自动</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="内容">
						<el-input type="textarea" v-model="form.content"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onPublish('publish-form')">立即创建</el-button>
						<el-button @click="saveDraft('publish-form')">存为草稿</el-button>
					</el-form-item>
				</el-form>
			</div>
	</el-card>
	</div>
</template>

<script>
import { getArticleChannel, publishArticle } from '@/api/article'
export default {
	name:'ArticlePublish',
	data() {
      return {
        form: {
					title: '',
					channel_id: '',
					cover: {
						type:0,
						images:[]
					},
					content: ''
				},
				channels:[],
				pic:'',
				rules:{
						title: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
						{ min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
					],
				}
			}
	},
	methods:{
		onPublish(formname){
			this.$refs[formname].validate((valid) => {
				if(valid){
					publishArticle(this.form).then(res=>{
						this.$message.success('发布成功');
					}).catch(res=>{
						this.$message.info('发布失败');
					})
				}else{
					return false;
				}
			});
		},
		saveDraft(){
			
		},
		loadChannels(){
			getArticleChannel().then(res => {
				this.channels = res.data.data.channels;
			})
		}
	},
	created(){
		this.loadChannels();
	}
}
</script>

<style>
	.item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
	.input_title{
		width:50%;
	}
  .box-card {
    width: 100%;
  }
</style>