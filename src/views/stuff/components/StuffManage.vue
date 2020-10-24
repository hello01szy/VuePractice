<template>
  <div>
    <div class="buttons">
    		<el-radio-group v-model="choose" size="mini" @change="chooseStatus">
					<el-radio-button label="全部"></el-radio-button>
					<el-radio-button label="收藏"></el-radio-button>
				</el-radio-group>
				<el-button type="success" size="mini" @click="dialogTableVisible = true" v-show="showAddStaff">添加素材</el-button>
  		</div>
			<div>
					<el-row :gutter="20">
						<el-col v-for="(image, index) in images" :key="index" :span="columns" :xs="8">
							<div class="rowImg" @mouseenter="enter" @mouseleave="leave">
								<el-image 
									style="width: 100%; height: 100px"
									:src="image.url"
									:preview-src-list="srcList">
								</el-image>
								<div id="icon" :class="{colOrDel:isShow===image.id}" v-show="showAction">
									<img v-if="image.is_collected" src="~@/assets/collect.png" alt="collect" :class="{hide:isShow2!==image.id}" @click="uncollect(image)">
									<img v-else src="~@/assets/uncollect.png" alt="collect" :class="{hide:isShow2!==image.id}" @click="collect(image)">
									<img src="~@/assets/delete.png" alt="delete" :class="{hide:isShow2!==image.id}" @click="deleteImgs(image)">
								</div>
                <div v-show="showChoosen" :class="{cover:true, colorSet:showColorSet === index}" @mouseenter="showBg(index)" @click="showRight(index)">
                </div>
                <div :class="{choosen:true, hide:showChooseId !== index}"></div>
								<span style="display:none">{{image.id}}</span>
							</div>
						</el-col>
					</el-row>
			</div>
			<div class="block">
				<el-pagination
					layout="prev, pager, next"
					:page-size="24"
					:total="total"
					:current-page="currentPage"
					@current-change="changePage">
				</el-pagination>
			</div>
      <el-dialog title="上传素材" :visible.sync="dialogTableVisible">
			<el-upload
					class="upload-demo"
					action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
					:headers="headers"
					:on-success="uploadSuccess"
					:file-list="fileList"
					name="image"
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-dialog>
  </div>
</template>
<script>
import { getImages, colOrUnColImage, deleteImg } from '@/api/image'
const userInfo = JSON.parse(window.localStorage.getItem('data'))
export default {
	name:'Stuff',
	data(){
		return {
      showChooseId:-1,
      showColorSet:false,
			choose:'全部',
			images:[],
			srcList:[],
			isShow:0,
			dialogTableVisible:false,
			fileList:[],
			headers:{
				Authorization:`Bearer ${userInfo.token}`
			},
			total:0,
			currentPage:1,
			isShow2:0
		}
	},
	methods:{
		queryImages(collect=false){
			let config = {
				collect,
				page:this.currentPage,
				per_page:24
			}
			getImages(config).then(res=>{
				this.images = res.data.data.results;
				this.total = res.data.data.total_count;
				for(let i = 0; i < this.images.length; i++){
					this.srcList.push(this.images[i].url);
				}
			})
    },
    showBg(index){
      this.showColorSet = index;
      console.log(index);
    },
    showRight(index){
      this.showChooseId = index;
      console.log(index);
    },
		deleteImgs(image){
			deleteImg(image).then(res=>{
				this.$message.success('删除成功');
			}).catch(res=>{
				this.$message.warn('删除失败');
			})
		},
		collect(image){
			colOrUnColImage(image.id, true).then(res=>{
				this.$message.success('收藏成功');
				image.is_collected = true;
			}).catch(res=>{
				this.$message.warn('收藏失败');
			})
    },
		uncollect(image){
			colOrUnColImage(image.id, false).then(res=>{
				this.$message.success('取消成功')
				image.is_collected = false
			}).catch(res=>{
				this.$message.warn('取消失败')
			})
		},
		enter(e){
			this.isShow = parseInt(e.target.lastChild.innerHTML);
			this.isShow2 = this.isShow;
		},
		leave(e){
			this.isShow = 0;
			this.isShow2 = this.isShow;
		},
		chooseStatus(){
			if(this.choose === '收藏'){
				this.queryImages(true)
			}else{
				this.queryImages()
			}
		},
		uploadSuccess(){
			this.queryImages();
		},
		changePage(val){
			this.currentPage = val;
			if(this.choose === '收藏'){
				this.queryImages(true)
			}else{
				this.queryImages()
			}
		}
  },
  props:{
    showAddStaff:{
      type:Boolean,
      default:true
    },
    showAction:{
      type:Boolean,
      default:true
    },
    columns:{
      type:Number,
      default:4
    },
    showChoosen:{
      type:Boolean,
      default:false
    }
  },
	created(){
		this.queryImages();
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
    width: 100%;
  }
	.el-row {
		margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
	.rowImg{
		overflow: hidden;
		position:relative;
	}
	.colOrDel{
		position: absolute;
		left: 0;
		bottom: 4px;
		width: 100%;
		height: 25%;
		background-color: #44444455;
		transition: 0.4s;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
  .choosen{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100px;
    background-image: url('~@/assets/choosen.png');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
    transition: 0.4s;
  }
	.hide{
		display: none;
		transition: 0.4;
	}
	img{
		height: 100px;
	}
	.buttons{
		display: flex;
		justify-content: space-between;
		margin-right: 15px;
	}
	#icon img{
		width: 20px;
		height: 20px;
		padding: 2px;
		cursor: pointer;
	}
	.block{
		display: flex;
		justify-content: center;
	}
  .cover{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100px;
    transition: 0.4s;
  }
  .colorSet{
    background-color: rgba(30, 30, 30, 0.5);
  }
</style>