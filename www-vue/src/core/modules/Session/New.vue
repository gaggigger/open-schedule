<template>
  <div class="newsession-container">
    <div>
      <label>Session name</label>
      <input
        type="text"
        placeholder="Session name"
        v-model="session.name"
        required
      />
    </div>
    <div>
      <label>Session start</label>
      <input
        type="date"
        placeholder="Session start"
        v-model="session.date_start"
        required
      />
    </div>
    <div>
      <label>Session end</label>
      <input
        type="date"
        placeholder="Session end"
        v-model="session.date_end"
        required
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
import Http from '../../services/Http'

export default {
  name: 'SessionNew',
  props: [
    'session'
  ],
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('closed')
    },
    add () {
      try {
        for (const item of document.querySelectorAll('.newsession-container input, .newsession-container textarea')) {
          if (!item.validity.valid) return
        }
      } catch (e) {
        console.error(e)
      }
      Http.request('/sessions', 'POST', this.session).then(response => {
        if (response) this.$emit('added', response)
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
