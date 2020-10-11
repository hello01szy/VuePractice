<template>
    <div class="login">
        <el-form ref="form" :model="user" class="login_form" :rules="rules">
            <div class="logo"></div>
            <el-form-item prop='mobile'>
                <el-input prefix-icon="el-icon-phone" v-model="user.mobile" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item class="mycheck" prop='code'>
                <el-input prefix-icon="el-icon-s-promotion" v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item class="mycheck-check" prop='checked'>
                <el-checkbox v-model="user.checked">我已阅读并同意相关规则</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" class="login_btn" :loading='loading'>登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// import reqeust from '../../network/request'
import {login} from '../../api/user'
export default {
    name:'Login',
    data() {
      let checkAgree = (rule, value, callback) => {
          console.log(value);
        if (value === false) {
          callback(new Error('请同意隐私规则'));
        }else {
          console.log(value);
          callback();
        }
      };
      return {
        user: {
          mobile: '',
          code: '',
          checked:false,
        },
        loading:false,
        rules: {
          mobile: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { pattern: /^\d{6}$/, message: '请输入6位验证码', trigger: 'blur' }
          ],
          checked:[
            {validator: checkAgree, trigger:'blur'}  
          ]
        },
        bgs:['bg1.jpg', 'bg2.jpg', 'bg3.jpg']
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loading = true
            login('/mp/v1_0/authorizations', this.user).then((data) =>{
                this.loading = false
                window.localStorage.setItem('data', JSON.stringify(data.data.data));
                this.$router.push('/home');
            }).catch((error) =>{
                this.loading = false
                this.$message.error('用户名或密码错误');
            })
          } else {
            return false;
          }
        });
      }
    },
    computed:{
      randomBg:function(){
        return this.bg = parseInt(Math.random() * 3 + 1);
      }
    }
}
</script>
<style scoped>
    .login{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .login_form{
        background-color: #ffffff;
        width: 20%;
        padding: 20px 30px;
        border-radius: 3px;
    }
    .login_btn{
        width: 100%;
    }
    .mycheck{
        margin-bottom: 10px;
    }
    .logo{
        margin-left: 10%;
        margin-right: 10%;
        width: 80%;
        height: 60px;
        background-image: url('../../assets/logo.png');
        background-size: cover;
        background-position: center;
        transform: scale(0.7);
        margin-bottom: 22px;
    }
    .mycheck-check{
        margin-bottom: 20px;
    }
</style>