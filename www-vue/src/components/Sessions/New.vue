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
      <button v-on:click="add">Add</button>
      <button v-on:click="cancelAdd">Cancel</button>
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
      newSessionName: '',
      newSessionDateStart: '',
      newSessionDateEnd: ''
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.newSessionName = ''
      this.newSessionDateStart = ''
      this.newSessionDateEnd = ''
      this.visible = false
    },
    add () {
      Http.request('/sessions', 'POST', {
        name: this.newSessionName,
        date_start: this.newSessionDateStart,
        date_end: this.newSessionDateEnd
      }).then(response => {
        this.$emit('sessionsAdded', response)
      }).catch(error => {
        console.error(error)
      })
    },
    cancelAdd () {
      this.visible = false
      this.newSessionName = ''
      this.newSessionDateStart = ''
      this.newSessionDateEnd = ''
    }
  }
}
</script>
<style>
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
