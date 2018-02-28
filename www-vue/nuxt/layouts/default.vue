<template>
  <div>
    <navbar></navbar>
    <login></login>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import Login from '../components/Login.vue'

  export default {
    components: {
      Navbar,
      Login
    }
  }
</script>
