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
							<el-form-item label="编号">
								<span>{{user.name}}</span>
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
								<el-button type="primary" @click="onSubmit" size="mini">保存</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="avatorArea">
						<div class="box" @mouseenter="enter" @mouseleave="leave">
							<el-avatar shape="square" :size="200" :fit="fit" :src="user.photo"></el-avatar>
							<div :class="{fix:true, hide:hide}">
								<i class="el-icon-edit"></i>
							</div>
						</div>
					</div>
					<input id = 'chooseAvator' type="file" hidden>
				</el-col>
			</el-row>
		</el-card>
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
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
			fit: 'cover',
			hide:true
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
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
		transition: 0.9s;
	}
	.hide{
		display: none;
	}
	.el-icon-edit{
		color:#aaa
	}
	.box{
		height: 200px;
	}
</style>