<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">Periods</span>
      <span class="link">Edit</span>
      <span class="link" v-on:click="addPeriod">Add</span>
    </h3>
    <new ref="periodNew"
         v-on:sessionsAdded="handleAddPeriod"
    ></new>
    <div v-bind:key="period.id"
         v-for="period in periods"
    >
      {{ period.name }}
    </div>
  </div>
</template>
<script>
import Http from '@/services/Http'
import New from './New'

export default {
  name: 'sessionPeriod',
  components: {
    New
  },
  props: [
    'sessionId'
  ],
  data () {
    return {
      periods: []
    }
  },
  created () {
    Http.request('/sessions?parent_id=' + this.sessionId, 'GET')
      .then(response => {
        this.periods = response
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    addPeriod (session = null) {
      this.$refs.periodNew.open(Object.assign({
        parent_id: this.sessionId
      }, session))
    },
    handleAddPeriod () {
      this.$refs.periodNew.close()
    }
  }
}
</script>
<style scoped></style>
