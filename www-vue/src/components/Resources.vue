<template>
  <div class="resources-container flex1">
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
        this.resources = response
      })
  }
}
</script>
<style scoped>
  .resources-container > .resource:hover > a {
    color: var(--second-color);
  }
</style>
