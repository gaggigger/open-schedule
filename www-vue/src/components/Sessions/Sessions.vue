<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">📅 SESSIONS</span>
      <span class="link" v-on:click="switchEdit(false)" v-if="edit">Cancel</span>
      <span class="link" v-on:click="switchEdit(true)" v-else>Edit</span>
      <span class="link" v-on:click="addSession">Add</span>
    </h3>
    <new ref="sessionNew"
         v-on:sessionsAdded="handleAddSession"
    ></new>
    <div v-bind:key="session.id"
         v-for="session in sessions"
    >
      <div class="session-container">
        <div class="session-label toolbar-1">
          <div>
            <label
              v-bind:style="{ color: session.closed? 'var(--deactivated-color)' : 'var(--ok-color)' }"
            >
              <span v-if="session.closed === 1">🔒</span>
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
            <span class="link"
                  v-if="session.closed === 0"
                  v-on:click="addSession(session)">Edit</span>
            <span class="error link"
                  v-if="session.closed === 0"
                  v-on:click="deleteSession(session)">Delete</span>
            <span class="link"
                  title="Clôturer cette session"
                  style="color:var(--deactivated-color);"
                  v-if="session.closed === 0"
                  v-on:click="updateSessionStatus(session, 1)"
            >🔓</span>
            <span class="link"
                  title="Ouvrir cette session" style="color:var(--deactivated-color);"
                  v-if="session.closed === 1"
                  v-on:click="updateSessionStatus(session, 0)">🔒</span>
          </div>
          <div>
            <span v-bind:class="{
                    link: true,
                    arrow: true,
                    'arrow-left': !showPeriod[session.id] == true,
                    'arrow-bottom': showPeriod[session.id] == true
                  }"
                  v-on:click="displayPeriod(session.id)"></span>
          </div>
        </div>
        <div class="ellapsed dashed-background"
             v-bind:style="{ width: ellapsedTime(session.date_start, session.date_end) + '%' }"
        ></div>
      </div>
      <div class="period"
           v-if="showPeriod[session.id] == true"
      >
        <period v-bind:session-id="session.id"></period>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/services/Http'
import moment from 'moment'
import New from './New'
import Period from './Period'

export default {
  name: 'Session',
  components: {
    New,
    Period
  },
  data () {
    return {
      showPeriod: {
        '1': true
      },
      edit: false,
      sessions: []
    }
  },
  created () {
    this.loadSession()
  },
  methods: {
    displayPeriod (sessionId = null) {
      if (this.showPeriod[sessionId] === undefined) {
        this.showPeriod[sessionId] = true
      } else {
        this.showPeriod[sessionId] = !this.showPeriod[sessionId]
      }
    },
    loadSession () {
      Http.request('/sessions', 'GET')
        .then(response => {
          response.forEach(item => {
            this.showPeriod[item.id] = false
          })
          this.sessions = response
        })
        .catch(error => {
          console.error(error)
        })
    },
    addSession (session = null) {
      this.$refs.sessionNew.open(Object.assign({}, session))
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
      this.loadSession()
      this.$refs.sessionNew.close()
    },
    updateSessionStatus (session, status) {
      session.closed = status
      Http.request('/sessions', 'POST', session).then(response => {
        // sessions = response
      }).catch(error => {
        session.closed = status === 1 ? 0 : 1
        console.error(error)
      })
    },
    deleteSession (session) {
      Http.request('/sessions', 'DELETE', session).then(response => {
        this.loadSession()
      }).catch(error => {
        console.error(error)
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
