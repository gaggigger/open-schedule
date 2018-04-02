<template>
  <div>
    <modal v-if="showModal" @cancel="showModal = false">
      <div slot="header">
        <h4 class="icon-add">Add new Period</h4>
      </div>
      <div slot="body" class="event-form">
        <new v-bind:session="editedPeriod"
             v-on:added="handleAddPeriod"
             v-on:closed="showModal = false"
        ></new>
      </div>
      <div slot="footer"></div>
    </modal>
    <h3 class="toolbar-1">
      <span class="title">Periods</span>
      <span class="link icon-add" v-on:click="addPeriod">Add</span>
    </h3>
    <loading v-if="!loaded"></loading>
    <div v-bind:key="period.id"
         class="period"
         v-for="period in periods"
         v-if="loaded"
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
          <span class="link icon-edit"
                    v-if="period.closed === 0"
                    v-on:click="addPeriod(period)">Edit</span>
          <span class="error link icon-delete"
                v-if="period.closed === 0"
                v-on:click="deleteSession(period)"> Delete</span>
          <span class="link icon-unlock"
                title="Close period"
                style="color:var(--deactivated-color);"
                v-if="period.closed === 0"
                v-on:click="updatePeriodStatus(period, 1)"
          ></span>
          <span class="link icon-lock"
                title="Open period" style="color:var(--deactivated-color);"
                v-if="period.closed === 1"
                v-on:click="updatePeriodStatus(period, 0)"></span>
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
import New from './New.vue'
import moment from 'moment'
import PeriodService from './services/Period'
import Modal from '../../components/Modal/Index.vue'
import Loading from '../../components/Loading/Index.vue'

export default {
  name: 'SessionPeriod',
  components: {
    New,
    Modal,
    Loading
  },
  props: [
    'sessionId'
  ],
  data () {
    return {
      loaded: false,
      showModal: false,
      editedPeriod: null,
      periods: []
    }
  },
  created () {
    this.loadPeriod()
  },
  methods: {
    loadPeriod () {
      this.loaded = false
      PeriodService.loadPeriod({
        parent_id: this.sessionId
      }).then(response => {
        this.loaded = true
        this.periods = response
      })
    },
    addPeriod (period = null) {
      this.showModal = true
      this.editedPeriod = Object.assign({
        parent_id: this.sessionId
      }, period)
    },
    handleAddPeriod () {
      this.showModal = false
      this.loadPeriod()
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
