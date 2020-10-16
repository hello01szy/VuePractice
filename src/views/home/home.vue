<template>
    <div class="home_container">
        <el-container class="el-container">
            <el-aside :width="width" class="container-aside">
                <div class="menu-logo"></div>
                <AsideMenu :flag="flag"></AsideMenu>
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
            flag:Boolean,
            width:'',
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