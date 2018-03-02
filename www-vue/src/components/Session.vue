<template>
  <div>
    <h3>SESSION</h3>
    <div
      href="#"
      v-bind:key="session.id"
      v-for="session in sessions"
    >
      {{ session.name }}
    </div>
  </div>
</template>

<script>
import Http from '../services/Http'

export default {
  name: 'Session',
  data () {
    return {
      sessions: []
    }
  },
  created () {
    Http.request('/sessions', 'GET')
      .then(response => {
        this.sessions = response
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>

</style>
