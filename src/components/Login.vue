<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--      登录表单-->
      <el-form ref="loginResetRef" :model="loginForm" label-width="0px" class="login_form" :rules="rulesForm">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'jc',
        password: '123456'
      },
      rulesForm: {
        username: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          message: '请输入用户密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    resetLogin () {
      // console.log(this)
      this.$refs.loginResetRef.resetFields()
      // console.log(this.$refs.loginResetRef)
    },
    async login () {
      await this.$refs.loginResetRef.validate(valid => {
        if (!valid) return

        axios.post('passport/login', this.loginForm).then((res) => {
          const data = res.data
          if (data.code !== 200) {
            this.$message.error(data.msg)
          }
          console.log(data)
          this.$message.success(data.msg)
          window.sessionStorage.setItem('token', data.result.token)
          this.$router.push('/home')
          // return new Promise(Function(resolve,reject){
          //   setTimeout(function(){
          //     resolve("成功!"); //代码正常执行！
          //   }, 250);
          // })
          // console.log(res);
        })
        // })
      })
    }
  }
}
</script>
<!--scoped样式生效范围,本组件范围,less表示语法-->
<!--<style lang="less" scoped>-->
<!--.login_container{-->
<!--  //background-color: blue;-->
<!--}-->
<!--</style>-->
<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px;
    solid: #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}

</style>
