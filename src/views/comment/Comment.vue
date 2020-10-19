<template>
  <div class="container">
		<el-card class="box-card">
  		<div slot="header" class="clearfix">
    		<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>评论管理</el-breadcrumb-item>
				</el-breadcrumb>
  		</div>
  		<el-table
				:data="tableData"
				style="width: 100%"
				class="table">
				<el-table-column
					prop="title"
					label="标题">
				</el-table-column>
				<el-table-column
					prop="total_comment_count"
					label="总评论数">
				</el-table-column>
				<el-table-column
					prop="fans_comment_count"
					label="粉丝评论数">
				</el-table-column>
				<el-table-column
					prop="comment_status"
					label="状态">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.comment_status">开启</el-tag>
						<el-tag type="warn" v-else>关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-switch
							@change="commentOperation(scope.row)"
							v-model="scope.row.comment_status"
							:disabled="scope.row.commentStatus"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 30, 60, 100]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
					background>
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
import { getArticles, updateArticleComment } from '@/api/article'
export default {
	name:'Comment',
	data() {
		return {
			tableData: [],
			currentPage:1,
			pageSize:10,
			total:0
		}
	},
	methods:{
		handleSizeChange(val) {
			this.currentPage = 1;
			this.pageSize = val;
			this.loadArticles(this.currentPage, this.pageSize)
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.loadArticles(this.currentPage, this.pageSize)
		},
		commentOperation(val){
			val.commentStatus = true
			updateArticleComment(val.id.toString(), val.comment_status).then(res=>{
				val.commentStatus = false
			}).catch(res=>{
				val.commentStatus = false
			})
		},
		loadArticles(page = 1, pageSize = 10){
			getArticles({
				response_type:'comment',
				page,
				per_page:pageSize
			}).then(res =>{
				res.data.data.results.forEach(element => {
					element.commentStatus = false
				});
				this.tableData = res.data.data.results
				this.total = res.data.data.total_count;
			})
		}
	},
	created(){
		this.loadArticles();
	}
}
</script>
<style>
.block{
	display: flex;
	justify-content: center;
	align-items: center;
}
.table{
	margin-bottom: 10px;
}
</style>