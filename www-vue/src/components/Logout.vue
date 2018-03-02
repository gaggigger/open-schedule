<template>
  <div></div>
</template>

<script>
import Auth from '../services/Auth'

export default {
  name: 'Logout',
  created () {
    Auth.logOff()
    this.$router.push('/')
    window.location.reload()
  }
}
</script>
