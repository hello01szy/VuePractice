<template>
  <div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>用户设置</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-row :gutter="10">
				<el-col :span="12">
					<div>
						<el-form ref="user" :model="user" label-width="80px">
							<el-form-item label="编号">
								<span>{{user.id}}</span>
							</el-form-item>
							<el-form-item label="姓名">
								<el-input type="input" size="medium" v-model="user.name"></el-input>
							</el-form-item>
							<el-form-item label="手机">
								<span>{{user.mobile}}</span>
							</el-form-item>
							<el-form-item label="email">
								<span>{{user.email}}</span>
							</el-form-item>
							<el-form-item label="个人介绍">
								<el-input type="textarea" v-model="user.intro"></el-input>
							</el-form-item>
							 <el-form-item>
								<el-button :loading="btnLoading" type="primary" @click="onSubmit" size="mini">保存</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="avatorArea">
						<div class="box" @mouseenter="enter" @mouseleave="leave">
							<el-avatar shape="square" :size="200" :fit="fit" :src="user.photo"></el-avatar>
							<div :class="{fix:true, hide:hide}">
								<i class="el-icon-edit" @click='toggleShow'></i>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%">
			<div class="block">
				<el-image
					style="width: 100px; height: 100px"
					:src="avatorUrl"
					fit="cover">
				</el-image>
			</div>
		</el-dialog>
			<my-upload field="img"
						@crop-success="cropSuccess"
						@crop-upload-success="cropUploadSuccess"
						@crop-upload-fail="cropUploadFail"
						v-model="show"
				:width="300"
				:height="300"
				img-format="png"></my-upload>
  </div>
</template>

<script>
import 'babel-polyfill';
import { getProfile, uploadAvator, updateUser } from '@/api/user'
import globalBus from '@/util/globalBus'
import myUpload from 'vue-image-crop-upload';
export default {
	name:'Profile',
	data() {
		return {
			user: {
				name: '',
				email: '',
				mobile: '',
				photo: '',
				intro:''
			},
			btnLoading:false,
			fit: 'cover',
			hide:true,
			dialogVisible:false,
			avatorUrl:'',
			show: false,
			blobdata:{}
		}
	},
	components:{
		'my-upload':myUpload
	},
	methods: {
		toggleShow() {
			this.show = !this.show;
		},
		cropSuccess(imgDataUrl, field){
			console.log('-------- crop success --------');
			this.imgDataUrl = imgDataUrl;
			this.user.photo = imgDataUrl;
		},
		cropUploadSuccess(jsonData, field){
			console.log('-------- upload success --------');
			console.log(jsonData);
			console.log('field: ' + field);
		},
		cropUploadFail(status, field){
			console.log('-------- upload fail --------');
			console.log(status);
			console.log('field: ' + field);
		},
		onSubmit() {
			this.btnLoading = true;
			const {name, email, intro} = this.user
			updateUser({
				name,
				intro,
				email
			}).then(res=>{
				this.btnLoading = false;
				globalBus.$emit('changeInfo', this.user);
				this.$message.success('更新成功')
			}).catch(res=>{
				this.btnLoading = false
				this.$message.error('更新失败');
			})
		},
		enter(e){
			this.hide = false;
		},
		leave(e){
			this.hide = true;
		},
		loadProfile(){
			getProfile().then(res=>{
				this.user = res.data.data;
			}).catch(res=>{
				this.$message.warn('获取用户信息异常');
			})
		}
	},
	created(){
		this.loadProfile();
	}
}
</script>

<style>
.text {
    font-size: 14px;
  }

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
  .box-card {
    width: 100%
  }
	.avatorArea{
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.fix{
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
		height: 30px;
		width: 200px;
		background-color: #44444466;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.hide{
		display: none;
	}
	.el-icon-edit{
		color:#00a0ff;
		cursor: pointer;
	}
	.box{
		height: 200px;
	}
</style>