<template>
  <div class="pic" @click="chooseCover">
    <img
      ref="componentPic"
      style="width: 50px; height: 50px;"
      :src="myurl" />
    <el-dialog title="选择封面" size="medium" :visible.sync="dialogVisible" :show-close="false">
		  <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="素材" name="first">
          <Stuff ref="stuff" :showAction="false" :showAddStaff="false" :showChoosen="true" :columns="4"/>
        </el-tab-pane>
          <el-tab-pane label="上传" name="second">
            <input type="file" ref="fileInput" @change="onFileChange"/>
            <img ref="coverImage" />
        </el-tab-pane>
		  </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="closeDialog()">取 消</el-button>
        <el-button type="primary" @click.stop="uploadCover">确 定</el-button>
      </span>
	  </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
const Stuff = ()=> import('@/views/stuff/components/StuffManage')
export default {
  name:'Picture',
  data(){
    return {
      dialogVisible:false,
      activeName: 'first'
    }
  },
  components:{
    Stuff
  },
  props:{
    myurl:{
      default:require('@/assets/picture.png')
    }
  },
  methods:{
    uploadCover(){
			const file = this.$refs.fileInput.files[0];
			if(this.activeName == 'second'){
				if(!file){
					this.$message.warning('请选择图片');
					return
				}
				const formData = new FormData();
				formData.append('image', file);
				uploadImage(formData).then(res=>{
					this.dialogVisible = false;
          this.myurl = res.data.data.url
          this.$emit('fillImages', this.myurl);
				}).catch(res=>{
					this.$message.error('上传失败');
				})
      }
      else{
        if(this.$refs.stuff.showChooseId == null){
          this.$message.warning('请选择图片');
        }
        else{
          let index = this.$refs.stuff.showChooseId;
          this.myurl = this.$refs.stuff.images[index].url
          this.dialogVisible = false
        }

      }
    },
    closeDialog(){
      this.dialogVisible = false;
      console.log(this.dialogVisible)
    },
		onFileChange(){
			const file = this.$refs.fileInput.files[0];
			const blob = window.URL.createObjectURL(file);
			this.$refs.coverImage.src=blob;
    },
    chooseCover(){
      this.dialogVisible = true
    },
		handleClick(tab, event) {
			console.log(tab, event);
		}
  },
}
</script>

<style>
 .pic{
   width: 100px;
   height: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #eeeeee;
   border-radius: 4px;
   background-position: center;
 }
</style>