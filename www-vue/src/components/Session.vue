<template>
  <div>
    <h3 class="title">
      <pan>SESSIONS</pan>
      <a href="#/session" v-on:click="addSession">+ Add a new session</a>
    </h3>
    <div
      class="sheet"
      v-if="adding"
    >
      <h4>Add new session</h4>
      <div>
        <label>Session name</label>
        <input
          type="text"
          placeholder="Session name"
          v-model="newSessionName"
        />
      </div>
      <div>
        <label>Session start</label>
        <input
          type="date"
          placeholder="Session start"
          v-model="newSessionDateStart"
        />
      </div>
      <div>
        <label>Session end</label>
        <input
          type="date"
          placeholder="Session end"
          v-model="newSessionDateEnd"
        />
      </div>
      <div style="text-align: center;">
        <button>Add</button>
        <button v-on:click="cancelAdd">Cancel</button>
      </div>
    </div>
    <div
      class="session-container"
      href="#"
      v-bind:key="session.id"
      v-for="session in sessions"
    >
      <div class="session-label">
        <div class="icon">
          <a
            style="color:darkgreen"
            href="#/session"
            title="Clôturer cette session"
            v-if="session.closed === 0"
            v-on:click="closeSession(session)"
          >🔓</a>
          <a
            style="color:darkred"
            href="#/session"
            title="Ouvrir cette session"
            v-if="session.closed !== 0"
            v-on:click="openSession(session)"
          >🔒</a>
        </div>
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
      </div>
      <div
        class="ellapsed"
        v-bind:style="{ width: ellapsedTime(session.date_start, session.date_end) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
import Http from '../services/Http'
import moment from 'moment'

export default {
  name: 'Session',
  data () {
    return {
      adding: false,
      newSessionName: '',
      newSessionDateStart: '',
      newSessionDateEnd: '',
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
  },
  methods: {
    ellapsedTime (dateStart, dateEnd) {
      const range = moment(String(dateEnd)).toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      const ellapsed = moment().toDate().getTime() - moment(String(dateStart)).toDate().getTime()
      return ellapsed * 100 / range
    },
    addSession () {
      console.log(1)
      this.adding = true
    },
    cancelAdd () {
      this.adding = false
      this.newSessionName = ''
      this.newSessionDateStart = ''
      this.newSessionDateEnd = ''
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
  .title {
    display: flex;
    justify-content: space-between;
  }
  .sheet {
    margin: 2em;
  }
  .sheet > div {
    margin: 1em 0;
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
  .session-container .session-label .icon {
    font-size: 1.8em;
    padding: 0 0.2em;
  }
  .session-container .session-label label {
    font-weight: bold;
  }
  .session-container > div.ellapsed {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      var(--third-color),
      var(--third-color) 10px,
      var(--third-color) 10px,
      var(--second-color) 10px,
      var(--second-color) 20px
    );
  }
</style>
