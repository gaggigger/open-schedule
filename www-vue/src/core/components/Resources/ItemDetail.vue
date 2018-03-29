<template>
  <div>
    <h3 class="toolbar-1">
      <span class="title">
        <span class="link icon-back" v-on:click="$router.go(-1)"></span>
        {{ item }}
      </span>
    </h3>
    <vue-tabs @tab-change="handleTabChange">
      <v-tab v-bind:title="feature.name"
             v-for="feature in features"
             v-bind:key="feature.name"
      >
        <item-form v-if="feature.component === 'app-resource-info'"></item-form>
        <item-calendar v-else-if="feature.component === 'app-resource-calendar'"></item-calendar>
        <item-print v-else-if="feature.component === 'app-resource-print'"
                    v-bind:feature="feature"
        ></item-print>
        <div v-else>The feature {{ feature.component }} is in progress ...</div>
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import ItemForm from './Form.vue'
import ItemCalendar from './Calendar.vue'
import ItemPrint from '../Print/Print.vue'
import Http from '../../services/Http'

export default {
  name: 'ResourcesForm',
  components: {
    VueTabs,
    VTab,
    ItemForm,
    ItemCalendar,
    ItemPrint
  },
  data () {
    return {
      item: this.$route.params.item,
      id: this.$route.params.id,
      features: []
    }
  },
  created () {
    Http.request('/resources/' + this.item, 'GET')
      .then(response => {
        this.features = response.features
      })
  },
  methods: {
    handleTabChange (tabIndex, newTab, oldTab) {
      try {
        newTab.$children[0].reload()
      } catch (e) {
        // dnt
      }
    }
  }
}
</script>
<style scoped></style>
