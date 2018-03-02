<template>
  <nav>
    <router-link to="/" href="#">🏠 OpenSchedule</router-link>

    <router-link
      href="#"
      :data-icon="menu.path"
      v-bind:to="'' + menu.path"
      v-bind:key="menu.path"
      v-for="menu in menus"
    >
      {{ menu.name }}
    </router-link>

    <!--router-link to="login"  href="#">👤 Login</router-link>
    <a href="#" v-on:click="logout()">🚶 Logout</a-->
  </nav>
</template>

<script>
import Http from '../services/Http'

export default {
  data () {
    return {
      menus: []
    }
  },
  created () {
    Http.request('/menu', 'GET')
      .then(response => {
        this.menus = response
      })
      .catch(error => {
        console.error(error)
      })
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
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid var(--second-color);
    box-shadow: 0 0 8px 2px var(--second-color);
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
  nav > a[data-icon="/user"]::before {
    content:'👨';
  }
  nav > a[data-icon="/login"]::before {
    content:'➤';
  }
  nav > a[data-icon="/logout"]::before {
    content:'🚶';
  }
</style>
