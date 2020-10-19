<template>
    <div class="home_container">
        <el-container class="el-container">
            <el-aside :width="width" class="container-aside">
                <div class="menu-logo"></div>
                <AsideMenu :flag="flag" :activeIndex="activeIndex"></AsideMenu>
            </el-aside>
            <el-container>
                <el-header class="container-head">
                    <Header @collapse='asideChange'></Header>
                </el-header>
                <el-main class="container-main">
                    <router-view />
                </el-main>
            </el-container>
</el-container>
    </div>
</template>
<script>
import AsideMenu from '../home/component/AsideMenu'
import Header from '../home/component/Header'
export default {
    name:'home',
    components:{
        AsideMenu,
        Header
    },
    data(){
        return {
            flag:false,
            width:'200px',
            activeIndex:'/home'
        }
    },
    methods:{
        asideChange(flag){
            if(flag){
                this.flag = true;
                this.width = 'auto';
            }else{
                this.flag = false;
                this.width = '200px';
            }
        }
    },
    created(){
        this.activeIndex = this.$route.path
        console.log(this.activeIndex);
    }
}
</script>
<style scoped>
    .home_container{
        width: 100vw;
        height: 100vh;
    }
    .el-container{
        width: 100vw;
        height: 100vh;
    }
    .container-head{
        border-bottom: 1px solid #aaaaaa;
        background-color: #ffffff;
    }
    .container-main{
        background-color: #ffffff;
    }
    .container-aside{
        background-color: #515c64;
        transition: 0.8ms;
    }
    .menu-logo{
        height: 80px;
        background-image: url('../../assets/logo2.png');
        background-size: 20%;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>