<template>
  <div
    class="sheet"
    v-if="visible"
  >
    <h4>Add new session</h4>
    <div>
      <label>Session name</label>
      <input
        type="text"
        placeholder="Session name"
        v-model="session.name"
      />
    </div>
    <div>
      <label>Session start</label>
      <input
        type="date"
        placeholder="Session start"
        v-model="session.date_start"
      />
    </div>
    <div>
      <label>Session end</label>
      <input
        type="date"
        placeholder="Session end"
        v-model="session.date_end"
      />
    </div>
    <div style="text-align: center;">
      <button v-on:click="add" v-if="!session.id">Add</button>
      <button v-on:click="add" v-if="session.id">Save</button>
      <button v-on:click="close">Cancel</button>
    </div>
  </div>
</template>

<script>
import Http from '@/services/Http'

export default {
  name: 'new-session',
  data () {
    return {
      visible: false,
      session: {}
    }
  },
  methods: {
    open (session = null) {
      if (session !== null) {
        this.session = session
      }
      this.visible = true
    },
    close () {
      this.session = {}
      this.visible = false
    },
    add () {
      Http.request('/sessions', 'POST', this.session).then(response => {
        this.$emit('sessionsAdded', response)
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
  .sheet {
    margin: 2em;
    position: fixed;
    top: 5%;
    left: 5%;
    right: 5%;
  }
  @media screen and (min-width: 1000px) {
    .sheet {
      left: 20%;
      right: 20%;
    }
  }
  .sheet > div {
    margin: 1em 0;
  }
  input {
    width: calc(100% - 1em);
  }
  button {
    width: 50%;
  }
  label {
    display: inline-block;
    width: 100%;
  }
</style>
