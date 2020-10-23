<template>
  <div class="pic">
    <el-image>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
export default {
  name:'Picture'
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
 }
 .pic i{
   font-size: 20px;
 }
</style>