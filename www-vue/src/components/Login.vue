<template>
  <div class="login-container sheet">
    <div id="output"></div>
    <div class="avatar"></div>
    <div class="form-box">
      <form>
        <input
          type="text"
          name="user"
          v-bind:placeholder="s_username"
          required
        />
        <input
          type="password"
          name="password"
          v-bind:placeholder="s_password"
          required
        />
        <button
          class="btn btn-info btn-block login"
          type="button"
          v-on:click="login"
        >
          {{ s_login }}
        </button>
      </form>
    </div>
    <div class="error"></div>
  </div>
</template>

<script>
import Http from '../services/http'

export default {
  name: 'Login',
  data () {
    return {
      s_username: 'Username',
      s_password: 'Password',
      s_login: 'Login'
    }
  },
  methods: {
    login () {

    }
  }
}
</script>

<style scoped>
  .login-container{
    position: relative;
    margin: 5em 20%;
    padding: 2em 2em;
    text-align: center;
    background: #fff;
    border: 1px solid #ccc;
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
  .form-box button.login{
    width: calc(100% - 10%);
    max-width: 50%;
    margin-top: 1.5em;
    padding: 0.5em 1em;
  }
</style>
