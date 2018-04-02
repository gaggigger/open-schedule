<template>
  <div class="resources-container flex1">
    <loading v-if="!loaded"></loading>
    <div v-for="resource in resources"
         v-bind:key="resource.id"
         class="resource"
         v-if="loaded"
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
import Http from '../../services/Http'
import Loading from '../../components/Loading/Index.vue'

export default {
  name: 'Resource',
  components: {
    Loading
  },
  data () {
    return {
      loaded: false,
      resources: []
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.loaded = false
      Http.request('/resources', 'GET')
        .then(response => {
          this.loaded = true
          this.resources = response
        })
    }
  }
}
</script>
<style scoped>
  .resources-container > .resource:hover > a {
    color: var(--second-color);
  }
  @media screen and (max-width: 470px) {
    .resources-container > * {
      min-height: auto;
      padding: 1em;
    }
  }
</style>
