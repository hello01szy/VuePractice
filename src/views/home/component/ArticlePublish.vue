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
					<el-form-item label="内容" class="editor" prop="content">
						<quill-editor ref="text" v-model="form.content" class="myQuillEditor" :options="editorOption" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onPublish('publish-form')">提交</el-button>
						<el-button @click="saveDraft('publish-form')">存为草稿</el-button>
					</el-form-item>
				</el-form>
			</div>
	</el-card>
	</div>
</template>

<script>
import { getArticleChannel, publishArticle, queryArticles, updateArticle } from '@/api/article'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
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
				editorOption:{
					modules:{
						toolbar:[
							['bold', 'italic', 'underline', 'strike'],        // toggled buttons
							['blockquote', 'code-block'],
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
							[{ 'direction': 'rtl' }],                         // text direction

							[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

							[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
							[{ 'font': [] }],
							[{ 'align': [] }],
							['link', 'image']
						]
					},
					placeholder:'请输入...'
				},
				channels:[],
				pic:'',
				rules:{
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
						{ min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
					],
					content:[
						{ required: true, message: '请输入内容', trigger: 'blur' }
					]
				}
			}
	},
	components: {
    quillEditor
  },
	methods:{
		onPublish(formname){
			this.$refs[formname].validate((valid) => {
				if(valid){
					if(this.$route.query.id){
						updateArticle(this.$route.query.id, this.form).then(res=>{
							this.$message.success('修改成功');
						}).catch(e=>{
							this.$message.info(e)
						})
					}
					else{
						publishArticle(this.form).then(res=>{
							this.$message.success('发布成功');
						}).catch(res=>{
							this.$message.info('发布失败');
						})
					}
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
		if(this.$route.query.id){
			queryArticles(this.$route.query.id).then(res=>{
				this.form = res.data.data;
			});
		}
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
	.editor{
		height: 400px;
	}
	.myQuillEditor{
		height: 400px;
	}
	.myQuillEditor .ql-container{
		height: 350px;
	}
</style>