<template>
  <div></div>
</template>

<script>
import Auth from '../../services/Auth'

export default {
  name: 'LoginLogout',
  created () {
    Auth.logOff()
    this.$router.push('/')
    window.location.reload()
  }
}
</script>
