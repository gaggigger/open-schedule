<template>
  <div class="container">
    <div class="login-container">
      <div id="output"></div>
      <div class="avatar"></div>
      <div class="form-box">
        <form >
          <input
            type="text"
            name="user"
            placeholder="Username"
            v-model="username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
            required
          />
          <button
            class="btn btn-info btn-block login"
            type="button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import Http from '../plugins/Http'

  export default {
    name : 'login',
    data() {
      return {
        username : '',
        password : ''
      }
    },
    created() {
      Http.get();
    },
    methods: {

    }
  }
</script>
