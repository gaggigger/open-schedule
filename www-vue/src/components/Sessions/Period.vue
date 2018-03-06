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
         class="period"
         v-for="period in periods"
    >
      <div class="label">
        {{ period.name }}
        <i>
          {{ period.date_start | dateToLocale }}
          -
          {{ period.date_end | dateToLocale }}
        </i>
      </div>
      <div
        class="dashed-background"
        v-bind:style="{ width: ellapsedTime(period.date_start, period.date_end) + '%' }"
      >
      </div>
    </div>
  </div>
</template>
<script>
import Http from '@/services/Http'
import New from './New'
import moment from 'moment'

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
    this.loadPeriod()
  },
  methods: {
    loadPeriod () {
      Http.request('/sessions?parent_id=' + this.sessionId, 'GET')
        .then(response => {
          this.periods = response
        })
        .catch(error => {
          console.error(error)
        })
    },
    addPeriod (session = null) {
      this.$refs.periodNew.open(Object.assign({
        parent_id: this.sessionId
      }, session))
    },
    handleAddPeriod () {
      this.loadPeriod()
      this.$refs.periodNew.close()
    },
    // Calcul le temps passé en %: depuis la date start jusqu'à now
    ellapsedTime (dateStart, dateEnd) {
      const range = moment(String(dateEnd)).toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      const ellapsed = moment().toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      return Math.min(100, Math.max(0, ellapsed * 100 / range))
    }
  }
}
</script>
<style scoped>
  .period {
    padding: 0.5em 0.2em;
    border: 1px solid var(--second-color);
    position: relative;
  }
  .period .label {
    position: inherit;
    z-index: 1;
  }
</style>
