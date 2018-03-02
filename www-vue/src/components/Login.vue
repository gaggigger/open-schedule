<template>
  <div class="login-container sheet">
    <div id="output"></div>
    <div class="avatar"></div>
    <div class="form-box">
      <div class="error">
        {{ errorMessage }}
      </div>
      <form action="#" method="POST">
        <input
          type="text"
          name="user"
          v-bind:placeholder="s_username"
          v-model="m_username"
          required
        />
        <input
          type="password"
          name="password"
          v-bind:placeholder="s_password"
          v-model="m_password"
          required
        />
        <button
          type="submit"
          v-on:click="login($event)"
        >
          {{ s_login }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Http from '../services/Http'

export default {
  name: 'Login',
  data () {
    return {
      s_username: '👨 Username',
      s_password: '🔑 Password',
      s_login: '🔓 Login',
      m_username: '',
      m_password: '',
      errorMessage: ''
    }
  },
  methods: {
    login (event) {
      event.preventDefault()
      event.stopPropagation()
      Http.request('/login', 'POST', {
        user: this.m_username,
        password: this.m_password
      }).then(response => {
        console.log(response)
      }).catch(error => {
        this.errorMessage = error
      })
    }
  }
}
</script>

<style scoped>
  .login-container{
    position: relative;
    margin: 5em auto;
    padding: 2em 2em;
    text-align: center;
    background: #fff;
    border: 1px solid #ccc;
    max-width: 300px;
  }
  .avatar{
    width: 100px;height: 100px;
    margin: 10px auto 30px;
    border-radius: 100%;
    border: 2px solid #aaa;
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWAgMAAABV+geQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX////8PTIAfjpoIrHoAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EICgIJNL3zUrAAAABCSURBVGje7csxEQAgDASwB2WYwA96UIkAlq69S/Ykn7ErVkzTNE3TNE3TNE3TNHvOeSuOaZqmaZqmaZqmaZpmh/kA2nAF8HcsfiIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDgtMTBUMDI6MDk6NTIrMDA6MDDSkTaFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA4LTEwVDAyOjA5OjUyKzAwOjAwo8yOOQAAAABJRU5ErkJggg==);
  }
  .form-box input{
    width: calc(100% - 10%);
    padding: 0.5em;
    height: 2em;
    border: 1px solid #ccc;;
    background: #fafafa;
    transition: 0.2s ease-in-out;
  }
  .form-box input:focus{
    outline: 0;
    background: #eee;
  }
  .form-box input[type="text"]{
    border-radius: 5px 5px 0 0;
  }
  .form-box input[type="password"]{
    border-radius: 0 0 5px 5px;
    border-top: 0;
  }
  .form-box button {
    width: calc(100% - 10%);
    max-width: 50%;
    margin-top: 0.5em;
    padding: 0.5em 0.1em;
    cursor: pointer;
  }
  .form-box button {
    background: #3498db;
    background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
    background-image: -moz-linear-gradient(top, #3498db, #2980b9);
    background-image: -ms-linear-gradient(top, #3498db, #2980b9);
    background-image: -o-linear-gradient(top, #3498db, #2980b9);
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #ffffff;
    text-decoration: none;
  }
  .form-box button:hover {
    background: #3cb0fd;
    background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
    text-decoration: none;
  }
</style>
