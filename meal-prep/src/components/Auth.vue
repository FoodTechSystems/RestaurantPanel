<template>
  <div class="autharisation">
    
    <div class="form" :class="{ warning: isError }">
      <h2 class="">Вход</h2>
      <p class="warning_message" v-if="isError">Неверные данные</p>
      <form name="auth_form" @submit="autharization">
        <input type="text" placeholder="Логин" name="login" v-model="login" required>
        <input type="password" placeholder="Пароль" name="password" v-model="password" required>
        <input type="submit" value="Войти">
      </form>
    </div>

  </div>
</template>

<script>
import { AUTH, HTTP } from '@/request/http-common'
import axios from 'axios'
import { setCookie } from '@/request/cookie.js'


export default {
  name: "Auth",
  data () {
    return {
      isError: false,
      login: "",
      password: "",
    }
  },
  methods: {
    autharization: function(e){
      e.preventDefault();
      
      const body = JSON.stringify({ login: this.login, password: this.password })

      AUTH.post('/restautant/manager/auth', body)
      .then(res => {
        if(res.data) {
          setCookie('Authorization', res.data.token, 'expires=86400');  
          HTTP.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
          this.$router.options.routes[1].meta.authorized = true;
          this.$router.push("/main");
        }
      })
      .catch(e => {
        this.isError = true;
      })

      
    }
  }
};
</script>

<style scoped lang="less">
  .autharisation {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .form {
    display: block;
    margin: auto;
    width: 400px;
    min-height: 200px;
    background: #ececec;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #b9b9b9;

    &.warning {
      border: 1px solid red;
    }

    .warning_message {
      color: red;
    }
  }
</style>
