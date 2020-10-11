<template>
    <div>
      <el-menu
        default-active="1"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#9cdcf0"
        router
        :collapse="flag">
        <el-menu-item index="/home/">
            <i class="el-icon-location"></i>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/home/content">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/home/stuff">
            <i class="el-icon-document"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/home/article">
            <i class="el-icon-share"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/home/comment">
            <i class="el-icon-s-check"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/home/fans">
            <i class="el-icon-user-solid"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/home/settings">
            <i class="el-icon-s-operation"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </div>
</template>
<script>
export default {
    name:'AsideMenu',
    props:{'flag':{
        default:false
    }},
    methods:{
    }
}
</script>