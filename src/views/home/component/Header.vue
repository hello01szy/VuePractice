<template>
    <div class="header-container">
			<div class="title">
				<i class="el-icon-s-fold" @click="changePanel"></i>
				<span>vue-practice实战项目</span>
			</div>
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link abc">
					<img :src="profile.photo" alt="avator" class="avator">
					{{profile.name}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="info">个人信息</el-dropdown-item>
					<el-dropdown-item command="exit">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="30%">
				<span>确认退出登录吗？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="closeDialogWithOk">确 定</el-button>
				</span>
			</el-dialog>
    </div>
</template>
<script>
import { getProfile } from '../../../api/user'
import GlobalBus from '@/util/globalBus'
export default {
	name:'Header',
	data(){
		return {
			profile:'',
			isCollapse:false,
			dialogVisible:false
		}
	},
	methods:{
		changePanel(){
			this.isCollapse = !this.isCollapse;
			this.$emit('collapse', this.isCollapse)
		},
		handleCommand(command){
			if(command === 'exit'){
				this.dialogVisible = true;
			}else{
				this.$message('click ' + command)
			}
		},
		closeDialogWithOk(){
			this.dialogVisible = false;
			window.localStorage.removeItem('data');
			this.$router.push('/')
		}
	},
	created(){
		getProfile().then(res => {
			this.profile = res.data.data;
			GlobalBus.$on("changeInfo", (data)=>{
				console.log(data.name);
				this.profile.name = data.name
			})
		})
	},
}
</script>
<style lang="css">
	.title{
		width: 20%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.title i{
		font-size: 24px;
		margin-right: 10px;
	}
	.header-container{
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.avator{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 5px;
	}
	.abc{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>