<template>
  <div>
    <h3 class="title">
      <span>SESSIONS</span>
      <a href="#/session" v-on:click="editSessions" v-if="!edit">Edit</a>
      <a href="#/session" v-on:click="endEdition" v-if="edit">Cancel</a>
      <a href="#/session" v-on:click="addSession">Add</a>
    </h3>
    <new
      ref="sessionNew"
      v-on:sessionsAdded="handleAddSession"
    ></new>
    <div
      class="session-container"
      href="#"
      v-bind:key="session.id"
      v-for="session in sessions"
    >
      <div class="session-label">
        <div>
          <label
            v-bind:style="{ color: session.closed? 'var(--error-color)' : 'var(--ok-color)' }"
          >
            {{ session.name }}
          </label>
          <br />
          <i>
            {{ session.date_start | dateToLocale }}
            -
            {{ session.date_end | dateToLocale }}
          </i>
        </div>
        <div
          class="icon"
          v-if="edit"
        >
          <a
            href="#/session"
            v-if="session.closed === 0"
            v-on:click="closeSession(session)"
          >Edit</a>
          <a
            href="#/session"
            class="error"
            v-if="session.closed === 0"
            v-on:click="closeSession(session)"
          >Delete</a>
          <a
            href="#/session"
            title="Clôturer cette session"
            v-if="session.closed === 0"
            v-on:click="closeSession(session)"
          >🔓</a>
          <a
            href="#/session"
            title="Ouvrir cette session"
            v-if="session.closed !== 0"
            v-on:click="openSession(session)"
          >🔒</a>
        </div>
      </div>
      <div
        class="ellapsed dashed-background"
        v-bind:style="{ width: ellapsedTime(session.date_start, session.date_end) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
import Http from '@/services/Http'
import moment from 'moment'
import New from './New'

export default {
  name: 'Session',
  components: {
    New
  },
  data () {
    return {
      edit: false,
      sessions: []
    }
  },
  created () {
    this.loadSession()
  },
  methods: {
    loadSession () {
      Http.request('/sessions', 'GET')
        .then(response => {
          this.sessions = response
        })
        .catch(error => {
          console.error(error)
        })
    },
    editSessions () {
      this.edit = true
    },
    endEdition () {
      this.edit = false
    },
    ellapsedTime (dateStart, dateEnd) {
      const range = moment(String(dateEnd)).toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      const ellapsed = moment().toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      return ellapsed * 100 / range
    },
    addSession () {
      this.$refs.sessionNew.open()
    },
    handleAddSession (session) {
      this.loadSession()
      this.$refs.sessionNew.close()
    },
    closeSession (session) {
      session.closed = 1
      // TODO call proc
    },
    openSession (session) {
      session.closed = 0
      // TODO call proc
    }
  }
}
</script>

<style scoped>
  .title,
  .session-label {
    display: flex;
    justify-content: space-between;
  }
  .title > *:not(:first-child) {
    margin: 0 0.5em;
  }
  .title > :first-child,
  .session-label > :first-child {
    flex-grow: 1;
  }
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
</style>
