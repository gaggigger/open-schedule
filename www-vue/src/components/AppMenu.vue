<template>
  <nav>
    <router-link to="/" href="#">🏠 OpenSchedule</router-link>
    <router-link to="login"  href="#">👤 Login</router-link>
    <a href="#" v-on:click="logout()">🚶 Logout</a>
  </nav>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      console.log('Logout')
    }
  }
}
</script>

<style scoped>
  nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
    box-shadow: 0 0 8px 2px #f0f0f0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  nav > a {
    margin : 0.5em;
    text-decoration: none;
  }
  nav > a:hover {
    text-decoration: underline;
  }
  nav > a:first-child {
    flex-grow: 1;
  }
</style>
