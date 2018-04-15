<template>
  <div>
    <section class="index-container">
      <article v-if="isLogged()">
        <calibre-dashboard></calibre-dashboard>
      </article>
      <article v-if="isLogged()">
        <event-dashboard module="calendar"></event-dashboard>
      </article>
    </section>
    <footer>
      <router-link
        href="#"
        to="/about"
      >
        Credit
      </router-link>
    </footer>
  </div>
</template>

<script>
import EventDashboard from '../Event/Dashboard.vue'
import CalibreDashboard from '../Calibre/Dashboard.vue'
import Auth from '../../services/Auth'

export default {
  name: 'Index',
  components: {
    EventDashboard, CalibreDashboard
  },
  data () {
    return {

    }
  },
  methods: {
    isLogged () {
      return Auth.isLogged()
    }
  }
}
</script>

<style scoped>
  .index-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 1em;
  }
  .index-container > article {
    padding: 1em 0.5em;
  }
  .index-container > article:last-child {
    border-left: 1px solid var(--second-color);
  }
  @media screen and (max-width: 600px) {
    .index-container {
      grid-template-columns: 1fr;
    }
    .index-container > article:last-child {
      border-left-width: 0;
      grid-row: 1/2;
    }
    .index-container > article {
      border-width: 0;
      border-bottom: 1px solid var(--second-color);
    }
  }
  footer {
    padding: 1em;
    width: calc(100% - 2em);
    color: var(--second-color);
  }
</style>
