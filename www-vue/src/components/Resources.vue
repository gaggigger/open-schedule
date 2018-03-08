<template>
  <div class="resources-container">
    <div v-for="resource in resources"
         v-bind:key="resource.id"
         class="resource"
    >
      <router-link
        v-bind:data-icon="resource.icon"
        v-bind:to="'' + resource.path"
      >
        {{ resource.name }}
      </router-link>

    </div>
  </div>
</template>

<script>
import Http from '@/services/Http'

export default {
  name: 'Resources',
  data () {
    return {
      resources: []
    }
  },
  created () {
    Http.request('/resources', 'GET')
      .then(response => {
        console.log(response)
        this.resources = response
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
<style scoped>
  .resources-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    align-content: space-between;
  }
  .resources-container > .resource {
    border: 1px solid var(--second-color);
    flex-grow: 1;
    flex-basis: 150px;
    width: 100%;
    min-height: 150px;
    font-size: 1.5em;
    margin : 0.5em;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .resources-container > .resource:hover {
    background-color: var(--first-color);
  }
  .resources-container > .resource:hover > a {
    color: var(--second-color);
  }
</style>
