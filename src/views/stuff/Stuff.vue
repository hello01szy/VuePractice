<template>
  <div>
		<el-card class="box-card">
  		<div slot="header" class="clearfix">
    		<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>素材管理</el-breadcrumb-item>
				</el-breadcrumb>
  		</div>
			<StuffManage  />
		</el-card>
	</div>
</template>

<script>
const StuffManage = () => import('./components/StuffManage')
export default {
	name:'Stuff',
	components:{
		StuffManage
	}
}
</script>

<style>
</style>