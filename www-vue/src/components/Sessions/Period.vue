<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">Periods</span>
      <span class="link" v-on:click="addPeriod">Add</span>
    </h3>
    <new ref="periodNew"
         v-on:sessionsAdded="handleAddPeriod"
    ></new>
    <div v-bind:key="period.id"
         class="period"
         v-for="period in periods"
    >
      <div class="label toolbar-1">
        <div>
          <b>{{ period.name }}</b>,
          <i>
            {{ period.date_start | dateToLocale }}
            -
            {{ period.date_end | dateToLocale }}
          </i>
        </div>
        <div>
          <span class="link"
                    v-if="period.closed === 0"
                    v-on:click="addPeriod(period)">Edit</span>
          <span class="error link"
                v-if="period.closed === 0"
                v-on:click="deleteSession(period)">Delete</span>
          <span class="link"
                title="Close period"
                style="color:var(--deactivated-color);"
                v-if="period.closed === 0"
                v-on:click="updatePeriodStatus(period, 1)"
          >🔓</span>
          <span class="link"
                title="Open period" style="color:var(--deactivated-color);"
                v-if="period.closed === 1"
                v-on:click="updatePeriodStatus(period, 0)">🔒</span>
        </div>
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
import New from './New'
import moment from 'moment'
import PeriodService from '@/services/Period'

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
      PeriodService.loadPeriod({
        parent_id: this.sessionId
      }).then(response => {
        this.periods = response
      })
    },
    addPeriod (period = null) {
      this.$refs.periodNew.open(Object.assign({
        parent_id: this.sessionId
      }, period))
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
    },
    updatePeriodStatus (period, status) {
      PeriodService.updatePeriodStatus(period, status)
        .then(response => {
          this.loadPeriod()
        })
    },
    deleteSession (period) {
      PeriodService.deletePeriod(period)
        .then(response => {
          this.loadPeriod()
        })
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
