<template>
  <div>
    <section class="container">
      <article></article>
      <article>
        <event-list module="calendar"></event-list>
      </article>
    </section>
    <footer>
      <router-link
        href="#"
        to="/about"
      >
        About
      </router-link>
    </footer>
  </div>
</template>

<script>
import EventList from './Resources/EventList.vue'

export default {
  name: 'Index',
  components: {
    EventList
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 1em;
  }
  .container > article {
    padding: 1em 0.5em;
  }
  .container > article:last-child {
    border-left: 1px solid var(--second-color);
  }
</style>
