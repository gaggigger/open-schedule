<template>
  <div class="login-container sheet">
    <div id="output"></div>
    <div class="avatar"></div>
    <div class="form-box">
      <form action="#" method="POST">
        <div data-name="user">
          <input
            type="text"
            name="user"
            ref="username"
            v-bind:placeholder="'👨 ' + s_username"
            v-model="m_username"
            required
            autofocus
          />
        </div>
        <div data-name="password">
          <input
            type="password"
            name="password"
            v-bind:placeholder="'🔑 ' + s_password"
            v-model="m_password"
            required
          />
        </div>
        <button
          type="submit"
          v-on:click="login($event)"
          class="icon-unlock"
        >
          {{ s_login }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Http from '../../services/Http'
import Auth from '../../services/Auth'
import Notification from '../../services/Notification'

export default {
  name: 'LoginLogin',
  data () {
    return {
      s_username: 'Username',
      s_password: 'Password',
      s_login: 'Login',
      m_username: '',
      m_password: ''
    }
  },
  created () {
    if (Auth.isLogged()) {
      this.$router.push('/')
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
        if (response !== undefined) {
          window.location.reload()
        }
      }).catch(error => {
        Notification.error(error)
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    position: relative;
    margin: 5em auto;
    padding: 2em 2em;
    text-align: center;
    max-width: 300px;
  }
  .avatar {
    width: 100px;height: 100px;
    margin: 10px auto 30px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid var(--third-color);
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWAgMAAABV+geQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX////8PTIAfjpoIrHoAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EICgIJNL3zUrAAAABCSURBVGje7csxEQAgDASwB2WYwA96UIkAlq69S/Ykn7ErVkzTNE3TNE3TNE3TNHvOeSuOaZqmaZqmaZqmaZpmh/kA2nAF8HcsfiIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDgtMTBUMDI6MDk6NTIrMDA6MDDSkTaFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA4LTEwVDAyOjA5OjUyKzAwOjAwo8yOOQAAAABJRU5ErkJggg==);
  }
  .form-box input {
    width: calc(100% - 10%);
  }
  .form-box button {
    width: calc(100% - 20%);
  }
  .form-box input[name="user"] {
    -webkit-border-radius: 5px 5px 0 0;
    -moz-border-radius: 5px 5px 0 0;
    border-radius: 5px 5px 0 0;
  }
  .form-box input[name="password"] {
    border-radius: 0 0 5px 5px;
    border-top: 0;
  }
  /*
  .form-box div[data-name="password"]::before {
    content: "🔑";
    padding: 0 0.2em;
  }
  .form-box div[data-name="user"]::before {
    content: "👨";
    padding: 0 0.2em;
  }
  */
</style>
