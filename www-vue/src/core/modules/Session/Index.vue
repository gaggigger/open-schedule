<template>
  <div>
    <modal v-if="showModal" @cancel="showModal = false">
      <div slot="header">
        <h4 class="icon-add">Add new session</h4>
      </div>
      <div slot="body" class="event-form">
        <new v-bind:session="editedSession"
             v-on:added="handleAddSession"
             v-on:closed="showModal = false"
        ></new>
      </div>
      <div slot="footer"></div>
    </modal>
    <h3 class="title">
      <span class="title icon-calendar">SESSIONS</span>
    </h3>
    <header class="toolbar-1">
      <div>
        <span class="link icon-cancel" v-on:click="switchEdit(false)" v-if="edit">Cancel</span>
        <span class="link icon-edit" v-on:click="switchEdit(true)" v-else>Edit</span>
        <span class="link icon-add" v-on:click="addSession">Add</span>
      </div>
      <div>
        <span v-bind:class="{
                      link: true,
                      arrow: true,
                      'arrow-left': !display_period,
                      'arrow-bottom': display_period
                    }"
              v-on:click="display_period = !display_period"></span>
      </div>
    </header>
    <div v-bind:key="session.id"
         v-for="session in sessions"
         class="main-container shadow"
    >
      <div class="session-container">
        <div class="session-label toolbar-1">
          <div>
            <label
              v-bind:style="{ color: session.closed? 'var(--deactivated-color)' : 'var(--ok-color)' }"
            >
              <span class="icon-lock" v-if="session.closed === 1"></span>
              {{ session.name }}
            </label>
            <div>
              <i>
                {{ session.date_start | dateToLocale }}
                -
                {{ session.date_end | dateToLocale }}
              </i>
            </div>
          </div>
          <div class="icon"
               v-if="edit"
          >
            <span class="link icon-edit"
                  v-if="session.closed === 0"
                  v-on:click="addSession(session)">Edit</span>
            <span class="error link icon-delete"
                  v-if="session.closed === 0"
                  v-on:click="deleteSession(session)">Delete</span>
            <span class="link icon-unlock"
                  title="Close session"
                  style="color:var(--deactivated-color);"
                  v-if="session.closed === 0"
                  v-on:click="updateSessionStatus(session, 1)"
            ></span>
            <span class="link icon-lock"
                  title="Open session" style="color:var(--deactivated-color);"
                  v-if="session.closed === 1"
                  v-on:click="updateSessionStatus(session, 0)"></span>
          </div>
        </div>
        <div class="ellapsed dashed-background"
             v-bind:style="{ width: ellapsedTime(session.date_start, session.date_end) + '%' }"
        ></div>
      </div>
      <div class="period"
           v-if="display_period == true"
      >
        <period v-bind:session-id="session.id"></period>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import New from './New.vue'
import PeriodService from './services/Period'
import Period from './Period.vue'
import Notification from '../../services/Notification'
import Modal from '../../components/Modal/Index.vue'

export default {
  name: 'Session',
  components: {
    New,
    Period,
    Modal
  },
  data () {
    return {
      showModal: false,
      edit: false,
      display_period: false,
      sessions: [],
      editedSession: null
    }
  },
  mounted () {
    this.loadSession()
  },
  methods: {
    loadSession () {
      PeriodService.loadPeriod()
        .then(response => { this.sessions = response })
        .catch(error => { Notification.error(error) })
    },
    addSession (session = null) {
      this.showModal = true
      this.editedSession = Object.assign({}, session)
    },
    switchEdit (edit) {
      this.edit = edit
    },
    // Calcul le temps passé en %: depuis la date start jusqu'à now
    ellapsedTime (dateStart, dateEnd) {
      const range = moment(String(dateEnd)).toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      const ellapsed = moment().toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      return Math.min(100, Math.max(0, ellapsed * 100 / range))
    },
    // Listener to child New, après le succès de l'ajout
    handleAddSession (session) {
      this.showModal = false
      this.loadSession()
    },
    updateSessionStatus (session, status) {
      PeriodService.updatePeriodStatus(session, status)
        .then(response => {
          // sessions = response
        })
    },
    deleteSession (session) {
      PeriodService.deletePeriod(session)
        .then(response => {
          if (response) this.loadSession()
        })
    }
  }
}
</script>

<style scoped>
  input {
    width: 100%;
  }
  button {
    width: 50%;
  }
  .main-container {
    margin-bottom: 0.5em;
  }
  .session-container {
    border: 1px solid var(--second-color);
    position: relative;
  }
  .session-container .session-label{
    padding: 1em;
    position: inherit;
    z-index: 1;
    display: flex;
  }
  .session-container .session-label label {
    font-weight: bold;
  }
  .session-container .session-label .icon {
    display: flex;
    align-items: center;
  }
  .session-container .session-label .icon > *{
    padding: 0 0.2em;
  }
  .period {
    padding: 0.4em 2em;
    font-size: 0.9em;
    border: 1px solid var(--second-color);
  }
</style>
