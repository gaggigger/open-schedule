<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">Periods</span>
      <span class="link">Edit</span>
      <span class="link">Add</span>
    </h3>
  </div>
</template>
<script>
import Http from '@/services/Http'

export default {
  name: 'sessionPeriod',
  props: [
    'sessionId'
  ],
  data () {
    return {

    }
  },
  created () {
    Http.request('/sessions?parent_id=' + this.sessionId, 'GET')
      .then(response => {
        this.sessions = response
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {

  }
}
</script>
<style></style>
