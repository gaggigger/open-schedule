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
          ref="username"
          v-bind:placeholder="s_username"
          v-model="m_username"
          required
          autofocus
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
  mounted () {
    this.$refs.username.focus()
  },
  methods: {
    login (event) {
      event.preventDefault()
      event.stopPropagation()
      Http.request('/login', 'POST', {
        user: this.m_username,
        password: this.m_password
      }).then(response => {
        this.$router.push('/')
        window.location.reload()
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
    max-width: 300px;
  }
  .avatar{
    width: 100px;height: 100px;
    margin: 10px auto 30px;
    border-radius: 100%;
    border: 2px solid var(--third-color);
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWAgMAAABV+geQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX////8PTIAfjpoIrHoAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EICgIJNL3zUrAAAABCSURBVGje7csxEQAgDASwB2WYwA96UIkAlq69S/Ykn7ErVkzTNE3TNE3TNE3TNHvOeSuOaZqmaZqmaZqmaZpmh/kA2nAF8HcsfiIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDgtMTBUMDI6MDk6NTIrMDA6MDDSkTaFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA4LTEwVDAyOjA5OjUyKzAwOjAwo8yOOQAAAABJRU5ErkJggg==);
  }
  .form-box input{
    width: calc(100% - 10%);
  }
  .form-box button {
    width: calc(100% - 20%);
  }
  .form-box input[type="text"]{
    border-radius: 5px 5px 0 0;
  }
  .form-box input[type="password"]{
    border-radius: 0 0 5px 5px;
    border-top: 0;
  }
</style>
